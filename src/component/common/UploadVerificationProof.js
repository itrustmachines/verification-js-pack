import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'
import { useDropzone } from 'react-dropzone'
import { useSnackbar } from 'notistack'
import { Box, Typography } from '@mui/material'
import FingerPrint from '../../img/fingerprint.svg'
import UploadedInfoAlert from './UploadedInfoAlert'
import { VerificationType } from '../../constants/VerificationType'
import { useLocation } from 'react-router-dom'
import theme from '../../theme/Theme'
import { toHumanReadableFileSize } from '../../util/stringUtil'

const UploadVerificationProof = ({ uploadedFiles, handleProofDataChange, handleNext, rootFolderName }) => {
    const { t } = useTranslation()
    const { enqueueSnackbar } = useSnackbar()
    const location = useLocation()
    const pathname = location.pathname.substring(1)
    const [cursor, setCursor] = useState('')
    const cursorStyle = {
        cursor: cursor,
    }

    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length === 1) {
            if (
                acceptedFiles[0].name.slice(acceptedFiles[0].name.lastIndexOf('.')) === '.json' ||
                acceptedFiles[0].name.slice(acceptedFiles[0].name.lastIndexOf('.')) === '.itm'
            ) {
                handleProofDataChange(acceptedFiles)
                handleNext()
            } else {
                enqueueSnackbar(`${t('Upload off-chain proof file name extension need to be .json or .itm')}`, {
                    variant: 'warning',
                })
            }
        } else if (acceptedFiles.length > 1) {
            enqueueSnackbar(`${t('You can only upload one file')}`, {
                variant: 'warning',
            })
        }
    }, [])

    const maxSize = Number(process.env.REACT_APP_UPLOAD_MAX_SIZE) * 1024 * 1024

    const onDropRejected = () => {
        enqueueSnackbar(
            `${i18next.t('Maximum file upload size is {{maxSize}}', { maxSize: toHumanReadableFileSize(maxSize) })}`,
            {
                variant: 'warning',
            },
        )
    }

    const { getRootProps, getInputProps } = useDropzone({ onDrop, onDropRejected, maxSize })

    return (
        <>
            <Box
                style={cursorStyle}
                onMouseOver={() => {
                    setCursor('pointer')
                }}
                onMouseLeave={() => {
                    setCursor('')
                }}
            >
                <div {...getRootProps({ className: 'dropzone' })}>
                    <input
                        id="verification-proof-uploader"
                        data-testid="proof-uploader"
                        {...getInputProps()}
                        multiple={false}
                    />
                    <Box
                        sx={{
                            height: 220,
                            backgroundColor: 'background.uploader',
                            textAlign: 'center',
                            color: 'text.secondary',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: `0 0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px`,
                        }}
                    >
                        <Box py={1.5}>
                            <img width="55" alt="fingerPrint" src={FingerPrint} />
                        </Box>
                        <Typography variant="body1" sx={{ color: 'fingerPrint.main', fontWeight: 'bold' }}>
                            {t('Choose Your Off-chain Proof to Upload')}
                        </Typography>
                    </Box>
                </div>
            </Box>
            <Box my={2}>
                {pathname === VerificationType.rawDataVerification && (
                    <>
                        <Typography sx={{ color: 'common.white' }} component={'div'} variant="h6">
                            {t('Uploaded File to Verify')}
                        </Typography>
                        <UploadedInfoAlert uploadedFiles={uploadedFiles} />
                    </>
                )}
                {pathname === VerificationType.fileSetVerification && (
                    <>
                        <Typography sx={{ color: 'common.white' }} component={'div'} variant="h6">
                            {t('Folder to Verify')}
                        </Typography>
                        <UploadedInfoAlert uploadedFiles={uploadedFiles} rootFolderName={rootFolderName} />
                    </>
                )}
            </Box>
        </>
    )
}

UploadVerificationProof.propTypes = {
    uploadedFiles: PropTypes.array.isRequired,
    handleProofDataChange: PropTypes.func.isRequired,
    handleNext: PropTypes.func.isRequired,
    rootFolderName: PropTypes.string,
}

export default UploadVerificationProof
