# ITM Verification Pure JS User Guide

## Requirement

-   Node: Version 14 or 16. Please be aware that we cannot ensure the correct functioning of the program with any other version of Node.
-   Infura Node URL
    -   Please refer to [Infura Tutorial](./doc/infura_en.md).

## Configuring Settings and Run Code

Please follow the steps before you run the program.

1. Find `.env` file located in project root.
2. Replace `{YOUR_PROJECT_ID}` with the project ID you obtained from the Infura website.
    ```
    REACT_APP_INFURA_PROJECT_ID={YOUR_PROJECT_ID}
    ```
    - Warning: Please refrain from modifying the variable naming as it may cause the program to not recognize the value.
3. To install the package, enter the following command in the command line:
    ```
    npm install
    ```
4. Then, enter the following command to start the program:
    ```
    npm start
    ```
5. Your program may now be accessible at http://localhost:3000. If the port is being used by another program, you can find the port being used by the verification program in the terminal window.
6. Prepare your ITM Proof Token and begin your journey on the website!

## How Can I Get My ITM Proof Token?

There are two ways to get the ITM Proof Token of your attested data.

1. You may obtain the ITM Proof Token from the Attestation Result page on the [BNS website](https://bns.itrustmachines.com) after the data has been attested.
2. You can also obtain the ITM Proof Token through the BNS API. Please refer to the ["Download Verification Proof"](https://bns.itrustmachines.com/api#download-verification-proof) section in the [BNS API documentation](https://bns.itrustmachines.com/api#download-verification-proof) for more information.

## Verify Using the Program

If you want to call the function and create your own frontend or verification application, you can import and call the following functions to achieve it. We will guide you on how to use these functions in the section below.

### Verify the proof token

-   Description: This method verifies the ITM Proof Token by validating its existence, checking for tampering, and confirming that the data is attested by the BNS server.
-   To import the method, use the following code:
    ```
    import { verifyProof } from './src/function/api/verifyProofApi'
    ```
    Please ensure that you adjust the relative location to match your project's structure.
-   Method signature: `verifyProof(proofFile)`
-   Input: a javascript file object. It should be the ITM Proof Token file.
-   Output object:

    ```json
    {
        "status": "string",
        "description": "string",
        "proofFileName": "string",
        "verifyResult": "string",
        "query": "string",
        "queryType": "string",
        "evmEnv": "string",
        "explorerType": "string",
        "uploadTimestamp": "Integer",
        "verifyResultDescription": "string",
        "contractAddress": "string",
        "totalCount": "Integer",
        "successCount": "Integer",
        "modifiedCount": "Integer",
        "removedCount": "Integer",
        "addedCount": "Integer",
        "proofDetailList": [
            {
                "clearanceOrder": "Integer",
                "cmd": "string",
                "contractRootHash": "string",
                "existenceType": "string",
                "indexValue": "string",
                "ledgerInputTimestamp": "Integer",
                "merkleProofRootHash": "string",
                "pass": true,
                "proofExistStatus": "string",
                "receiptTimestamp": "Integer",
                "txHash": "string",
                "certification": {
                    "address": "string",
                    "certificatedChineseName": "string",
                    "certificatedEnglishName": "string"
                }
            }
        ],
        "errorClearanceOrderInClearanceRecordList": ["Integer"]
    }
    ```

    -   Output fields explanation:

        | Name                                       | Description                                                                                                                                                                                                                           |
        | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
        | `status`                                   | The status of the request. If your verification request has been processed successfully, the status will be `ok`; otherwise, it will be `error`. If the status is `error`, please ensure that your input matches the required format. |
        | `description`                              | The error string. If the value is not blank, please make sure that your input meets the required format.                                                                                                                              |
        | `proofFileName`                            | The file name of the proof.                                                                                                                                                                                                           |
        | `verifyResult`                             | The result of verifying the ITM Proof Token. Either `PASS` or `FAIL`.                                                                                                                                                                 |
        | `query`                                    | The way of query.                                                                                                                                                                                                                     |
        | `queryType`                                | The type of query.                                                                                                                                                                                                                    |
        | `evmEnv`                                   | Blockchain environment.                                                                                                                                                                                                               |
        | `explorerType`                             | The type of blockchain explorer.                                                                                                                                                                                                      |
        | `uploadTimestamp`                          | Timestamp of the time when the verification is conducted.                                                                                                                                                                             |
        | `verifyResultDescription`                  | The description of the verification result.                                                                                                                                                                                           |
        | `contractAddress`                          | BNS smart contract address in blockchain.                                                                                                                                                                                             |
        | `totalCount`                               | Total count of the verification proof in this file.                                                                                                                                                                                   |
        | `successCount`                             | Total count of the number of times the proof was verified successfully.                                                                                                                                                               |
        | `modifiedCount`                            | Total count of the number of times the proof has been modified.                                                                                                                                                                       |
        | `removedCount`                             | Total count of proof that has been removed.                                                                                                                                                                                           |
        | `addedCount`                               | Total count of proof that has been added.                                                                                                                                                                                             |
        | `proofDetailList`                          | The details of the verification proof.                                                                                                                                                                                                |
        | `clearanceOrder`                           | The `clearanceOrder` field in the request body when ledgerInput.                                                                                                                                                                      |
        | `cmd`                                      | The `cmd` field in the request body when ledgerInput.                                                                                                                                                                                 |
        | `contractRootHash`                         | The hash value of attestation data.                                                                                                                                                                                                   |
        | `existenceType`                            | Either `EXIST` or `NOT_EXIST`. Denotes a marker in the Merkle Tree used for verification.                                                                                                                                             |
        | `indexValue`                               | The `indexValue` field in request body when ledgerInput.                                                                                                                                                                              |
        | `ledgerInputTimestamp`                     | The timestamp in milliseconds of the time of ledgerInput.                                                                                                                                                                             |
        | `merkleProofRootHash`                      | The root hash of the merkle proof.                                                                                                                                                                                                    |
        | `pass`                                     | If not true, this means the file has been tampered with and cannot be trusted.                                                                                                                                                        |
        | `proofExistStatus`                         | The exist status of proof.                                                                                                                                                                                                            |
        | `receiptTimestamp`                         | The timestamp in milliseconds in receipt.                                                                                                                                                                                             |
        | `txHash`                                   | The hash value of the transaction.                                                                                                                                                                                                    |
        | `certification`                            | The certification detail of the attester, return null if the attester hasn’t been certified.                                                                                                                                          |
        | `certification::address`                   | The attester's wallet address.                                                                                                                                                                                                        |
        | `certification::certificatedChineseName`   | The Chinese name of the certificated atteste.                                                                                                                                                                                         |
        | `certification::certificatedEnglishName`   | The English name of the certificated attester.                                                                                                                                                                                        |
        | `errorClearanceOrderInClearanceRecordList` | The list of error clearance records which are in verification proof.                                                                                                                                                                  |

### Verify single file with the proof token

-   Description: This method helps you to validate your file integrity with its corresponding ITM Proof Token.
-   To import the method, use the following code:
    ```
    import { verifyRawDataWithVerificationProof } from './src/function/api/verifyRawDataApi'
    ```
    Please ensure that you adjust the relative location to match your project's structure.
-   Method signature: `verifyRawDataWithVerificationProof(rawDataFileName, rawDataFileHash, proofFile, isCheckFileName)`
-   Input parameters explanation:
    | Name | Description |
    | -------- | -------- |
    | `rawDataFileName` | The file name of the file that was attested to BNS. You should obtain the file name by loading the file before calling the method. Remember to include the file extension. |
    | `rawDataFileHash` | The `sha256` hash value of the file content to be verified. You may check out the sample code in the below section. |
    | `proofFile` | The ITM Proof Token file in the form of a javascript `File` object. |
    | `isCheckFileName` | If you wish to only check the integrity of the file content and would like to ignore whether the file name has been tampered or not, you may set the value to `false`. |

    -   An example of how to obtain the file hash of a file uploaded:

        ```javascript
        import CryptoJS from 'crypto-js'
        import sha256 from 'crypto-js/sha256'

        // Read the uploaded file and get its hash using CryptoJS library
        const reader = new FileReader()
        reader.onload = function (e) {
            const wordArray = CryptoJS.lib.WordArray.create(e.target.result)
            const hash = sha256(wordArray).toString()
        }
        reader.readAsArrayBuffer(uploadFile)
        ```

-   Output object:

    ```json
    {
        "status": "string",
        "description": "string",
        "verifyFileName": "string",
        "attestationFileName": "string",
        "proofFileName": "string",
        "verifyResult": "string",
        "fileContentVerifyResult": "PASS",
        "fileNameVerifyResult": "PASS",
        "evmEnv": "string",
        "explorerType": "string",
        "uploadTimestamp": "Integer",
        "verifyResultDescription": "string",
        "contractAddress": "string",
        "indexValue": "string",
        "clearanceOrder": "Integer",
        "ledgerInputTimestamp": "Integer",
        "receiptTimestamp": "Integer",
        "merkleProofRootHash": "string",
        "contractRootHash": "string",
        "proofExistStatus": "string",
        "cmd": "string",
        "txHash": "string",
        "certification": {
            "address": "string",
            "certificatedChineseName": "string",
            "certificatedEnglishName": "string"
        }
    }
    ```

    -   Output fields explanations:

        | Name                                     | Description                                                                                                                                                                                                                         |
        | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
        | `status`                                 | The status of the request. If your verification request has been processed successfully, the status will be `ok`; otherwise, it will be `error`. If the status is error, please ensure that your input matches the required format. |
        | `description`                            | The error string. If the value is not blank, please make sure that your input meets the required format.                                                                                                                            |
        | `attestationFileName`                    | The original file name of the attested file.                                                                                                                                                                                        |
        | `proofFileName`                          | The file name of the proof.                                                                                                                                                                                                         |
        | `verifyResult`                           | The overall result of this verification. If the value is `FAIL`, it means that the file or file name has been altered. If the value is `PROOF_ERROR`, it means that the proof file has been altered.                                |
        | `fileContentVerifyResult`                | Shows whether the file content is the same. If `FAIL`, then the file content has been altered. If `PROOF_ERROR`, the proof file has been altered.                                                                                   |
        | `fileNameVerifyResult`                   | Shows whether the file name is the same. If the value is `FAIL`, it means that the file name has been altered. If the value is `PROOF_ERROR`, it means that the proof file has been altered.                                        |
        | `evmEnv`                                 | Blockchain environment.                                                                                                                                                                                                             |
        | `explorerType`                           | The type of blockchain explorer.                                                                                                                                                                                                    |
        | `uploadTimestamp`                        | Timestamp in milliseconds of when uploading the file and verification proof to verify.                                                                                                                                              |
        | `verifyResultDescription`                | The description of the verified result.                                                                                                                                                                                             |
        | `contractAddress`                        | BNS smart contract address on blockchain.                                                                                                                                                                                           |
        | `indexValue`                             | The `indexValue` field in the request body when ledgerInput.                                                                                                                                                                        |
        | `clearanceOrder`                         | The `clearanceOrder` field in the request body when ledgerInput.                                                                                                                                                                    |
        | `ledgerInputTimestamp`                   | The timestamp in milliseconds when ledgerInput.                                                                                                                                                                                     |
        | `receiptTimestamp`                       | The timestamp in milliseconds in receipt.                                                                                                                                                                                           |
        | `merkleProofRootHash`                    | The root hash of the merkle proof.                                                                                                                                                                                                  |
        | `contractRootHash`                       | The hash value of attestation data on blockchain.                                                                                                                                                                                   |
        | `proofExistStatus`                       | The exist status of proof.                                                                                                                                                                                                          |
        | `cmd`                                    | The `cmd` field in the request body when ledgerInput.                                                                                                                                                                               |
        | `txHash`                                 | The hash value of the transaction on blockchain.                                                                                                                                                                                    |
        | `certification`                          | The certification detail of the attester, return `null` if the attester hasn't been certified.                                                                                                                                      |
        | `certification::address`                 | The attester's wallet address.                                                                                                                                                                                                      |
        | `certification::certificatedChineseName` | The Chinese name of the certificated attester.                                                                                                                                                                                      |
        | `certification::certificatedEnglishName` | The English name of the certificated attester.                                                                                                                                                                                      |

### Verify a set of files with a continuous proof

-   Description: This method allows you to validate the integrity of a list of files along with their corresponding continuous ITM Proof Token. For instance, if you have attested three files in a folder continuously and wish to maintain the folder's integrity while sharing it with others, you can use this method to ensure that no additional files are added to the folder and that all three files remain unaltered. By preparing a set of files and their continuous proof token downloaded from the BNS website, you can use this method to verify the integrity of all the files.
-   To import the method, use the following code:
    ```
    import { verifyFileSetWithVerificationProof } from './src/function/api/verifyFileSetApi'
    ```
    Please ensure that you adjust the relative location to match your project’s structure.
-   Method signature: `verifyFileSetWithVerificationProof(fileNameAndHashList,proofFile)`
-   Input parameters explanation:
    | Name | Description |
    | -------- | -------- |
    | `fileNameAndHashList` | An array list of objects containing `fileName` and `hash` fields. An example of this will be provided in the section below. |
    | `proofFile` | The ITM Proof Token file in the form of a javascript File object. |

    -   An example of the `fileNameAndHashList` variable:
        ```json
        [
            {
                "fileName": "test-file.docx",
                "hash": "2ca7fca34cad3656500b51424eb0b38c25355df5bacb9747700977a3f59863f8"
            },
            {
                "fileName": "test-file-2.pdf",
                "hash": "c63f539ed589f017d2232a5462701acd225bda2b60c71b5456cb2d5b70dca860"
            }
        ]
        ```
    -   **Please ensure that the variable naming matches the example above, or the program may not process correctly.**
    -   The `hash` variable should contain the `sha256` hash value of the file content that needs to be verified. Here's an example code snippet demonstrating this approach:

        ```javascript
        import { sha256 } from 'js-sha256'

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

        const sha256ToHex = (toSha256Data) => {
            const resultString = sha256.hex(toSha256Data)
            return resultString
        }

        const getFileHash = async (file) => {
            const fileContentArrayBuffer = await readFileContentAsArrayBuffer(file)
            const fileHash = sha256ToHex(fileContentArrayBuffer)
            return fileHash
        }
        ```

-   Output object:

    ```json
    {
        {
        "status": "String",
        "description": "String",
        "verifyResultDescription": "String",
        "proofFileName": "String",
        "verifyResult": "String",
        "query": "String",
        "queryType": "String",
        "evmEnv": "String",
        "explorerType": "String",
        "uploadTimestamp": "Number",
        "contractAddress": "String",
        "totalCount": "Number",
        "successCount": "Number",
        "modifiedCount": "Number",
        "removedCount": "Number",
        "addedCount": "Number",
        "errorClearanceOrderInClearanceRecordList": ["Number"],
        "proofDetailList": [
            {
                "indexValue": "String",
                "clearanceOrder": "Number",
                "ledgerInputTimestamp": "Number",
                "receiptTimestamp": "Number",
                "merkleProofRootHash": "String",
                "contractRootHash": "String",
                "existenceType": "String",
                "proofExistStatus": "String",
                "cmd": "String",
                "pass": "Boolean",
                "txHash": "String",
                "certification": {
                    "address": "String",
                    "certificatedChineseName": "String",
                    "certificatedEnglishName": "String",
                    "startTime": "Number",
                    "expireTime": "Number"
                }
            }
        ],
        "verifyFileNameAndHashDetailList": [
            {
                "fileName": "String",
                "fileHash": "String",
                "status": "String"
            }
        ]
        "verifyFileTotalCount": "Number",
        "verifyFileSuccessCount": "Number",
        "verifyFileMissingCount": "Number",
        "verifyFileAddedCount": "Number",
        "verifyFileModifiedCount": "Number"
    }
    }
    ```

    -   Output fields explanation:

        | Name                                        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
        | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
        | `status`                                    | The status of the request. If your verification request has been processed successfully, the status will be `ok`; otherwise, it will be `error`. If the status is `error`, please ensure that your input matches the required format.                                                                                                                                                                                                                                                                                                                                                              |
        | `description`                               | The error string. If the value is not blank, please make sure that your input meets the required format.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
        | `proofFileName`                             | The filename of the proof.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
        | `verifyResult`                              | The result of verifying the ITM Proof Token. Either `PASS` or `FAIL`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
        | `query`                                     | The way of query.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
        | `queryType`                                 | The type of query.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
        | `evmEnv`                                    | Blockchain environment.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
        | `explorerType`                              | The type of blockchain explorer.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
        | `uploadTimestamp`                           | Timestamp of the time when the verification is conducted.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
        | `verifyResultDescription`                   | The description of the verification result.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
        | `contractAddress`                           | BNS smart contract address in blockchain.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
        | `totalCount`                                | Total count of the verification proof in this file.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
        | `successCount`                              | Total count of the number of times the proof was verified successfully.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
        | `modifiedCount`                             | Total count of the number of times the proof has been modified.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
        | `removedCount`                              | Total count of proof that has been removed.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
        | `addedCount`                                | Total count of proof that has been added.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
        | `errorClearanceOrderInClearanceRecordList`  | The list of error clearance records which are in verification proof.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
        | `proofDetailList`                           | The details of verification proof.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
        | `clearanceOrder`                            | The `clearanceOrder` field in the request body when ledgerInput.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
        | `cmd`                                       | The `cmd` field in the request body when ledgerInput.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
        | `contractRootHash`                          | The hash value of attestation data.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
        | `existenceType`                             | Either `EXIST` or `NOT_EXIST`. Denotes a marker in the Merkle Tree used for verification.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
        | `indexValue`                                | The `indexValue` field in request body when ledgerInput.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
        | `ledgerInputTimestamp`                      | The timestamp in milliseconds of the time of ledgerInput.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
        | `merkleProofRootHash`                       | The root hash of the merkle proof.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
        | `pass`                                      | If not true, this means the file has been tampered with and cannot be trusted.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
        | `proofExistStatus`                          | The exist status of proof.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
        | `receiptTimestamp`                          | The timestamp in milliseconds in receipt.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
        | `txHash`                                    | The hash value of the transaction.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
        | `certification`                             | The certification detail of the attester, return null if the attester hasn’t been certified.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
        | `certification::address`                    | Attester wallet address                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
        | `certification::certificatedChineseName`    | The Chinese name of the certificated attester                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
        | `certification::certificatedEnglishName`    | The English name of the certificated attester                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
        | `verifyFileNameAndHashDetailList`           | The details of the files that are verified.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
        | `verifyFileNameAndHashDetailList::fileName` | Name of the file.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
        | `verifyFileNameAndHashDetailList::fileHash` | `sha256` hash value of the file content.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
        | `verifyFileNameAndHashDetailList::status`   | The verify status of the file. The value should be one of the following values: `OK`, `ERROR`, `MISSING_DATA_TO_VERIFY`, or `NOT_IN_PROOF`. A status of `OK` indicates that the file has not been tampered with, while a status of `ERROR` indicates that it has been tampered with. If the status is `MISSING_DATA_TO_VERIFY`, it means that the file is included in the proof token but not in the list of files being verified. If the status is `NOT_IN_PROOF`, it means that the file is included in the list of files being verified, but its corresponding proof is not in the proof token. |
        | `verifyFileTotalCount`                      | Total count of the files being verified.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
        | `verifyFileSuccessCount`                    | Total count of files that have not been tampered with.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
        | `verifyFileMissingCount`                    | Total count of files that are missing for verifying.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
        | `verifyFileAddedCount`                      | Total count of files that are added and cannot be verified because it's not in the proof token.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
        | `verifyFileModifiedCount`                   | Total count of files that have been tampered with.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
