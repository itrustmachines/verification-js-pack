import { parse } from '../util/queryStringParser'
import { buildVerifiedClearanceRecordInfoMap } from './verifyClearanceRecordServiceAdapter'
import { buildVerifiedClearanceRecordInfoMap_2_3_0 } from './verifyClearanceRecordServiceAdapter_2_3_0'
import {
    collectExistenceProofByClearanceOrder,
    verifyExistenceProofWithNotExist,
    verifyOnlyExistenceProof,
} from './verifyProofListService'
import { VerifyVerificationProofStatus } from '../../constants/VerifyVerificationProofStatus'
import { verifyProofSignature } from '../util/signatureUtil'
import { buildProofMessage, buildProofMessageFail } from '../util/messageBuilderUtil'
import { buildProofSignaturePassReport } from '../util/verifyReportUtil'
import { QueryType } from '../../constants/QueryType'
import { getRootHashFromSlice } from '../util/sliceValidationUtil'
import { StatusConstantsString } from '../../constants/StatusConstantsString'
import { ExistenceType } from '../../constants/ExistenceType'
import { ProofExistStatus } from '../../constants/ProofExistStatus'
import { VerifyNotExistProofStatus } from '../../constants/VerifyNotExistProofStatus'
import { loadContract } from './clearanceRecordService'
// import { enableEthService } from '../util/ethUtil'

/**
 * @function : verifyExistenceProof
 *
 * @description : Verify existence proof
 *
 * @param {verificationProof} proof : verification proof in JSON format
 * @param {String} latestCR : latest clearance record
 * @param {String} nodeUrl : nodeUrl
 *
 * @returns : result
 */
const verifyExistenceProof = async (proof, latestCR, nodeUrl) => {
    //console.log('verifyExistenceProof() proof = ', proof, ' latestClearanceRecord = ', latestCR, ' nodeUrl = ', nodeUrl );
    var report = {
        verifyReportType: undefined,
        generalReport: undefined,
        verifyExceptionReport: undefined,
        verifyProofSigReport: undefined,
        verifyLastClearanceRecordReport: undefined,
        verifyClearanceRecordReportList: undefined,
        verifyExistenceProofList: undefined,
    }
    report.verifyExistenceProofList = []
    const query = parse(proof.query)
    const proofSignaturePass = isProofSignaturePass(proof, report)
    const contractVersion = await obtainVersionFromContract(proof.contractAddress, nodeUrl)
    var verifiedCrMap

    if (contractVersion.startsWith('2.3.0')) {
        verifiedCrMap = buildVerifiedClearanceRecordInfoMap_2_3_0(proof.clearanceRecords, latestCR, report)
    } else {
        verifiedCrMap = buildVerifiedClearanceRecordInfoMap(proof.clearanceRecords, latestCR, report)
    }

    const crPass = isCrListPass(verifiedCrMap)
    var existProofResults = []
    var errorCoList = []
    var count = {
        totalCount: 0,
        successCount: 0,
        modifiedCount: 0,
        removedCount: 0,
        addedCount: 0,
    }
    var pass = proofSignaturePass && crPass
    const clearanceOrderList = collectProofClearanceOrderReversedList(proof.existenceProofs)
    for (var clearanceOrder of clearanceOrderList) {
        const verifiedClearanceRecordInfo = verifiedCrMap[clearanceOrder]
        const existenceProofList = collectExistenceProofByClearanceOrder(clearanceOrder, proof)
        const verifySingleCOExistenceProofInput = {
            query: query,
            serverWalletAddress: proof.serverWalletAddress,
            isLatestCO: latestCR.clearanceOrder === clearanceOrder,
            verifiedClearanceRecordInfo: verifiedClearanceRecordInfo,
            existenceProofList: existenceProofList,
        }
        const result = verifySingleCOExistenceProof(verifySingleCOExistenceProofInput)
        addCount(count, result.count)
        pass = pass && result.pass
        addAllIfNotNull(existProofResults, result.existenceProofResultList)

        if (result.coError) {
            errorCoList.push(clearanceOrder)
        }
    }

    const result = {
        query: proof.query,
        queryType: query.type,
        totalCount: count.totalCount,
        successCount: count.successCount,
        modifiedCount: count.modifiedCount,
        removedCount: count.removedCount,
        addedCount: count.addedCount,
        status: pass ? VerifyVerificationProofStatus.ALL_PASS : VerifyVerificationProofStatus.SIG_ERROR,
        verifyReceiptResult: existProofResults,
        errorClearanceOrderInClearanceRecordList: errorCoList,
        verifyReport: report,
    }

    //console.log('verifyExistenceProof() result = ', result );
    return result
}

/**
 * @function : isProofSignaturePass
 *
 * @description : check whether the proof signature is pass
 *
 * @param {verificationProof} proof : verification proof in JSON format
 * @param {report} report : store verify information message
 *
 * @returns : boolean
 */
const isProofSignaturePass = (proof, report) => {
    var first = true
    var proofSignaturePass = verifyProofSignature(proof, first)
    var signData = buildProofMessage(proof)
    report.verifyProofSigReport = buildProofSignaturePassReport(
        proof.serverWalletAddress,
        proof.sigServer,
        signData,
        proofSignaturePass,
    )

    if (!proofSignaturePass) {
        first = false
        signData = buildProofMessageFail(proof)
        proofSignaturePass = verifyProofSignature(proof, first)
        console.log('buildProofMessageFail new signData=', signData)
        if (proofSignaturePass) {
            report.verifyProofSigReport = buildProofSignaturePassReport(
                proof.serverWalletAddress,
                proof.sigServer,
                signData,
                proofSignaturePass,
            )
        }
    }
    console.log('isProofSignaturePass() proofSignaturePass = ', proofSignaturePass)
    return proofSignaturePass
}

/**
 * @function : obtainVersionFromContract
 *
 * @description : Get contract version by calling Web3 API
 *
 * @note : Remember to use MetaMask to connect to blockchain. Comment out enableEthService()
 *
 * @param {String} contractAddress : contract address
 * @param {String} nodeUrl :  nodeUrl
 *
 * @returns : contract version
 */
const obtainVersionFromContract = async (contractAddress, nodeUrl) => {
    //console.log('obtainVersionFromContract() contraceAddress = ' + contractAddress);
    //enableEthService();
    const spoContract = loadContract(contractAddress, nodeUrl)
    const contractVersion = await spoContract.methods.version().call()
    return contractVersion
}

/**
 * @function : isCrListPass
 *
 * @description : check whether the verified clearance record list is all pass.
 *
 * @param crMap : verified clearance record info object
 *
 * @returns : boolean
 */
const isCrListPass = (crMap) => {
    //console.log('isCrListPass() crMap = ', crMap);
    const falseInfo = Object.values(crMap).filter((cr) => !cr.pass)
    var result = true
    if (falseInfo.length > 0) {
        result = false
    }
    //console.log('isCrListPass() result =', result);
    return result
}

/**
 * @function : collectProofClearanceOrderReversedList
 *
 * @description : check whether the verified clearance record list is all pass.
 *
 * @note :
 *
 * @param existenceProofList :  List of existence proof
 *
 * @returns : boolean
 */

const collectProofClearanceOrderReversedList = (existenceProofList) => {
    console.log('collectProofClearanceOrderReversedList() existenceProof = ', existenceProofList)
    const clearanceOrderList = Array.from(
        new Set(existenceProofList.map((existenceProof) => existenceProof.clearanceOrder).reverse()),
    )
    console.log('collectProofClearanceOrderReversedList() clearanceOrderList = ', clearanceOrderList)
    return clearanceOrderList
}

const addCount = (count, resultCount) => {
    count.totalCount = count.totalCount + resultCount.totalCount
    count.successCount = count.successCount + resultCount.successCount
    count.modifiedCount = count.modifiedCount + resultCount.modifiedCount
    count.removedCount = count.removedCount + resultCount.removedCount
    count.addedCount = count.addedCount + resultCount.addedCount
}

const verifySingleCOExistenceProof = (input) => {
    console.log('verifySingleCOExistenceProof() input = ', input)
    var pass = false
    var coError = false
    var count = {
        totalCount: 0,
        successCount: 0,
        modifiedCount: 0,
        removedCount: 0,
        addedCount: 0,
    }
    var resultList = []
    const verifiedClearanceRecordInfo = input.verifiedClearanceRecordInfo
    if (
        (verifiedClearanceRecordInfo !== undefined &&
            verifiedClearanceRecordInfo !== null &&
            verifiedClearanceRecordInfo.pass) ||
        input.isLatestCO
    ) {
        const contractClearanceRecord = verifiedClearanceRecordInfo.clearanceRecord
        var verifyProofListResult

        if (input.query.type !== QueryType.LOCATOR) {
            verifyProofListResult = verifyExistenceProofWithNotExist(
                input.existenceProofList,
                input.serverWalletAddress,
                contractClearanceRecord,
                input.query,
            )
        } else {
            verifyProofListResult = verifyOnlyExistenceProof(
                input.existenceProofList,
                contractClearanceRecord,
                input.serverWalletAddress,
            )
        }
        addCount(count, verifyProofListResult.count)
        pass = verifyProofListResult.pass
        addAllIfNotNull(resultList, verifyProofListResult.proofResultList)
    }

    if (
        verifiedClearanceRecordInfo === undefined ||
        verifiedClearanceRecordInfo === null ||
        !verifiedClearanceRecordInfo.pass
    ) {
        coError = true
        if (!input.isLatestCO) {
            const failResult = buildClearanceRecordFailResult(input.existenceProofList, verifiedClearanceRecordInfo)
            const verifyProofCount = {
                totalCount: failResult.length,
                successCount: 0,
                modifiedCount: failResult.length,
                removedCount: 0,
                addedCount: 0,
            }
            addCount(count, verifyProofCount)
            resultList.push.apply(resultList, failResult)
        }
    }

    const result = {
        count: count,
        pass: pass,
        existenceProofResultList: resultList,
        coError: coError,
    }

    console.log('verifySingleCOExistenceProof() result = ', result)
    return result
}

const failResult = (proof, verifiedClearanceRecordInfo) => {
    const receipt = proof.receipt
    const rootHash = getRootHashFromSlice(proof.merkleProof.slice)
    const clearanceRecordRootHash =
        verifiedClearanceRecordInfo === null || verifiedClearanceRecordInfo === undefined
            ? null
            : verifiedClearanceRecordInfo.clearanceRecord.rootHash
    const result = {
        status: StatusConstantsString.ERROR,
        existenceType: ExistenceType.NA,
        proofExistStatus: ProofExistStatus.CLEARANCE_RECORD_ERROR,
        pass: false,
        indexValue: proof.indexValue,
        clearanceOrder: proof.clearanceOrder,
        verifyNotExistProofResult: VerifyNotExistProofStatus.CLEARANCE_RECORD_ERROR,
        receiptTimestamp: receipt !== null ? receipt.timestampSPO : null,
        ledgerInputTimestamp: receipt !== null ? receipt.timestamp : null,
        merkleProofSignatureOk: false,
        clearanceOrderOk: false,
        clearanceRecordRootHashOk: false,
        receiptSignatureOk: false,
        pbPairOk: false,
        sliceOk: false,
        description: StatusConstantsString.ERROR,
        timestamp: Date.now(),
        cmd: receipt !== null ? receipt.cmd : null,
        merkleProofRootHash: rootHash,
        contractRootHash: clearanceRecordRootHash,
    }

    return result
}

const buildClearanceRecordFailResult = (existenceProofs, verifiedClearanceRecordInfo) => {
    console.log('buildClearanceRecordFailResult() existenceProofs = ', existenceProofs)
    const crFailResult = existenceProofs.map((existenceProof) =>
        failResult(existenceProof, verifiedClearanceRecordInfo),
    )
    console.log('buildClearanceRecordFailResult() crFailResult = ', crFailResult)
    return crFailResult
}

const addAllIfNotNull = (list, source) => {
    if (source !== null) {
        list.push.apply(list, source)
    }
}

export { verifyExistenceProof, collectProofClearanceOrderReversedList, isCrListPass, isProofSignaturePass }
