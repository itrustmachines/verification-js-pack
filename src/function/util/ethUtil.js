import Web3 from 'web3'

const enableEthService = () => {
    if (window.ethereum !== undefined) {
        window.web3 = new Web3(window.ethereum)

        window.ethereum.enable().catch((error) => {
            console.log('enableEthService() error', error)
            return false
        })
        return true
    }
    return false
}

const toSha3String = (message) => {
    //enableEthService();
    return Web3.utils.sha3(message)
    //return window.web3.utils.sha3(message)
}

const recoverAddress = (message, signatureR, signatureS, signatureV) => {
    var Accounts = require('web3-eth-accounts')
    var accounts = new Accounts()
    const keccak256 = require('keccak256')
    var recoverAddress
    try {
        recoverAddress = accounts.recover({
            messageHash: '0x' + keccak256(message).toString('hex'),
            r: signatureR,
            s: signatureS,
            v: signatureV,
        })
    } catch (error) {
        recoverAddress = ''
    }

    return recoverAddress
    /*
    return window.web3.eth.accounts.recover({
        messageHash: hashedMessage,
        r: signatureR,
        s: signatureS,
        v: signatureV,
    })
    */
}

const recoverEthereumAddress = (message, signatureR, signatureS, signatureV) => {
    var Accounts = require('web3-eth-accounts')
    var accounts = new Accounts()
    //const web3 = new Web3();
    const hashedMessage = accounts.hashMessage(message)
    var recoverAddress
    try {
        //recoverAddress = web3.eth.accounts.recover(message, signatureV, signatureR, signatureS, false);
        recoverAddress = accounts.recover({
            messageHash: hashedMessage,
            r: signatureR,
            s: signatureS,
            v: signatureV,
        })
    } catch (error) {
        recoverAddress = ''
    }

    return recoverAddress
    /*
    return window.web3.eth.accounts.recover({
        messageHash: hashedMessage,
        r: signatureR,
        s: signatureS,
        v: signatureV,
    })
    */
}

export { enableEthService, toSha3String, recoverAddress, recoverEthereumAddress }
