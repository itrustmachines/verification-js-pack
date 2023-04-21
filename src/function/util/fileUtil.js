import { sha256ToHex } from './hashUtil'

const readFileContent = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = function (e) {
            resolve(e.target.result)
        }
        reader.onerror = function (e) {
            reject(e)
        }
        reader.readAsText(file)
    })
}

const loadVerificationProofFileToJson = async (file) => {
    const fileContent = await readFileContent(file)
    const verificationProof = JSON.parse(fileContent)
    return verificationProof
}

const readFileContentAsArrayBuffer = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = function (e) {
            resolve(e.target.result)
        }
        reader.onerror = function (e) {
            reject(e)
        }
        reader.readAsArrayBuffer(file)
    })
}

const getFileHash = async (file) => {
    const fileContentArrayBuffer = await readFileContentAsArrayBuffer(file)
    const fileHash = sha256ToHex(fileContentArrayBuffer)
    return fileHash
}

export { loadVerificationProofFileToJson, getFileHash }
