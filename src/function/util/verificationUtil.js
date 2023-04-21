import VerifyResult from '../../constants/VerifyResult'
import VerifyResultDescription from '../../constants/VerifyResultDescription'
import { VerifyVerificationProofStatus } from '../../constants/VerifyVerificationProofStatus'

export const getVerifyResult = (status) => {
    return status === VerifyVerificationProofStatus.ALL_PASS ? VerifyResult.PASS : VerifyResult.FAIL
}

export const getVerifyResultDescription = (status) => {
    var description = ''
    switch (status) {
        case VerifyVerificationProofStatus.ALL_PASS:
            description = VerifyResultDescription.VERIFY_OK
            break
        case VerifyVerificationProofStatus.SIG_ERROR:
            description = VerifyResultDescription.VERIFICATION_PROOF_SIGNATURE_ERROR
            break
        case VerifyVerificationProofStatus.CONTRACT_CONNECTION_ERROR:
            description = VerifyResultDescription.CONTRACT_CONNECTION_ERROR
            break
        default:
            description = VerifyResultDescription.VERIFY_VERIFICATION_PROOF_ERROR
    }
    return description
}

export const buildVerifyProofDetailList = async (proofResult) => {
    const { verifyReceiptResult } = proofResult
    return verifyReceiptResult.map((result) => {
        const {
            indexValue,
            clearanceOrder,
            ledgerInputTimestamp,
            receiptTimestamp,
            merkleProofRootHash,
            contractRootHash,
            existenceType,
            proofExistStatus,
            cmd,
            pass,
            txHash,
            certification,
        } = result
        return {
            indexValue,
            clearanceOrder,
            ledgerInputTimestamp: ledgerInputTimestamp || null,
            receiptTimestamp: receiptTimestamp || null,
            merkleProofRootHash,
            contractRootHash,
            existenceType,
            proofExistStatus,
            cmd,
            pass,
            txHash,
            certification: certification || null,
        }
    })
}

export const isVerificationContentContainsNull = (proof) => {
    var result = true
    if (proof === null) {
        result = true
    } else if (
        proof.env &&
        proof.clearanceRecords &&
        proof.contractAddress &&
        proof.serverWalletAddress &&
        proof.existenceProofs
    ) {
        result = false
    }
    console.log('isVerificationContentContainsNull() result=', result)
    return result
}
