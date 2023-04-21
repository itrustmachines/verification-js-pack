const isRootHashEqual = (record, rootHash) => {
    console.log(`isRootHashEqual() CR = ${record}, rootHash=${rootHash}`)
    var pass = false

    if (record !== null) {
        pass = record.rootHash === rootHash
    }

    console.log('isRootHashEqual() pass = ' + pass)
    return pass
}

export { isRootHashEqual }
