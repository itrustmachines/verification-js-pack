import { EthereumEnv } from '../../constants/EthereumEnv'
import { ExplorerType } from '../../constants/ExplorerType'

export const obtainExplorerType = (env) => {
    var explorerType
    if (env === EthereumEnv.AZURE_QUORUM) {
        explorerType = ExplorerType.EPIRUS
    } else if (env === EthereumEnv.PRIVATE_GETH) {
        explorerType = ExplorerType.BLOCKSCOUT
    } else {
        explorerType = ExplorerType.ETHERSCAN
    }
    return explorerType
}
