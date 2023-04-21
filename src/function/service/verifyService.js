import { obtainClearanceRecordFromContract } from './clearanceRecordService'
import { getFileHash } from '../util/fileUtil'
import { toNodeUrl } from '../util/InfuraNodeUrlConfig'
import { verifyExistenceProof } from './verifyVerificationProofService'
import { VerifyVerificationProofStatus } from '../../constants/VerifyVerificationProofStatus'
import VerifyResult from '../../constants/VerifyResult'

/**
 * @function : verifyProof
 *
 * @description : call verify to start verify the proof
 *
 * @note : 1. Remove infureProjectId before release to public and add it to parameters
 *         2. For security, only use MetaMask to connect to blockchain
 *
 * @param proof : verification proof in JSON format
 *
 * @returns : boolean
 */
const verifyProof = async (proof) => {
    const infuraProjectId = 'ac507600c7294ae38575a7f029ef7b55'
    const result = await verify(proof, infuraProjectId)
    console.log('verifyProof()', { result })
    if (result.status === VerifyVerificationProofStatus.ALL_PASS) {
        return true
    } else {
        return false
    }
}

/**
 * @function : verify
 *
 * @description : call verifyExistenceProof to start verify the Proof
 *
 * @param {verificationProof} proof : verification proof in JSON format
 * @param {String} infuraProjectId : infuraProjectId
 *
 * @returns : result object
 */
const verify = async (proof, infuraProjectId) => {
    //console.log('verifyService verify() proof = ' + proof + ' infuraProjectId = ' + infuraProjectId );

    const nodeUrl = getNodeUrl(proof, infuraProjectId)
    const latestCO = findLatestCO(proof)
    const latestCR = await obtainClearanceRecordFromContract(proof.contractAddress, latestCO, nodeUrl)
    const result = await verifyExistenceProof(proof, latestCR, nodeUrl)

    console.log('verifyService verify() result = ', result)
    return result
}

/**
 * @function : getNodeUrl
 *
 * @description : Get the nodeUrl from infureProjectId which depending on proof enviroment.
 *
 * @param {verificationProof} proof : verification proof in JSON format
 * @param {String} infuraProjectId : infuraProjectId
 *
 * @returns : nodeUrl
 */
const getNodeUrl = (proof, infuraProjectId) => {
    var nodeUrl = infuraProjectId
    switch (proof.env) {
        case 'MAINNET':
        case 'KOVAN':
        case 'GOERLI':
        case 'RINKEBY':
        case 'ROPSTEN':
            nodeUrl = toNodeUrl(proof.env, infuraProjectId)
            break
        case 'AZURE_QUORUM':
        case 'PRIVATE_GETH':
            nodeUrl = proof.nodeConnectionString
            break
        default:
            console.error(`verify() error, env=${proof.env} error`)
            break
    }
    console.log('verifyService getNodeUrl() nodeUrl = ' + nodeUrl)
    return nodeUrl
}

/**
 * @function : findLatestCO
 *
 * @description : find the latest clearance order from proof
 *
 * @param {verificationProof} proof : verification proof in JSON format
 *
 * @returns : latestCO
 */
const findLatestCO = (proof) => {
    var latestCO = -1
    for (var clearanceRecord of proof.clearanceRecords) {
        if (clearanceRecord.clearanceOrder > latestCO) {
            latestCO = clearanceRecord.clearanceOrder
        }
    }
    return latestCO
}

const verifyFileInfoWithCmd = (fileName, fileHash, cmdObject, isCheckFileName) => {
    const attestationFileName = cmdObject.fileName
    const attestationFileHash = cmdObject.fileHash
    var result = {
        verifyFileName: fileName,
        attestationFileName,
        pass: false,
        fileNamePass: VerifyResult.FAIL,
        fileHashPass: VerifyResult.FAIL,
    }
    var isAllPass = true
    var isFileNamePass = true
    var isFileHashPass = true

    if (isCheckFileName) {
        isFileNamePass = attestationFileName === fileName
    }

    isFileHashPass = attestationFileHash === fileHash
    isAllPass = isFileNamePass && isFileHashPass

    result = {
        ...result,
        pass: isAllPass,
        fileNamePass: isFileNamePass ? VerifyResult.PASS : VerifyResult.FAIL,
        fileHashPass: isFileHashPass ? VerifyResult.PASS : VerifyResult.FAIL,
    }

    return result
}

/**
 *
 * @param {file} file
 * @param {verificationProof} verificationProof
 * @returns fileNameResult, fileContentResult: an object containing verify result
 */
const verifyRawDataWithFile = async (file, verificationProof) => {
    console.log('verifyRawData() file=', file.name)
    const fileHash = await getFileHash(file)
    const fileName = file.name
    const cmd = JSON.parse(verificationProof.existenceProofs[0].receipt.cmd)

    var verifyFileNameResult = false
    var verifyFileContentResult = false
    if (fileHash.toLowerCase() === cmd.fileHash.toLowerCase()) {
        verifyFileContentResult = true
    }

    if (fileName === cmd.fileName) {
        verifyFileNameResult = true
    }

    var verifyResult = {
        fileNameResult: verifyFileNameResult,
        fileContentResult: verifyFileContentResult,
    }
    return verifyResult
}

/**
 *
 * @param {string} fileName
 * @param {string} fileHash
 * @param {object} verificationProof will only use the first existence proof receipt to verify raw data file
 * @param {boolean} isCheckFileName whether verify file name or not
 * @returns {object} object containing verify result and some detail, such as the cmd and co iv of the receipt used for verifying.
 */
const verifyRawDataWithFileNameAndHash = (fileName, fileHash, verificationProof, isCheckFileName) => {
    const proofUsed = verificationProof.existenceProofs[0]
    const receipt = proofUsed.receipt
    const cmd = receipt.cmd
    const cmdObject = JSON.parse(cmd)
    var verifyFileWithCmdResult = {
        verifyFileName: '',
        attestationFileName: '',
        pass: false,
        fileNamePass: '',
        fileHashPass: '',
    }
    verifyFileWithCmdResult = verifyFileInfoWithCmd(fileName, fileHash, cmdObject, isCheckFileName)
    return verifyFileWithCmdResult
}

export { verify, verifyProof, verifyRawDataWithFile, verifyRawDataWithFileNameAndHash, findLatestCO, getNodeUrl }
