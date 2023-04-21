import { verify } from './verifyService'
import { ExistenceType } from '../../constants/ExistenceType'
import VerifyFileNameAndHashStatus from '../../constants/VerifyFileNameAndHashStatus'

const verifyFileSetAndContinuousProof = async (verificationProof, fileNameAndHashList, infuraProjectId) => {
    const verifyProofResult = await verify(verificationProof, infuraProjectId)
    const verifyFileSetResultList = await verifyFileNameAndHashListWithContinuousProof(
        fileNameAndHashList,
        verifyProofResult,
    )
    console.log('verifyFileSetAndContinuousProof() end', { verifyProofResult, verifyFileSetResultList })
    return { verifyProofResult, verifyFileSetResultList }
}

//TODO add unit test
const verifyFileNameAndHashListWithContinuousProof = async (fileNameAndHashList, verifyProofResult) => {
    console.log('verifyFileNameAndHashListWithContinuousProof() start', { fileNameAndHashList, verifyProofResult })
    const existProofVerifyResultList = getOnlyExistVerifyReceiptResult(verifyProofResult.verifyReceiptResult)
    var verifyFileSetResultList = existProofVerifyResultList.map((existProofVerifyResult) => {
        const verifyFileNameAndFileHashResult = verifyFileNameAndHashWithProofVerifyResult(
            existProofVerifyResult,
            fileNameAndHashList,
        )
        console.log({ verifyFileNameAndFileHashResult, fileNameAndHashList })
        return verifyFileNameAndFileHashResult
    })
    // Add remain element to result list
    fileNameAndHashList.forEach((element) => {
        var verifyResult = {
            fileName: element.fileName,
            fileHash: element.hash,
            status: VerifyFileNameAndHashStatus.NOT_IN_PROOF,
        }
        verifyFileSetResultList.push(verifyResult)
    })
    console.log('verifyFileNameAndHashListWithContinuousProof() end', { verifyFileSetResultList })
    return verifyFileSetResultList
}

//TODO add unit test
const verifyFileNameAndHashWithProofVerifyResult = (existProofVerifyResult, fileNameAndHashList) => {
    var verifyFileNameAndHashResult = null
    var verifyStatus = null
    if (isFileType(existProofVerifyResult.cmd)) {
        const cmdObject = JSON.parse(existProofVerifyResult.cmd)
        if (existProofVerifyResult.pass) {
            const fileObjectInList = getFileObjectInList(cmdObject.fileName, fileNameAndHashList)
            console.log({ fileObjectInList, cmdFileName: cmdObject.fileName })
            if (fileObjectInList) {
                // remove the file from the list
                fileNameAndHashList.splice(fileObjectInList.index, 1)
                if (cmdObject.fileHash === fileObjectInList.hash) {
                    verifyStatus = VerifyFileNameAndHashStatus.OK
                } else {
                    verifyStatus = VerifyFileNameAndHashStatus.ERROR
                }
            } else {
                verifyStatus = VerifyFileNameAndHashStatus.MISSING_DATA_TO_VERIFY
            }
        } else {
            verifyStatus = VerifyFileNameAndHashStatus.ERROR
        }
        verifyFileNameAndHashResult = {
            fileName: cmdObject.fileName,
            fileHash: cmdObject.fileHash,
            status: verifyStatus,
        }
    }
    return verifyFileNameAndHashResult
}

const getFileObjectInList = (fileName, fileNameAndHashList) => {
    var result = null
    for (let i = 0; i < fileNameAndHashList.length; i++) {
        if (fileNameAndHashList[i].fileName === fileName) {
            result = { ...fileNameAndHashList[i], index: i }
            break
        }
    }
    return result
}

const isFileType = (cmd) => {
    var result = false
    if (cmd) {
        if (cmd.includes('fileName') && cmd.includes('fileHash')) {
            result = true
        }
    }
    return result
}

const getOnlyExistVerifyReceiptResult = (verifyReceiptResultList) => {
    const result = verifyReceiptResultList.filter((object) => {
        return object.existenceType === ExistenceType.EXIST
    })
    return result
}

export { verifyFileSetAndContinuousProof }
export const __testing =
    process.env.NODE_ENV === 'test'
        ? {
              verifyFileNameAndHashListWithContinuousProof,
              verifyFileNameAndHashWithProofVerifyResult,
              getFileObjectInList,
              isFileType,
              getOnlyExistVerifyReceiptResult,
          }
        : void 0
