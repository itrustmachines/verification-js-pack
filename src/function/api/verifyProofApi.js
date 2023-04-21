import VerifyResultDescription from '../../constants/VerifyResultDescription'
import { verify } from '../service/verifyService'
import { obtainExplorerType } from '../util/blockChainExplorerUrlUtil'
import { loadVerificationProofFileToJson } from '../util/fileUtil'
import {
    buildVerifyProofDetailList,
    getVerifyResult,
    getVerifyResultDescription,
    isVerificationContentContainsNull,
} from '../util/verificationUtil'
import { getCertification } from '../service/certificationService'

const INFURA_PROJECT_ID = process.env.REACT_APP_INFURA_PROJECT_ID

const verifyProof = async (file) => {
    console.log('verifyProof() start', { file })
    const verifyTimestamp = Date.now()
    const proofFileName = file.name
    var verificationProofFromFile = null
    var responseResult = {
        status: 'error',
        verifyResultDescription: VerifyResultDescription.VERIFY_VERIFICATION_PROOF_ERROR,
        proofFileName: 'N/A',
        verifyResult: '',
        query: '',
        queryType: '',
        evmEnv: '',
        explorerType: '',
        uploadTimestamp: 0,
        contractAddress: '',
        totalCount: 0,
        successCount: 0,
        modifiedCount: 0,
        removedCount: 0,
        addedCount: 0,
        errorClearanceOrderInClearanceRecordList: [],
        proofDetailList: [],
    }
    try {
        verificationProofFromFile = await loadVerificationProofFileToJson(file)
    } catch (error) {
        console.log('parse proof file fail')
    }
    if (!verificationProofFromFile) {
        responseResult = {
            status: 'error',
            description: VerifyResultDescription.COVERT_FILE_TO_VERIFICATION_PROOF_FAIL,
            proofFileName,
        }
    } else if (isVerificationContentContainsNull(verificationProofFromFile)) {
        responseResult = {
            status: 'error',
            description: VerifyResultDescription.VERIFICATION_PROOF_CONTENT_NULL_ERROR,
            proofFileName,
        }
    } else {
        const proofVerifyResult = await verify(verificationProofFromFile, INFURA_PROJECT_ID)
        await getCertification(proofVerifyResult, verificationProofFromFile)

        responseResult = await buildResponseResult(
            proofFileName,
            verificationProofFromFile,
            proofVerifyResult,
            verifyTimestamp,
        )
    }
    console.log('verifyProof() end', { responseResult })
    return responseResult
}

const buildResponseResult = async (proofFileName, verificationProof, proofVerifyResult, verifyTimestamp) => {
    var result = null
    const {
        status,
        query,
        queryType,
        totalCount,
        successCount,
        modifiedCount,
        removedCount,
        addedCount,
        errorClearanceOrderInClearanceRecordList,
    } = proofVerifyResult
    result = {
        status: 'ok',
        verifyResultDescription: getVerifyResultDescription(status),
        verifyResult: getVerifyResult(status),
        proofFileName: proofFileName,
        uploadTimestamp: verifyTimestamp,
        query,
        queryType,
        evmEnv: verificationProof.env,
        explorerType: obtainExplorerType(verificationProof.env),
        contractAddress: verificationProof.contractAddress,
        totalCount,
        successCount,
        modifiedCount,
        removedCount,
        addedCount,
        errorClearanceOrderInClearanceRecordList,
        proofDetailList: await buildVerifyProofDetailList(proofVerifyResult),
    }
    return result
}

export { verifyProof }
