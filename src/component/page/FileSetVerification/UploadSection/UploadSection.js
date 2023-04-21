import React, { useState } from 'react'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { useSnackbar } from 'notistack'
import moment from 'moment'
import { Hidden } from '@mui/material'
import VerifyStepper from '../../../common/VerifyStepper/VerifyStepper'
import UploadFolder from './UploadFolder'
import UploadVerificationProof from '../../../common/UploadVerificationProof'
import { verifyFileSetWithVerificationProof } from '../../../../function/api/verifyFileSetApi'
import UploadedInfoSection from '../../../common/UploadedInfoSection'
import StepperButton from '../../../common/VerifyStepper/StepperButton'
import RwdUploadSection from './RwdUploadSection'
import { getAndSha256FileList } from '../../../../util/cryptoUtil'
import { toHumanReadableFileSize } from '../../../../util/stringUtil'

const UploadSection = ({ handleDetailDataChange, handleInProgress, handleProgressDone }) => {
    const { t } = useTranslation()
    const { enqueueSnackbar } = useSnackbar()
    const [activeStep, setActiveStep] = useState(0)
    const [verificationProof, setverificationProof] = useState([])
    const [fileList, setFileList] = useState([])
    const [rootFolderName, setRootFolderName] = useState('')

    const handleProofDataChange = (files) => {
        setverificationProof(files)
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
        handleProgressDone()
    }

    const handleFileBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
        setFileList([])
    }

    const handleProofBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
        setverificationProof([])
    }

    const onBackButtonClick = () => {
        if (activeStep === 1) {
            handleFileBack()
        } else if (activeStep === 2) {
            handleProofBack()
        }
    }

    const handleVerify = () => {
        handleInProgress()
        const uploadTimestamp = Number(moment(moment.now()).format('x'))
        verifyFileSetWithVerificationProof(fileList, verificationProof[0])
            .then((result) => {
                console.log('handleVerify() res=', result)
                var fileVerifyResult = 'FAIL'
                if (result.verifyResult === 'FAIL') {
                    fileVerifyResult = 'PROOF_ERROR'
                } else if (result.verifyFileTotalCount === result.verifyFileSuccessCount) {
                    fileVerifyResult = 'PASS'
                }

                handleDetailDataChange({
                    ...result,
                    rootFolderName,
                    fileVerifyResult,
                    uploadTimestamp,
                })

                enqueueSnackbar(`${t('Upload successful')}`, {
                    variant: 'success',
                })
                handleNext()
            })
            .catch((error) => {
                console.log('handleVerify() error=', error)
                enqueueSnackbar(t('Upload fail'), {
                    variant: 'error',
                })
                handleNext()
            })
    }

    const handleReset = () => {
        setActiveStep(0)
        setFileList([])
        setRootFolderName('')
        setverificationProof([])
    }

    //RWD
    const maxSize = Number(process.env.REACT_APP_UPLOAD_MAX_SIZE) * 1024 * 1024
    const getRootFolderName = (path) => {
        return path.slice(0, path.indexOf('/'))
    }

    const checkFileInRootFolder = (file) => {
        var folderPath = file.webkitRelativePath.slice(0, file.webkitRelativePath.indexOf(file.name))
        var count = (folderPath.match(/\//g) || []).length
        if (count > 1) {
            return false
        }
        return true
    }
    const checkFileNameValid = (name) => {
        const nameFirstIndex = name.slice(0, 1)
        if (nameFirstIndex.includes('.') || nameFirstIndex.includes('~') || nameFirstIndex.includes('$')) {
            return false
        }

        if (name.toLocaleLowerCase() === 'desktop.ini') {
            return false
        }

        return true
    }

    const onFolderUpload = (event) => {
        const acceptedFiles = event.target.files
        const uploadFiles = Object.keys(acceptedFiles).map((key) => acceptedFiles[key])
        console.log('start uploading files, acceptedFiles=', uploadFiles)
        //calculate upload files total size
        var uploadFilesSize = 0
        uploadFiles.forEach((file) => (uploadFilesSize += file.size))

        if (uploadFilesSize <= maxSize && uploadFiles.length > 0) {
            handleInProgress()

            // set root folder name
            var folderName = getRootFolderName(uploadFiles[0].webkitRelativePath)
            setRootFolderName(folderName)
            // Only get files in root folder, and ignore hidden file name
            var toReadFiles = []
            for (let i = 0; i < uploadFiles.length; i++) {
                var file = uploadFiles[i]
                if (checkFileInRootFolder(file) && checkFileNameValid(file.name)) {
                    toReadFiles.push(file)
                }
            }
            // TODO handle if root folder doesn't contain any file (only subfolder has file)
            const onProgress = (index, progress, fileName) => {
                console.log(`index=${index}, fileName=${fileName}`)
            }
            getAndSha256FileList(toReadFiles, onProgress).then((toVerifyFileList) => {
                console.log('toVerifyFileList=', toVerifyFileList)
                setFileList(toVerifyFileList)
                !verificationProof[0] ? setActiveStep(1) : setActiveStep(2)
                handleProgressDone()
            })
        } else {
            enqueueSnackbar(
                `${i18next.t('Maximum file upload size is {{maxSize}}', {
                    maxSize: toHumanReadableFileSize(maxSize),
                })}`,
                {
                    variant: 'warning',
                },
            )
        }
    }
    const onProofUpload = (event) => {
        const uploadProof = event.target.files[0]
        console.log('uploadProof=', uploadProof)
        if (
            uploadProof.name.slice(uploadProof.name.lastIndexOf('.')) === '.json' ||
            uploadProof.name.slice(uploadProof.name.lastIndexOf('.')) === '.itm'
        ) {
            if (uploadProof.size <= maxSize) {
                setverificationProof([uploadProof])
                setActiveStep(2)
            } else {
                enqueueSnackbar(
                    `${i18next.t('Maximum file upload size is {{maxSize}}', {
                        maxSize: toHumanReadableFileSize(maxSize),
                    })}`,
                    {
                        variant: 'warning',
                    },
                )
            }
        } else {
            enqueueSnackbar(`${t('Upload off-chain proof file name extension need to be .json or .itm')}`, {
                variant: 'warning',
            })
        }
    }

    return (
        <>
            <Hidden only={['xs']}>
                <VerifyStepper activeStep={activeStep} />
                {activeStep === 0 && (
                    <UploadFolder
                        setFileList={setFileList}
                        setRootFolderName={setRootFolderName}
                        handleUploadStart={handleInProgress}
                        handleNext={handleNext}
                    />
                )}
                {activeStep === 1 && fileList.length > 0 && (
                    <UploadVerificationProof
                        uploadedFiles={fileList}
                        handleProofDataChange={handleProofDataChange}
                        handleNext={handleNext}
                        rootFolderName={rootFolderName}
                    />
                )}
                {activeStep === 2 && (
                    <UploadedInfoSection
                        uploadedFiles={fileList}
                        verificationProof={verificationProof}
                        rootFolderName={rootFolderName}
                    />
                )}
                <StepperButton
                    activeStep={activeStep}
                    onBackButtonClick={onBackButtonClick}
                    handleVerify={handleVerify}
                    handleReset={handleReset}
                />
            </Hidden>
            <Hidden only={['sm', 'md', 'lg', 'xl']}>
                <RwdUploadSection
                    activeStep={activeStep}
                    fileList={fileList}
                    rootFolderName={rootFolderName}
                    verificationProof={verificationProof}
                    onFolderUpload={onFolderUpload}
                    onProofUpload={onProofUpload}
                    handleReset={handleReset}
                    handleVerify={handleVerify}
                />
            </Hidden>
        </>
    )
}

UploadSection.propTypes = {
    handleDetailDataChange: PropTypes.func.isRequired,
    handleInProgress: PropTypes.func.isRequired,
    handleProgressDone: PropTypes.func.isRequired,
}

export default UploadSection
