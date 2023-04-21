import { StatusConstantsString } from '../../constants/StatusConstantsString'
import VerifyFileNameAndHashStatus from '../../constants/VerifyFileNameAndHashStatus'
import VerifyResultDescription from '../../constants/VerifyResultDescription'
import { getCertification } from '../service/certificationService'
import { verifyFileSetAndContinuousProof } from '../service/verifyContinuousProofService'
import { obtainExplorerType } from '../util/blockChainExplorerUrlUtil'
import { loadVerificationProofFileToJson } from '../util/fileUtil'
import {
    buildVerifyProofDetailList,
    getVerifyResult,
    getVerifyResultDescription,
    isVerificationContentContainsNull,
} from '../util/verificationUtil'

const INFURA_PROJECT_ID = process.env.REACT_APP_INFURA_PROJECT_ID

const verifyFileSetWithVerificationProof = async (fileNameAndHashList, proofFile) => {
    const verifyTimestamp = Date.now()
    var verificationProof
    var responseResult
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
        const verifyFileSetAndContinuousProofResult = await verifyFileSetAndContinuousProof(
            verificationProof,
            fileNameAndHashList,
            INFURA_PROJECT_ID,
        )
        await getCertification(verifyFileSetAndContinuousProofResult.verifyProofResult, verificationProof)

        responseResult = await buildVerifyContinuousProofResponse(
            verifyTimestamp,
            proofFileName,
            verificationProof,
            verifyFileSetAndContinuousProofResult,
        )
    }
    console.log('verifyFileSetWithVerificationProof() end', { responseResult })
    return responseResult
}

const buildVerifyContinuousProofResponse = async (
    verifyTimestamp,
    proofFileName,
    verificationProof,
    verifyFileSetAndContinuousProofResult,
) => {
    const { verifyProofResult, verifyFileSetResultList } = verifyFileSetAndContinuousProofResult
    console.log('buildVerifyContinuousProofResponse() start', { verifyFileSetAndContinuousProofResult })
    const verifyFileCount = countVerifyFileCount(verifyFileSetResultList)
    const verifyResult = getVerifyResult(verifyProofResult.status)
    const verifyResultDescription = getVerifyResultDescription(verifyProofResult.status)

    const result = {
        status: StatusConstantsString.OK,
        description: verifyResultDescription,
        verifyResultDescription: verifyResultDescription,
        proofFileName: proofFileName,
        verifyResult: verifyResult,
        query: verifyProofResult.query,
        queryType: verifyProofResult.queryType,
        evmEnv: verificationProof.env,
        explorerType: obtainExplorerType(verificationProof.env),
        uploadTimestamp: verifyTimestamp,
        contractAddress: verificationProof.contractAddress,
        totalCount: verifyProofResult.totalCount,
        successCount: verifyProofResult.successCount,
        modifiedCount: verifyProofResult.modifiedCount,
        removedCount: verifyProofResult.removedCount,
        addedCount: verifyProofResult.addedCount,
        errorClearanceOrderInClearanceRecordList: verifyProofResult.errorClearanceOrderInClearanceRecordList,
        proofDetailList: await buildVerifyProofDetailList(verifyProofResult),
        verifyFileNameAndHashDetailList: verifyFileSetResultList,
        verifyFileTotalCount: verifyFileCount.total,
        verifyFileSuccessCount: verifyFileCount.success,
        verifyFileMissingCount: verifyFileCount.missing,
        verifyFileAddedCount: verifyFileCount.added,
        verifyFileModifiedCount: verifyFileCount.modified,
    }
    return result
}

const countVerifyFileCount = (verifyFileSetResultList) => {
    const total = verifyFileSetResultList?.length || 0
    var success = 0
    var modified = 0
    var added = 0
    var missing = 0
    if (verifyFileSetResultList && verifyFileSetResultList.length > 0) {
        verifyFileSetResultList.forEach((result) => {
            switch (result.status) {
                case VerifyFileNameAndHashStatus.OK:
                    {
                        success++
                    }
                    break
                case VerifyFileNameAndHashStatus.ERROR:
                    {
                        modified++
                    }
                    break
                case VerifyFileNameAndHashStatus.NOT_IN_PROOF:
                    {
                        added++
                    }
                    break
                case VerifyFileNameAndHashStatus.MISSING_DATA_TO_VERIFY:
                    {
                        missing++
                    }
                    break
            }
        })
    }

    return {
        total,
        success,
        modified,
        added,
        missing,
    }
}

export { verifyFileSetWithVerificationProof }
