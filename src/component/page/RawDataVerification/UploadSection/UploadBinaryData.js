import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useDropzone } from 'react-dropzone'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import sha256 from 'crypto-js/sha256'
import CryptoJS from 'crypto-js'
import { Box, Typography } from '@mui/material'
import Alert from '@mui/material/Alert'
import FileUpload from '../../../../img/fileUpload.svg'
import theme from '../../../../theme/Theme'
import { toHumanReadableFileSize } from '../../../../util/stringUtil'

const UploadBinaryData = ({ handleFileDataChange, handleFileHashChange, handleFileNameChange, handleNext }) => {
    const { t } = useTranslation()
    const { enqueueSnackbar } = useSnackbar()
    const [cursor, setCursor] = useState('')
    const cursorStyle = {
        cursor: cursor,
    }

    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length === 1) {
            handleFileDataChange(acceptedFiles)
            const file = acceptedFiles[0]
            const reader = new FileReader()
            reader.onload = function (e) {
                const wordArray = CryptoJS.lib.WordArray.create(e.target.result)
                const hash = sha256(wordArray).toString()
                handleFileHashChange(hash)
            }
            handleFileNameChange(file.name)
            reader.readAsArrayBuffer(file)
            handleNext()
        } else if (acceptedFiles.length > 1) {
            enqueueSnackbar(`${t('You can only upload one file')}`, {
                variant: 'warning',
            })
        }
    }, [])

    const maxSize = Number(process.env.REACT_APP_UPLOAD_MAX_SIZE) * 1024 * 1024

    const onDropRejected = () => {
        enqueueSnackbar(
            `${i18next.t('Maximum file upload size is {{maxSize}}', {
                maxSize: toHumanReadableFileSize(maxSize),
            })}`,
            {
                variant: 'warning',
            },
        )
    }

    const { getRootProps, getInputProps, acceptedFiles } = useDropzone({ onDrop, onDropRejected, maxSize })

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
                <div {...getRootProps()}>
                    <input
                        id="binary-data-uploader"
                        data-testid="binary-data-uploader"
                        {...getInputProps()}
                        multiple={false}
                    />
                    <Box
                        sx={{
                            height: '220px',
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
                            <img width="45" alt="fileUpload" src={FileUpload} />
                        </Box>
                        <Typography variant="body1" sx={{ color: 'background.main', fontWeight: 'bold' }}>
                            {t('Choose a File to Verify')}
                        </Typography>
                    </Box>
                </div>
            </Box>
            <Box mt={2}>
                <Alert severity="warning">{t('upload.binary.data.alert_upload_hash_info')}</Alert>
            </Box>
            {acceptedFiles.length === 1 && (
                <Box mt={2} mb={3}>
                    <Typography sx={{ color: 'common.white' }} component={'div'} variant="h6">
                        {t('Upload File to Verify')}
                    </Typography>
                    <Typography
                        id="uploaded-file-info"
                        sx={{ color: 'common.white' }}
                        component={'div'}
                        variant="body1"
                    >
                        {acceptedFiles.map((file, index) => {
                            return (
                                <p key={index}>
                                    {file.path} - {file.size} bytes
                                </p>
                            )
                        })}
                    </Typography>
                </Box>
            )}
        </>
    )
}

UploadBinaryData.propTypes = {
    handleFileDataChange: PropTypes.func.isRequired,
    handleFileHashChange: PropTypes.func.isRequired,
    handleFileNameChange: PropTypes.func.isRequired,
    handleNext: PropTypes.func.isRequired,
}

export default UploadBinaryData
