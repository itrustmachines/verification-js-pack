import { sha256 } from 'js-sha256'
import cryptoJSsha256 from 'crypto-js/sha256'
import cryptoJS from 'crypto-js'

const sha256HexString = (hexString) => {
    return cryptoJSsha256(cryptoJS.enc.Hex.parse(hexString)).toString()
}

const sha256ToHex = (toSha256Data) => {
    const resultString = sha256.hex(toSha256Data)
    return resultString
}

const sha256toInt8Arr = (toSha256Data) => {
    const result = new Int8Array(sha256.arrayBuffer(toSha256Data))
    return result
}

const hexToBytes = (hex) => {
    if (!hex) {
        return null
    }
    for (var bytes = [], c = 0; c < hex.length; c += 2) {
        bytes.push(parseInt(hex.substr(c, 2), 16))
    }
    const result = new Int8Array(bytes)
    return result
}

export { sha256HexString, sha256ToHex, sha256toInt8Arr, hexToBytes }
