import ABI from '../../constants/LedgerBoosterABI'
import Web3 from 'web3'

/**
 * @function : loadContract
 *
 * @description : Get the contract by calling Web3 API
 *
 * @note :
 *
 * @param {String} contractAddress : proof contract address
 * @param {String} nodeUrl : nodeUrl
 *
 * @returns : contract
 */
const loadContract = (contractAddress, nodeUrl) => {
    const web3 = new Web3(new Web3.providers.HttpProvider(nodeUrl))

    try {
        return new web3.eth.Contract(ABI, contractAddress)
    } catch (err) {
        console.log('loadContract() error', err)
        // TODO error handle
    }
    //return new window.web3.eth.Contract(ABI, contractAddress);
}

/**
 * @function : obtainClearanceRecordFromContract
 *
 * @description : Get the clearance record from contract by calling Web3 API
 *
 * @note : Remember to use MetaMask to connect to blockchain. Comment out enableEthService()
 *
 * @param {String} contractAddress : proof contract address
 * @param {Number} infuraProjectId : latest clearance order
 * @param {String} nodeUrl : nodeUrl
 *
 * @returns : clearanceRecord
 */
const obtainClearanceRecordFromContract = async (contractAddress, clearanceOrder, nodeUrl) => {
    //enableEthService(); // MetaMask
    var clearanceRecord
    try {
        const spoContract = loadContract(contractAddress, nodeUrl)
        clearanceRecord = await spoContract.methods.clearanceRecords(clearanceOrder).call()
    } catch (err) {
        console.log('obtainClearanceRecordFromContract() error', err)
        //TODO error handle
    }

    return {
        clearanceOrder: Number(clearanceRecord.clearanceOrder),
        rootHash: clearanceRecord.rootHash.replace('0x', ''),
        createTime: clearanceRecord.createTime,
        chainHash: clearanceRecord.chainHash.replace('0x', ''),
        description: clearanceRecord.description,
    }
}

export { obtainClearanceRecordFromContract, loadContract }
