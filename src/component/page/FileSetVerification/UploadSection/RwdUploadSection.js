import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Box, Button, Typography } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import UploadedInfoAlert from '../../../common/UploadedInfoAlert'

const RwdUploadSection = ({
    activeStep,
    fileList,
    rootFolderName,
    verificationProof,
    onFolderUpload,
    onProofUpload,
    handleReset,
    handleVerify,
}) => {
    const { t } = useTranslation()

    return (
        <>
            <Typography sx={{ color: 'common.white' }} variant="body1">
                {t('Upload Folder to Verify')}
            </Typography>
            <Button
                variant="contained"
                component="label"
                color="primary"
                startIcon={<CloudUploadIcon />}
                disabled={activeStep === 3}
                sx={{ mt: 1 }}
            >
                {t('Upload Folder')}
                <input
                    style={{ display: 'none' }}
                    id="upload-folder-button"
                    data-testid="upload-folder-input"
                    webkitdirectory=""
                    type="file"
                    onChange={onFolderUpload}
                />
            </Button>
            {fileList[0] && (
                <Box mt={1}>
                    <UploadedInfoAlert uploadedFiles={fileList} rootFolderName={rootFolderName} />
                </Box>
            )}
            <Box mt={2}>
                <Typography sx={{ color: 'common.white' }} variant="body1">
                    {t('Upload Off-chain Proof')}
                </Typography>
                <Button
                    variant="contained"
                    component="label"
                    color="primary"
                    startIcon={<CloudUploadIcon />}
                    disabled={activeStep === 3 || activeStep === 0}
                    sx={{ mt: 1 }}
                >
                    {t('Upload')}
                    <input
                        style={{ display: 'none' }}
                        id="upload-proof-button"
                        data-testid="upload-proof-input"
                        type="file"
                        onChange={onProofUpload}
                    />
                </Button>
                {verificationProof[0] && (
                    <Box mt={1}>
                        <UploadedInfoAlert uploadedFiles={verificationProof} />
                    </Box>
                )}
            </Box>
            <Box mt={2}>
                <Typography sx={{ color: 'common.white' }} variant="body1">
                    {t('Verify')}
                </Typography>
                <Box display="flex" alignItems="center">
                    <Button
                        id="verify-btn"
                        variant="contained"
                        color="primary"
                        onClick={activeStep === 3 ? handleReset : handleVerify}
                        // FIXME should not be disable on success stage
                        disabled={!(fileList[0] && verificationProof[0])}
                        sx={{ mt: 1 }}
                    >
                        {activeStep === 3 ? t('Reupload') : t('Verify')}
                    </Button>
                </Box>
            </Box>
        </>
    )
}

RwdUploadSection.propTypes = {
    activeStep: PropTypes.number.isRequired,
    fileList: PropTypes.array.isRequired,
    rootFolderName: PropTypes.string.isRequired,
    verificationProof: PropTypes.array.isRequired,
    onFolderUpload: PropTypes.func.isRequired,
    onProofUpload: PropTypes.func.isRequired,
    handleReset: PropTypes.func.isRequired,
    handleVerify: PropTypes.func.isRequired,
}

export default RwdUploadSection
