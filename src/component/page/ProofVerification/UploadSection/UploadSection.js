import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'
import { useDropzone } from 'react-dropzone'
import { useSnackbar } from 'notistack'
import { Typography, Box } from '@mui/material'
import FingerPrint from '../../../../img/fingerprint.svg'
import UploadedInfoAlert from '../../../common/UploadedInfoAlert'
import { toHumanReadableFileSize } from '../../../../util/stringUtil'

const UploadSection = ({ detailData, handleVerify }) => {
    const { t } = useTranslation()
    const { enqueueSnackbar } = useSnackbar()
    const [cursor, setCursor] = useState('')
    const cursorStyle = {
        cursor: cursor,
    }

    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length === 1) {
            handleVerify(acceptedFiles)
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

    const { getRootProps, getInputProps, acceptedFiles } = useDropzone({ onDrop, onDropRejected, maxSize })

    return (
        <>
            <Box
                mt={2}
                style={cursorStyle}
                onMouseOver={() => {
                    setCursor('pointer')
                }}
                onMouseLeave={() => {
                    setCursor('')
                }}
            >
                <div {...getRootProps()}>
                    <input id="proof-uploader" data-testid="proof-uploader" {...getInputProps()} multiple={false} />
                    {
                        <Box
                            sx={{
                                height: 250,
                                backgroundColor: 'background.uploader',
                                textAlign: 'center',
                                color: 'text.secondary',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 1,
                            }}
                        >
                            <Box py={1}>
                                <img width="55" alt="fingerPrint" src={FingerPrint} />
                            </Box>
                            <Typography variant="body1" sx={{ color: 'fingerPrint.main', fontWeight: 'bold' }}>
                                {t('Choose Your Off-chain Proof to Upload')}
                            </Typography>
                        </Box>
                    }
                </div>
            </Box>
            {detailData && acceptedFiles.length === 1 && (
                <Box mt={3} mb={3}>
                    <Typography sx={{ color: 'common.white' }} component={'div'} variant="h6">
                        {t('Uploaded Off-chain Proof')}
                    </Typography>
                    <UploadedInfoAlert uploadedFiles={acceptedFiles} />
                </Box>
            )}
        </>
    )
}

UploadSection.propTypes = {
    detailData: PropTypes.object,
    handleVerify: PropTypes.func.isRequired,
}

export default UploadSection
