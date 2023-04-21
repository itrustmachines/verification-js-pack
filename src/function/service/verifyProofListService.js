import { ProofExistStatus } from '../../constants/ProofExistStatus'
import { VerifyNotExistProofStatus } from '../../constants/VerifyNotExistProofStatus'
import { StatusConstantsString } from '../../constants/StatusConstantsString'
import { ExistenceType } from '../../constants/ExistenceType'
import { QueryType } from '../../constants/QueryType'
import { isRootHashEqual } from '../util/clearanceRecordVerifyUtil'
import { verifyMerkleProofSignature } from '../util/signatureUtil'
import { isLeafNodeWithReport, evalRootHashFromSlice, getRootHashFromSlice } from '../util/sliceValidationUtil'
import { sha256ToHex } from '../util/hashUtil'
import { verify } from './verifyReceiptAndMerkleProofService'
import { nullException } from '../util/nullException'

const collectExistenceProofByClearanceOrder = (clearanceOrder, proof) => {
    console.log(
        'collectExistenceProofByClearanceOrder() clearanceOrder ',
        clearanceOrder,
        ', verificationProof = ',
        proof,
    )
    var existenceProofList = proof.existenceProofs
        .filter((existenceProof) => existenceProof.clearanceOrder === clearanceOrder)
        .sort(
            (a, b) =>
                getIndexValuePropertiesFromIndexValue(a.indexValue).sn -
                getIndexValuePropertiesFromIndexValue(b.indexValue).sn,
        )
    console.log('collectExistenceProofByClearanceOrder() existenceProofList ', existenceProofList)
    return existenceProofList
}

const verifyExistenceProofWithNotExist = (existenceProofListInSameCO, serverWalletAddress, clearanceRecord, query) => {
    console.log(
        'verifyExistenceProofWithNotExist() existenceProofListSize = ' +
            existenceProofListInSameCO.length +
            ', serverWalletAddress = ' +
            serverWalletAddress +
            ', clearanceRecord = ' +
            clearanceRecord,
    )
    var proofResultList = []
    var pass = true
    var successCount = 0
    var modifiedCount = 0
    var removedCount = 0
    var addedCount = 0

    const notExistProofList = findNotExistProofList(existenceProofListInSameCO)
    console.log('verifyExistenceProofWithNotExist() notExistProofListSize = ' + notExistProofList.length)
    const successNotExistProofInfo = verifyNotExistProofList(
        notExistProofList,
        serverWalletAddress,
        clearanceRecord,
        query,
    )
    console.log('verifyExistenceProofWithNotExist() successNotExistProofInfo = ' + successNotExistProofInfo)
    const firstSuccessNotExistProofSn = getSnFromNotExistProofSuccessInfo(successNotExistProofInfo)
    var currentSN = getCurrentSnFromQuery(clearanceRecord, query)

    for (var i = 0; i < existenceProofListInSameCO.length; i++) {
        var currentProof = existenceProofListInSameCO[i]
        var indexValueProperties = getIndexValuePropertiesFromIndexValue(currentProof.indexValue)

        if (currentSN < indexValueProperties.sn && indexValueProperties.sn < firstSuccessNotExistProofSn) {
            const removedProofResultList = buildRemovedProofResultList(
                clearanceRecord.clearanceOrder,
                query.indexValueKey,
                currentSN,
                indexValueProperties.sn - 1,
            )
            console.log(
                'verifyExistenceProofWithNotExist () removedProofResultListSize = ',
                removedProofResultList.length,
            )
            removedCount = removedCount + removedProofResultList.length
            currentSN = indexValueProperties.sn
            for (var j = 0; j < removedProofResultList.length; j++) {
                proofResultList.push(removedProofResultList[j])
            }
        }

        var result

        if (currentSN === indexValueProperties.sn && indexValueProperties.sn < firstSuccessNotExistProofSn) {
            console.log('First if', currentProof)
            result = verifyReceiptAndMerkleProof(currentProof, serverWalletAddress, clearanceRecord)
        } else if (
            currentSN === firstSuccessNotExistProofSn &&
            successNotExistProofInfo.notExistProof === currentProof
        ) {
            console.log('Second if', currentProof)
            result = successNotExistProofInfo.verifyResult
        } else {
            console.log('Third if', currentProof)
            result = verifyNotExistProof(currentProof, serverWalletAddress, clearanceRecord, query.fromCO, query.toCO)
            result.proofExistStatus = ProofExistStatus.ADDED
        }
        pass = pass && result.pass

        console.log('verifyExistenceProofWithNotExist() pass = ' + pass + ', result = ' + result.pass)
        if (ProofExistStatus.PASS === result.proofExistStatus) {
            successCount++
        } else if (ProofExistStatus.MODIFIED === result.proofExistStatus) {
            modifiedCount++
        } else {
            addedCount++
        }
        proofResultList.push(result)

        if (
            i + 1 < existenceProofListInSameCO.length &&
            !isNextExistenceProofHaveSameCOIV(currentProof, existenceProofListInSameCO[i + 1])
        ) {
            currentSN++
        }
    }

    const count = {
        totalCount: existenceProofListInSameCO.length,
        successCount: successCount,
        addedCount: addedCount,
        modifiedCount: modifiedCount,
        removedCount: removedCount,
    }

    const verifyProofListResult = {
        pass: pass,
        count: count,
        proofResultList: proofResultList,
    }

    console.log('verifyExistenceProofWithNotExist() verifyExistenceProofResult = ', verifyProofListResult)
    return verifyProofListResult
}

const verifyOnlyExistenceProof = (existenceProofListInSameCO, clearanceRecord, serverWalletAddress) => {
    console.log(
        'verifyOnlyExistenceProof() existenceProofListSize = ',
        existenceProofListInSameCO.length,
        ', clearanceRecord = ',
        clearanceRecord,
    )

    var pass = true
    var successCount = 0
    var modifiedCount = 0
    var existProofResultList = []

    for (var existenceProof of existenceProofListInSameCO) {
        var result = verifyReceiptAndMerkleProof(existenceProof, serverWalletAddress, clearanceRecord)
        pass = pass && result.pass
        existProofResultList.push(result)

        if (ProofExistStatus.PASS === result.proofExistStatus) {
            successCount++
        } else if (ProofExistStatus.MODIFIED === result.proofExistStatus) {
            modifiedCount++
        }
    }

    const count = {
        totalCount: existenceProofListInSameCO.length,
        successCount: successCount,
        addedCount: 0,
        modifiedCount: modifiedCount,
        removedCount: 0,
    }

    const existenceProofResult = {
        pass: pass,
        count: count,
        proofResultList: existProofResultList,
    }

    console.log('verifyOnlyExistenceProof() existenceProofResult = ', existenceProofResult)
    return existenceProofResult
}

const getIndexValuePropertiesFromIndexValue = (indexValue) => {
    const pattern = '(.+)_R(\\d+)$'
    const matcher = indexValue.match(pattern)
    var indexValueKey
    var sn
    var result = null

    if (matcher.length > 0) {
        indexValueKey = matcher[1]
        sn = parseInt(matcher[2], 10)
    } else {
        console.error('parse IndexValueProperties error: indexValue = ' + indexValue)
    }

    result = {
        indexValueKey: indexValueKey,
        sn: sn,
    }

    return result
}

const findNotExistProofList = (existenceProofList) => {
    console.log('findNotExistProofList() existenceProofListSize = ', existenceProofList.length)
    const notExistProofList = existenceProofList.filter((existenceProof) => !existenceProof.exist)
    console.log('findNotExistProofList() notExistProofList = ', notExistProofList)
    return notExistProofList
}

const verifyNotExistProofList = (notExistProofList, serverWalletAddress, clearanceRecord, query) => {
    console.log(
        'verifyNotExistProofList() notExistProofListSize = ',
        notExistProofList.length,
        ', serverWalletAddress = ',
        serverWalletAddress,
        ', ClearanceRecord = ',
        clearanceRecord,
        ', query = ',
        query,
    )
    var result = null

    for (var notExistProof of notExistProofList) {
        const verifyResult = verifyNotExistProof(
            notExistProof,
            serverWalletAddress,
            clearanceRecord,
            query.fromCO,
            query.toCO,
        )
        if (verifyResult.pass) {
            result = {
                notExistProof: notExistProof,
                verifyResult: verifyResult,
            }
            break
        }
    }

    console.log('verifyNotExistProofList() end, result = ', result)
    return result
}

const getSnFromNotExistProofSuccessInfo = (info) => {
    console.log('getSnFromNotExistProofSuccessInfo() info = ', info)
    var sn = null

    if (info === null || info.notExistProof === null) {
        sn = Number.MAX_SAFE_INTEGER
    } else {
        var properties = getIndexValuePropertiesFromIndexValue(info.notExistProof.indexValue)
        sn = properties.sn
    }
    console.log('getSnFromNotExistProofSuccessInfo() sn = ', sn)
    return sn
}

const getCurrentSnFromQuery = (clearanceRecord, query) => {
    console.log('getCurrentSnFromQuery() clearanceRecord = ', clearanceRecord + ', query =', query)

    var sn = 0
    if (QueryType.CLEARANCE_ORDER_AND_SN === query.type) {
        if (clearanceRecord.clearanceOrder === query.fromCO) {
            sn = query.fromSN
        }
    }
    console.log('getCurrentSnFromQuery() sn = ', sn)
    return sn
}

const buildRemovedProofResultList = (clearanceOrder, indexValueKey, fromSn, toSn) => {
    console.log(
        'buildRemovedProofResultList() clearanceOrder=,',
        clearanceOrder,
        ', indexValueKey=',
        indexValueKey,
        ', fromSn=',
        fromSn,
        ', toSn=',
        toSn,
    )
    var resultList = []

    for (var i = fromSn; i <= toSn; i++) {
        const result = {
            clearanceOrder: clearanceOrder,
            indexValue: indexValueKey + '_R' + i,
            pass: false,
            proofExistStatus: ProofExistStatus.REMOVED,
            existenceType: ExistenceType.EXIST,
        }
        resultList.push(result)
    }

    console.log('buildRemovedProofResultList() resultListSize = ', resultList.length)
    return resultList
}

const verifyNotExistProof = (proof, serverWalletAddress, contractClearanceRecord, fromCO, toCO) => {
    const isMerkleProofSignature = verifyMerkleProofSignature(proof.merkleProof, serverWalletAddress)
    const verifyNotExistReport = verifyNotExistMerkleProofAndReceipt(
        proof,
        fromCO,
        toCO,
        contractClearanceRecord,
        serverWalletAddress,
    )
    var verifyNotExistProofStatus

    if (isMerkleProofSignature) {
        verifyNotExistProofStatus = verifyNotExistReport.verifyNotExistProofStatus
    } else {
        verifyNotExistProofStatus = VerifyNotExistProofStatus.ERROR_SIGNATURE
    }

    var pass = !proof.exist
    if (
        VerifyNotExistProofStatus.OK_CLEARANCE_NOT_BETWEEN_SEARCH_TIME !== verifyNotExistProofStatus &&
        VerifyNotExistProofStatus.OK_INDEX_VALUE_NOT_FOUND !== verifyNotExistProofStatus &&
        VerifyNotExistProofStatus.OK_RECEIPT_AND_MERKLE_PROOF_SHOULD_BE_END_OF_PROOF !== verifyNotExistProofStatus
    ) {
        pass = false
    }

    var merkleProofRootHash = null
    if (proof.merkleProof !== null) {
        merkleProofRootHash = getRootHashFromSlice(proof.merkleProof.slice)
    }

    const result = {
        pass: pass,
        proofExistStatus: pass ? ProofExistStatus.PASS : ProofExistStatus.MODIFIED,
        status: pass ? StatusConstantsString.OK : StatusConstantsString.ERROR,
        existenceType: ExistenceType.NOT_EXIST,
        clearanceOrder: proof.clearanceOrder,
        indexValue: proof.indexValue,
        verifyNotExistProofResult: verifyNotExistProofStatus,
        merkleProofSignatureOk: isMerkleProofSignature,
        merkleProofRootHash: merkleProofRootHash,
        contractRootHash: contractClearanceRecord.rootHash,
        txHash: contractClearanceRecord.txHash,
        pbPairReport: verifyNotExistReport.pbPairReport,
        merkleTreeReport: verifyNotExistReport.merkleTreeReport,
    }

    return result
}

const verifyReceiptAndMerkleProof = (existenceProof, serverWalletAddress, clearanceRecord) => {
    console.log('verify() existenceProof = ', existenceProof, ', clearanceRecord = ', clearanceRecord)
    if (existenceProof === null) {
        throw nullException('existenceProof is null')
    } else if (serverWalletAddress === null) {
        throw nullException('serverWallet is null')
    } else if (clearanceRecord === null) {
        throw nullException('clearanceRecord is null')
    }
    const receipt = existenceProof.receipt
    const result = verify(receipt, existenceProof.merkleProof, serverWalletAddress, clearanceRecord)
    const clearanceOrderAndIndexValueOk =
        existenceProof.clearanceOrder === (receipt === null ? null : receipt.clearanceOrder) &&
        existenceProof.indexValue === (receipt === null ? null : receipt.indexValue)
    result.pass = result.pass && existenceProof.exist && clearanceOrderAndIndexValueOk
    result.proofExistStatus = result.pass ? ProofExistStatus.PASS : ProofExistStatus.MODIFIED
    result.clearanceOrder = existenceProof.clearanceOrder
    result.indexValue = existenceProof.indexValue
    console.log('verify() result = ', result)
    return result
}

const isNextExistenceProofHaveSameCOIV = (currentProof, nextProof) => {
    console.log('isNextExistenceProofHaveSameCOIV() currentProof = ', currentProof + ', nextProof = ', nextProof)
    var result = false
    if (
        currentProof.indexValue.toLowerCase() === nextProof.indexValue.toLowerCase() &&
        currentProof.clearanceOrder === nextProof.clearanceOrder
    ) {
        result = true
    }

    console.log('isNextExistenceProofHaveSameCOIV() result = ', result)
    return result
}

const verifyNotExistMerkleProofAndReceipt = (proof, fromCO, toCO, cr, serverWalletAddress) => {
    console.log(
        'verifyNotExistMerkleProofAndReceipt() proof = ',
        proof + ', fromCO = ',
        fromCO + ', toCO = ',
        toCO + ', cr = ',
        cr,
        ', serverWalletAddress = ',
        serverWalletAddress,
    )

    const merkleProof = proof.merkleProof
    const indexValue = proof.indexValue
    const receipt = proof.receipt

    const verifyPbPairReport = verifyNotExistPbPair(merkleProof, indexValue)
    const verifySliceReport = evalRootHashFromSlice(merkleProof.slice)
    const rootHashEqual = isRootHashEqual(cr, getRootHashFromSlice(merkleProof.slice))

    var status = null
    if (verifyPbPairReport.inPbPair) {
        if (receipt !== null) {
            if (proof.clearanceOrder > toCO || proof.clearanceOrder < fromCO) {
                status = VerifyNotExistProofStatus.OK_CLEARANCE_NOT_BETWEEN_SEARCH_TIME
            } else {
                if (!verify(receipt, merkleProof, serverWalletAddress, cr).pass) {
                    status = VerifyNotExistProofStatus.ERROR_INDEX_VALUE_IN_PAIR
                } else {
                    status = VerifyNotExistProofStatus.OK_RECEIPT_AND_MERKLE_PROOF_SHOULD_BE_END_OF_PROOF
                }
            }
        } else {
            status = VerifyNotExistProofStatus.ERROR_INDEX_VALUE_IN_PAIR
        }
    } else {
        status = VerifyNotExistProofStatus.OK_INDEX_VALUE_NOT_FOUND
    }
    if (rootHashEqual === false) {
        status = VerifyNotExistProofStatus.ERROR_ROOT_HASH_ERROR
    }
    if (verifySliceReport.pass === false) {
        status = VerifyNotExistProofStatus.ERROR_SLICE_ERROR
    }

    const verifyNotExistReport = {
        pbPairReport: verifyPbPairReport.pbPairReport,
        merkleTreeReport: verifySliceReport.merkleTreeReport,
        verifyNotExistProofStatus: status,
    }

    console.log('verifyNotExistMerkleProofAndReceipt() verifyNotExistReport = ', verifyNotExistReport)
    return verifyNotExistReport
}

const verifyNotExistPbPair = (merkleProof, indexValue) => {
    console.log('verifyNotExistPbPair() merkleProof = ', merkleProof, ', indexValue = ', indexValue)
    var isInPbPair = false

    for (var pbPairValue of merkleProof.pbPair) {
        const indexValueHash = sha256ToHex(indexValue)
        const key = pbPairValue.keyHash
        isInPbPair = indexValueHash.toLowerCase() === key.toLowerCase()
        if (isInPbPair) {
            break
        }
    }
    const verifyLeafNodeReport = isLeafNodeWithReport(merkleProof.slice, merkleProof.pbPair)

    const pbPairReport = {
        containDataCount: merkleProof.pbPair.length,
        leafNodeHashValue: verifyLeafNodeReport.pbPairHashValue,
        indexPosition: verifyLeafNodeReport.indexPosition,
        pbPair: merkleProof.pbPair,
    }

    const verifyPbPairReport = {
        inPbPair: isInPbPair,
        pbPairReport: pbPairReport,
    }

    console.log('verifyNotExistPbPair() verifyPbPairReport = ', verifyPbPairReport)
    return verifyPbPairReport
}

const getNextExistenceProof = (index, existenceProofList) => {
    console.log('getNextExistenceProof() index = ', index, ', existenceProofListSize = ', existenceProofList.length)
    var result = null
    var nextIndex = index + 1
    if (nextIndex < existenceProofList.length) {
        result = existenceProofList[nextIndex]
    }
    console.log('getNextExistenceProof() result = ', result)
    return result
}

export {
    collectExistenceProofByClearanceOrder,
    getIndexValuePropertiesFromIndexValue,
    buildRemovedProofResultList,
    verifyExistenceProofWithNotExist,
    verifyOnlyExistenceProof,
    findNotExistProofList,
    verifyNotExistProofList,
    isNextExistenceProofHaveSameCOIV,
    getNextExistenceProof,
    getSnFromNotExistProofSuccessInfo,
    verifyReceiptAndMerkleProof,
}
