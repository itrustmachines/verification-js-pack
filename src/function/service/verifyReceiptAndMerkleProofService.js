import { verifyReceiptSignature, verifyMerkleProofSignature } from '../util/signatureUtil'
import { isLeafNode, isReceiptInPbPair, evalRootHashFromSlice, getRootHashFromSlice } from '../util/sliceValidationUtil'
import { ExistenceType } from '../../constants/ExistenceType'
import { ProofExistStatus } from '../../constants/ProofExistStatus'
import { nullException } from '../util/nullException'

const verifyPbPair = (receipt, merkleProof) => {
    // 1. check is leaf node or not
    const leafNodeVerifyResult = isLeafNode(merkleProof.slice, merkleProof.pbPair)

    // 2. verify pbPair key value with receipt digest
    const receiptInPbPairVerifyResult = isReceiptInPbPair(receipt, merkleProof.pbPair)

    const verifyPbPar = {
        pbPairReport: '',
        inPbPair: leafNodeVerifyResult && receiptInPbPairVerifyResult,
    }
    return verifyPbPar
}

const verifyClearanceOrder = (receiptCO, merkleProofCO, clearanceRecordCO) => {
    return merkleProofCO === clearanceRecordCO && receiptCO === merkleProofCO
}

const verifyMerkleProofSlice = (merkleProof) => {
    const verifyMerkleProofSliceResult = {
        pass: evalRootHashFromSlice(merkleProof.slice),
        merkleTreeReport: '',
    }
    return verifyMerkleProofSliceResult
}

const verifyRootHash = (merkleProof, clearanceRecord) => {
    const rootHashFromSlice = getRootHashFromSlice(merkleProof.slice)
    const verifyRootHashResult = rootHashFromSlice && rootHashFromSlice === clearanceRecord.rootHash
    return verifyRootHashResult
}

const verify = (receipt, merkleProof, serverWalletAddress, clearanceRecord) => {
    console.log(
        'verify() receipt = ' + receipt + ', merkleProof = ' + merkleProof + ', clearanceRecord = ' + clearanceRecord,
    )

    if (receipt === null) {
        throw nullException('receipt is null')
    } else if (merkleProof === null) {
        throw nullException('merkleProof is null')
    } else if (serverWalletAddress === null) {
        throw nullException('serverWalletAddress is null')
    } else if (clearanceRecord === null) {
        throw nullException('clearanceRecord is null')
    }

    const rootHash = getRootHashFromSlice(merkleProof.slice)
    const timestamp = Date.now()

    var result = {
        existenceType: ExistenceType.EXIST,
        pass: false,
        status: 'error',
        txHash: clearanceRecord.txHash,
        timestamp: timestamp,
        ledgerInputTimestamp: receipt.timestamp,
        receiptTimestamp: receipt.timestampSPO,
        clearanceOrder: receipt.clearanceOrder,
        indexValue: receipt.indexValue,
        cmd: receipt.cmd,
        proofExistStatus: ProofExistStatus.MODIFIED,
        contractRootHash: clearanceRecord.rootHash,
        merkleProofRootHash: rootHash,
        description: 'verify fail',
        merkleProofSignatureOk: false,
        receiptSignatureOk: false,
        pbPairOk: false,
        clearanceOrderOk: false,
        sliceOk: false,
        clearanceRecordRootHashOk: false,
    }

    console.log('verify() initiate verify result = ', result)
    const isReceiptSignatureOk = verifyReceiptSignature(receipt, serverWalletAddress)

    if (!isReceiptSignatureOk) {
        console.log('verify() result = ', result)
        return result
    } else {
        result.receiptSignatureOk = true
        const isMerkleProofSignatureOk = verifyMerkleProofSignature(merkleProof, serverWalletAddress)
        if (!isMerkleProofSignatureOk) {
            console.log('verify() result = ', result)
            return result
        } else {
            result.merkleProofSignatureOk = true
            const isClearanceOrderCorrect = verifyClearanceOrder(
                receipt.clearanceOrder,
                merkleProof.clearanceOrder,
                clearanceRecord.clearanceOrder,
            )
            if (!isClearanceOrderCorrect) {
                console.log('verify() result = ', result)
                return result
            } else {
                result.clearanceOrderOk = true
                const verifyPbPairReport = verifyPbPair(receipt, merkleProof)
                result.pbPairReport = verifyPbPairReport.pbPairReport
                const isPbPairOk = verifyPbPairReport.inPbPair

                if (!isPbPairOk) {
                    console.log('verify() result = ', result)
                    return result
                } else {
                    result.pbPairOk = true
                    const verifySliceReport = verifyMerkleProofSlice(merkleProof)
                    result.merkleTreeReport = verifySliceReport.merkleTreeReport
                    const isSliceOk = verifySliceReport.pass
                    if (!isSliceOk) {
                        console.log('verify() result = ', result)
                        return result
                    } else {
                        result.sliceOk = true
                        const isRootHashCorrect = verifyRootHash(merkleProof, clearanceRecord)
                        if (!isRootHashCorrect) {
                            console.log('verify() result = ', result)
                            return result
                        } else {
                            result.clearanceRecordRootHashOk = true
                            result.pass = true
                            result.status = 'ok'
                            result.proofExistStatus = ProofExistStatus.PASS
                            result.description = 'ok'
                            console.log('verify() result = ', result)
                            return result
                        }
                    }
                }
            }
        }
    }
}

export { verify }
