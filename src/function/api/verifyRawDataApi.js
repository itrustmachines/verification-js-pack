import VerifyResultDescription from '../../constants/VerifyResultDescription'
import { getCertification } from '../service/certificationService'
import { verify, verifyRawDataWithFileNameAndHash } from '../service/verifyService'
import { obtainExplorerType } from '../util/blockChainExplorerUrlUtil'
import { loadVerificationProofFileToJson } from '../util/fileUtil'
import {
    getVerifyResult,
    getVerifyResultDescription,
    isVerificationContentContainsNull,
} from '../util/verificationUtil'
import VerifyResult from '../../constants/VerifyResult'

const INFURA_PROJECT_ID = process.env.REACT_APP_INFURA_PROJECT_ID

const verifyRawDataWithVerificationProof = async (rawDataFileName, rawDataFileHash, proofFile, isCheckFileName) => {
    console.log('verifyRawDataWithVerificationProof() start', {
        rawDataFileName,
        rawDataFileHash,
        proofFile,
        isCheckFileName,
    })
    const verifyTimestamp = Date.now()

    var responseResult = {
        status: '',
        verifyResultDescription: '',
        verifyFileName: '',
        proofFileName: '',
        verifyResult: '',
        evmEnv: '',
        explorerType: '',
        contractAddress: '',
        uploadTimestamp: 0,
        indexValue: '',
        clearanceOrder: 0,
        ledgerInputTimestamp: 0,
        receiptTimestamp: 0,
        merkleProofRootHash: '',
        contractRootHash: '',
        proofExistStatus: '',
        txHash: '',
        certification: null,
        cmd: '',
        attestationFileName: '',
        fileNameVerifyResult: '',
        fileContentVerifyResult: '',
    }
    var verificationProof
    const proofFileName = proofFile.name
    try {
        verificationProof = await loadVerificationProofFileToJson(proofFile)
    } catch (error) {
        console.log('parse proof file fail')
    }
    if (!verificationProof) {
        responseResult = {
            status: 'error',
            description: VerifyResultDescription.COVERT_FILE_TO_VERIFICATION_PROOF_FAIL,
            verifyResultDescription: VerifyResultDescription.COVERT_FILE_TO_VERIFICATION_PROOF_FAIL,
            proofFileName,
        }
    } else if (isVerificationContentContainsNull(verificationProof)) {
        responseResult = {
            status: 'error',
            description: VerifyResultDescription.VERIFICATION_PROOF_CONTENT_NULL_ERROR,
            verifyResultDescription: VerifyResultDescription.VERIFICATION_PROOF_CONTENT_NULL_ERROR,
            proofFileName,
        }
    } else {
        const verifyProofResult = await verify(verificationProof, INFURA_PROJECT_ID)
        const verifyFileResult = await verifyRawDataWithFileNameAndHash(
            rawDataFileName,
            rawDataFileHash,
            verificationProof,
            isCheckFileName,
        )
        await getCertification(verifyProofResult, verificationProof)

        responseResult = await buildRawDataResponseResult(
            verificationProof,
            proofFileName,
            verifyFileResult,
            verifyProofResult,
            verifyTimestamp,
        )
    }
    console.log('verifyRawDataWithVerificationProof() end', { responseResult })
    return responseResult
}

const buildRawDataResponseResult = async (
    verificationProof,
    proofFileName,
    verifyFileResult,
    verifyProofResult,
    verifyTimestamp,
) => {
    console.log('buildRawDataResponseResult() start', {
        verificationProof,
        verifyFileResult,
        verifyProofResult,
        verifyTimestamp,
    })
    const verifyReceiptResult = verifyProofResult.verifyReceiptResult[0]
    const isProofVerifyPass = getVerifyResult(verifyProofResult.status) === VerifyResult.PASS
    var verifyResult
    var description
    var fileNameVerifyResult
    var fileContentVerifyResult
    if (!isProofVerifyPass) {
        // First get the description from this proof verify result
        description = getVerifyResultDescription(verifyProofResult.status)
        // Build proof error result
        verifyResult = VerifyResult.PROOF_ERROR
        fileNameVerifyResult = VerifyResult.PROOF_ERROR
        fileContentVerifyResult = VerifyResult.PROOF_ERROR
    } else {
        fileNameVerifyResult = verifyFileResult.fileNamePass
        fileContentVerifyResult = verifyFileResult.fileHashPass
        if (verifyFileResult.pass) {
            verifyResult = VerifyResult.PASS
            description = VerifyResultDescription.VERIFY_OK
        } else {
            verifyResult = VerifyResult.FAIL
            description = VerifyResultDescription.FILE_NAME_OR_CONTENT_ERROR
        }
    }

    const result = {
        status: 'ok',
        verifyResult: verifyResult,
        description: description,
        verifyResultDescription: description,
        verifyFileName: verifyFileResult.verifyFileName,
        proofFileName: proofFileName,
        evmEnv: verificationProof.env,
        explorerType: obtainExplorerType(verificationProof.env),
        contractAddress: verificationProof.contractAddress,
        uploadTimestamp: verifyTimestamp,
        indexValue: verifyReceiptResult.indexValue,
        clearanceOrder: verifyReceiptResult.clearanceOrder,
        ledgerInputTimestamp: verifyReceiptResult.ledgerInputTimestamp,
        receiptTimestamp: verifyReceiptResult.receiptTimestamp,
        merkleProofRootHash: verifyReceiptResult.merkleProofRootHash,
        contractRootHash: verifyReceiptResult.contractRootHash,
        proofExistStatus: verifyReceiptResult.proofExistStatus,
        txHash: verifyReceiptResult.txHash,
        certification: verifyReceiptResult.certification,
        cmd: verifyReceiptResult.cmd,
        attestationFileName: verifyFileResult.attestationFileName,
        fileNameVerifyResult: fileNameVerifyResult,
        fileContentVerifyResult: fileContentVerifyResult,
    }
    console.log('buildRawDataResponseResult() end', { result })
    return result
}

export { verifyRawDataWithVerificationProof }
