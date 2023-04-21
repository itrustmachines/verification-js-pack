const toNodeUrl = (env, infuraProjectId) => {
    return 'https://' + env.toLowerCase() + '.infura.io/v3/' + infuraProjectId
}

const toProjectId = (nodeUrl) => {
    const pattern = '(https?):\\/\\/[-a-zA-Z0-9+&@#\\/%?=~_|!:,.;]*[-a-zA-Z0-9+]'
    const matchArray = nodeUrl.match(pattern)
    var resultUrl = nodeUrl
    if (matchArray.length > 0) {
        resultUrl = matchArray[0]
    }

    return resultUrl.substring(resultUrl.lastIndexOf('/') + 1)
}
export { toNodeUrl, toProjectId }
