import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useDropzone } from 'react-dropzone'
import { useSnackbar } from 'notistack'
import { Box, Typography } from '@mui/material'
import Alert from '@mui/material/Alert'
import FileUpload from '../../../../img/fileUpload.svg'
import { getAndSha256FileList } from '../../../../util/cryptoUtil'
import theme from '../../../../theme/Theme'

const UploadFolder = ({ setFileList, setRootFolderName, handleNext, handleUploadStart }) => {
    const { t } = useTranslation()
    const { enqueueSnackbar } = useSnackbar()
    const [cursor, setCursor] = useState('')
    const cursorStyle = {
        cursor: cursor,
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

    const checkFileInRootFolder = (file) => {
        var folderPath = file.path.slice(0, file.path.indexOf(file.name))
        var count = (folderPath.match(/\//g) || []).length
        if (count > 1) {
            return false
        }
        return true
    }

    const getRootFolderName = (path) => {
        return path.slice(0, path.indexOf('/'))
    }

    const onDrop = useCallback((acceptedFiles) => {
        console.log('start uploading files, acceptedFiles=', acceptedFiles)
        if (acceptedFiles.length > 0) {
            handleUploadStart()

            // set root folder name
            var folderName = getRootFolderName(acceptedFiles[0].path)
            setRootFolderName(folderName)
            // Only get files in root folder, and ignore hidden file name
            var toReadFiles = []
            for (let i = 0; i < acceptedFiles.length; i++) {
                var file = acceptedFiles[i]
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
                handleNext()
            })
        }
    }, [])

    const onDropRejected = () => {
        enqueueSnackbar(`${t('Maximum file upload size is 5GB')}`, {
            variant: 'warning',
        })
    }
    const maxSize = Number(process.env.REACT_APP_UPLOAD_MAX_SIZE) * 1024 * 1024

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
                <div {...getRootProps()}>
                    <input
                        id="folder-uploader"
                        data-testid="folder-uploader"
                        {...getInputProps()}
                        webkitdirectory=""
                        type="file"
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
                            <img width="45" alt="fileUpload" src={FileUpload} />
                        </Box>
                        <Typography variant="body1" sx={{ color: 'background.main', fontWeight: 'bold' }}>
                            {t('Choose a Folder to Verify')}
                        </Typography>
                    </Box>
                </div>
            </Box>
            <Box mt={2}>
                <Alert severity="warning">
                    {t('upload.binary.data.alert_upload_hash_info')}
                    {t('upload.folder.alert')}
                </Alert>
            </Box>
        </>
    )
}

UploadFolder.propTypes = {
    setFileList: PropTypes.func.isRequired,
    setRootFolderName: PropTypes.func.isRequired,
    handleUploadStart: PropTypes.func.isRequired,
    handleNext: PropTypes.func.isRequired,
}

export default UploadFolder
