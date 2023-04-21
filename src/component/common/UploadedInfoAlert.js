import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useMediaQuery, Box, Typography } from '@mui/material'
import { Alert } from '@mui/material'

const UploadedInfoAlert = ({ uploadedFiles, rootFolderName }) => {
    const { t } = useTranslation()
    const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    const renderFileInfo = (files) => {
        const file = files[0]
        const fileName = file.path ? file.path : file.name

        return isXsScreen ? fileName : `${fileName} - ${file.size} bytes`
    }

    const renderFileList = (fileList) => {
        return `${rootFolderName} (${t('Containing')} ${fileList.length} ${t('files')})`
    }

    return (
        <Alert
            id="uploaded-info-alert"
            severity="info"
            sx={{ alignItems: 'center', mt: 1, wordBreak: { xs: 'break-all', sm: 'break-word' } }}
        >
            <Box my={isXsScreen ? 0 : 1}>
                <Typography
                    id="uploaded-proof-info"
                    data-testid="uploaded-proof-info"
                    variant={isXsScreen ? 'body2' : 'body1'}
                >
                    {rootFolderName ? renderFileList(uploadedFiles) : renderFileInfo(uploadedFiles)}
                </Typography>
            </Box>
        </Alert>
    )
}

UploadedInfoAlert.propTypes = {
    uploadedFiles: PropTypes.array.isRequired,
    rootFolderName: PropTypes.string,
}

export default UploadedInfoAlert
