import { recoverAddress, recoverEthereumAddress } from './ethUtil'
import {
    buildMerkleProofToSignData,
    buildProofMessage,
    buildProofMessageFail,
    buildReceiptToSignData,
} from './messageBuilderUtil'

/**
 *
 * @param {toVerifyMessageString} message
 * @param {SPO Signature Object, containing r,s,v, all without '0x'} sigServer
 * @param {SPO serverWalletAddress} serverWalletAddress
 */
const verifySPOSignature = (message, sigServer, serverWalletAddress) => {
    if (
        message !== null &&
        sigServer !== null &&
        serverWalletAddress !== null &&
        sigServer.r !== null &&
        sigServer.s !== null &&
        sigServer.v !== null
    ) {
        var result = verifyEthereumSignature(message, sigServer, serverWalletAddress)

        if (!result) {
            const recoveredAddress = recoverAddress(message, '0x' + sigServer.r, '0x' + sigServer.s, '0x' + sigServer.v) // sha3()
            console.log('verifySPOSignature()', { recoveredAddress, serverWalletAddress })
            result =
                recoveredAddress.toString().toLocaleLowerCase() === serverWalletAddress.toString().toLocaleLowerCase()
        }

        console.log('verifySPOSignature() result=', result)
        return result
    } else {
        return false
    }
}

const verifyEthereumSignature = (message, sigServer, serverWalletAddress) => {
    console.log('verifyEthereumSignature() sigServer=', sigServer, 'serverWalletAddess=', serverWalletAddress)
    if (
        message !== null &&
        sigServer !== null &&
        serverWalletAddress !== null &&
        sigServer.r !== null &&
        sigServer.s !== null &&
        sigServer.v !== null
    ) {
        const recoveredAddress = recoverEthereumAddress(
            message,
            '0x' + sigServer.r,
            '0x' + sigServer.s,
            '0x' + sigServer.v,
        ) // prefixMessage
        console.log('verifyEthereumSignature()', { recoveredAddress, serverWalletAddress })
        const result =
            recoveredAddress.toString().toLocaleLowerCase() === serverWalletAddress.toString().toLocaleLowerCase()
        console.log('verifyEthereumSignature() result=', result)
        return result
    } else {
        return false
    }
}

const verifyProofSignature = (verificationProof, first) => {
    var proofMessage

    if (first) {
        proofMessage = buildProofMessage(verificationProof)
    } else {
        proofMessage = buildProofMessageFail(verificationProof)
    }

    const { sigServer, serverWalletAddress } = verificationProof
    const result = verifySPOSignature(proofMessage, sigServer, serverWalletAddress)
    console.log('verifyProofSignature() proofMessage=,', proofMessage, 'result=', result)
    return result
}

const verifyReceiptSignature = (receipt, serverWalletAddress) => {
    const receiptMessage = buildReceiptToSignData(receipt)
    const { sigServer } = receipt
    const result = verifySPOSignature(receiptMessage, sigServer, serverWalletAddress)
    return result
}

const verifyMerkleProofSignature = (merkleProof, serverWalletAddess) => {
    const merkleProofMessage = buildMerkleProofToSignData(merkleProof)
    const { sigServer } = merkleProof
    return verifySPOSignature(merkleProofMessage, sigServer, serverWalletAddess)
}

export { verifyProofSignature, verifyReceiptSignature, verifyMerkleProofSignature }
