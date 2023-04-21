import React, { useState } from 'react'
import PropTypes from 'prop-types'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import CryptoJS from 'crypto-js'
import sha256 from 'crypto-js/sha256'
import moment from 'moment'
import { Box, Hidden } from '@mui/material'

import VerifyStepper from '../../../common/VerifyStepper/VerifyStepper'
import UploadBinaryData from './UploadBinaryData'
import UploadVerificationProof from '../../../common/UploadVerificationProof'
import UploadedInfoSection from '../../../common/UploadedInfoSection'
import StepperButton from '../../../common/VerifyStepper/StepperButton'
import RwdUploadSection from './RwdUploadSection'
import { verifyRawDataWithVerificationProof } from '../../../../function/api/verifyRawDataApi'
import { toHumanReadableFileSize } from '../../../../util/stringUtil'

const UploadSection = ({ handleDetailDataChange, handleBackdropOpen, handleBackdropClose }) => {
    const { t } = useTranslation()
    const { enqueueSnackbar } = useSnackbar()
    const [activeStep, setActiveStep] = useState(0)
    const [binaryData, setbinaryData] = useState([])
    const [binaryHash, setbinaryHash] = useState('')
    const [binaryName, setbinaryName] = useState('')
    const [verificationProof, setverificationProof] = useState([])

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }

    const handleBinaryBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
        setbinaryData([])
    }
    const handleProofBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
        setverificationProof([])
    }

    const handleFileDataChange = (files) => {
        setbinaryData(files)
    }

    const handleFileHashChange = (fileHash) => {
        setbinaryHash(fileHash)
    }

    const handleFileNameChange = (fileName) => {
        setbinaryName(fileName)
    }

    const handleProofDataChange = (files) => {
        setverificationProof(files)
    }

    const onBackButtonClick = () => {
        if (activeStep === 1) {
            handleBinaryBack()
        } else if (activeStep === 2) {
            handleProofBack()
        }
    }

    const handleReset = () => {
        setActiveStep(0)
        setbinaryData([])
        setbinaryHash('')
        setbinaryName('')
        setverificationProof([])
        handleDetailDataChange(null)
    }

    const handleVerify = async () => {
        handleBackdropOpen()
        let timeOut = setTimeout(() => {
            handleBackdropClose()
            enqueueSnackbar(`${t('Upload fail')}`, {
                variant: 'error',
            })
        }, 30000)
        const uploadTimestamp = Number(moment(moment.now()).format('x'))

        verifyRawDataWithVerificationProof(binaryName, binaryHash, verificationProof[0], isVerifyFileName)
            .then((result) => {
                console.log('verifyRawDataWithVerificationProof result=', result)
                if (result.status === 'ok') {
                    handleBackdropClose()
                    clearTimeout(timeOut)
                    handleDetailDataChange({
                        ...result,
                        uploadFileHash: binaryHash,
                        verifyFileName: binaryName,
                        isVerifyFileName: isVerifyFileName,
                        uploadTimestamp: uploadTimestamp,
                    })
                    enqueueSnackbar(`${t('Upload successful')}`, {
                        variant: 'success',
                    })
                } else if (
                    result.status !== 'ok' &&
                    result.description &&
                    result.description.toLocaleLowerCase().includes('convert', 'fail')
                ) {
                    handleBackdropClose()
                    clearTimeout(timeOut)
                    enqueueSnackbar(`${t('Fail to upload, proof file content is not JSON format')}`, {
                        variant: 'error',
                    })
                } else {
                    handleBackdropClose()
                    clearTimeout(timeOut)
                    enqueueSnackbar(`${t('Upload fail')}`, {
                        variant: 'error',
                    })
                }
                handleNext()
            })
            .catch(() => {
                handleBackdropClose()
                clearTimeout(timeOut)
                enqueueSnackbar(`${t('Upload fail')}`, {
                    variant: 'error',
                })
                handleNext()
            })
    }

    const maxSize = Number(process.env.REACT_APP_UPLOAD_MAX_SIZE) * 1024 * 1024

    const onFileUpload = (event) => {
        const uploadFile = event.target.files[0]
        console.log('uploadFile=', uploadFile)
        if (uploadFile.size <= maxSize) {
            setbinaryData([uploadFile])
            const reader = new FileReader()
            reader.onload = function (e) {
                const wordArray = CryptoJS.lib.WordArray.create(e.target.result)
                const hash = sha256(wordArray).toString()
                setbinaryHash(hash)
                setbinaryName(uploadFile.name)
            }
            reader.readAsArrayBuffer(uploadFile)
            !verificationProof[0] ? setActiveStep(1) : setActiveStep(2)
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

    // verify file name
    const [isVerifyFileName, setIsVerifyFileName] = useState(true)
    const handleCheckboxChange = () => {
        setIsVerifyFileName(!isVerifyFileName)
    }

    return (
        <>
            <Hidden only={['xs']}>
                <Box my={3}>
                    <VerifyStepper activeStep={activeStep} />
                    {activeStep === 0 && (
                        <UploadBinaryData
                            handleFileDataChange={handleFileDataChange}
                            handleFileHashChange={handleFileHashChange}
                            handleFileNameChange={handleFileNameChange}
                            handleNext={handleNext}
                        />
                    )}
                    {activeStep === 1 && (
                        <UploadVerificationProof
                            uploadedFiles={binaryData}
                            handleProofDataChange={handleProofDataChange}
                            handleNext={handleNext}
                        />
                    )}
                    {activeStep === 2 && (
                        <UploadedInfoSection
                            uploadedFiles={binaryData}
                            verificationProof={verificationProof}
                            isVerifyFileName={isVerifyFileName}
                            handleCheckboxChange={handleCheckboxChange}
                        />
                    )}
                    <StepperButton
                        activeStep={activeStep}
                        onBackButtonClick={onBackButtonClick}
                        handleVerify={handleVerify}
                        handleReset={handleReset}
                    />
                </Box>
            </Hidden>
            <Hidden only={['sm', 'md', 'lg', 'xl']}>
                <RwdUploadSection
                    activeStep={activeStep}
                    binaryData={binaryData}
                    verificationProof={verificationProof}
                    onFileUpload={onFileUpload}
                    onProofUpload={onProofUpload}
                    isVerifyFileName={isVerifyFileName}
                    handleCheckboxChange={handleCheckboxChange}
                    handleReset={handleReset}
                    handleVerify={handleVerify}
                />
            </Hidden>
        </>
    )
}

UploadSection.propTypes = {
    handleDetailDataChange: PropTypes.func.isRequired,
    handleBackdropOpen: PropTypes.func.isRequired,
    handleBackdropClose: PropTypes.func.isRequired,
}

export default UploadSection
