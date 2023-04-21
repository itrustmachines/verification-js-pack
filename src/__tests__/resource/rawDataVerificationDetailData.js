const detailData = {
    status: 'ok',
    verifyResult: 'PASS',
    description: 'Verify success',
    verifyResultDescription: 'Verify success',
    verifyFileName: 'DSC_0077.JPG',
    proofFileName: 'DSC_0077.JPG_102_0.itm',
    evmEnv: 'GOERLI',
    explorerType: 'etherscan',
    contractAddress: '0x483410b15Eca4A22fC122d34840F0498e624fA43',
    uploadTimestamp: 1673322560305,
    indexValue: '0xdea7119c372b33f62b00d430e26b9f4383fcbfbd_R0',
    clearanceOrder: 102,
    ledgerInputTimestamp: 1666055024283,
    receiptTimestamp: 1666055027487,
    merkleProofRootHash: '53c00d0bd56af5e28c9957fbc05f02461cd90d055a2aae46aa8bd7f9bd76104e',
    contractRootHash: '53c00d0bd56af5e28c9957fbc05f02461cd90d055a2aae46aa8bd7f9bd76104e',
    proofExistStatus: 'PASS',
    txHash: '0x9306f3d64a21c4e5c3776312822be0773def5abaa530d6d583074cd0f395e392',
    certification: {
        address: '0xdea7119c372b33f62b00d430e26b9f4383fcbfbd',
        certificatedChineseName: '吳奕萱',
        certificatedEnglishName: 'Olive Wu',
    },
    cmd:
        '{"fileName":"DSC_0077.JPG","fileHash":"5a068f29ce2d0fa97cdbadfddfe804b2ad24212131751ef018f88f0002cc2540","description":"test","timestamp":1666055024283,"callerAddress":"0xdea7119c372b33f62b00d430e26b9f4383fcbfbd"}',
    attestationFileName: 'DSC_0077.JPG',
    fileNameVerifyResult: 'PASS',
    fileContentVerifyResult: 'PASS',
    uploadFileHash: '5a068f29ce2d0fa97cdbadfddfe804b2ad24212131751ef018f88f0002cc2540',
    isVerifyFileName: true,
}

const emptyDescriptionData = {
    ...detailData,
    cmd:
        '{"fileName":"DSC_0077.JPG","fileHash":"5a068f29ce2d0fa97cdbadfddfe804b2ad24212131751ef018f88f0002cc2540","description":"","timestamp":1666055024283,"callerAddress":"0xdea7119c372b33f62b00d430e26b9f4383fcbfbd"}',
}

export { detailData, emptyDescriptionData }
