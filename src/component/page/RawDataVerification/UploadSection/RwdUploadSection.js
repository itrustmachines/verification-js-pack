import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Typography, Box, Button } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import UploadedInfoAlert from '../../../common/UploadedInfoAlert'
import VerifyFileNameCheckbox from './VerifyFileNameCheckbox'

const RwdUploadSection = ({
    activeStep,
    binaryData,
    verificationProof,
    onFileUpload,
    onProofUpload,
    isVerifyFileName,
    handleCheckboxChange,
    handleReset,
    handleVerify,
}) => {
    const { t } = useTranslation()

    return (
        <Box my={3}>
            <Typography sx={{ color: 'common.white' }} variant="body1">
                {t('Upload File to Verify')}
            </Typography>
            <Button
                variant="contained"
                component="label"
                color="primary"
                startIcon={<CloudUploadIcon />}
                disabled={activeStep === 3}
                sx={{ mt: 1 }}
            >
                {t('Upload File')}
                <input style={{ display: 'none' }} id="upload-files-button" type="file" onChange={onFileUpload} />
            </Button>
            {binaryData[0] && (
                <Box mt={1}>
                    <UploadedInfoAlert uploadedFiles={binaryData} />
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
                    <input style={{ display: 'none' }} id="upload-proof-button" type="file" onChange={onProofUpload} />
                </Button>
                {verificationProof[0] && (
                    <Box mt={1}>
                        <UploadedInfoAlert uploadedFiles={verificationProof} />
                    </Box>
                )}
            </Box>
            {activeStep === 2 && (
                <VerifyFileNameCheckbox
                    isVerifyFileName={isVerifyFileName}
                    handleCheckboxChange={handleCheckboxChange}
                />
            )}
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
                        disabled={!(binaryData[0] && verificationProof[0])}
                        sx={{ mt: 1 }}
                    >
                        {activeStep === 3 ? t('Reupload') : t('Verify')}
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

RwdUploadSection.propTypes = {
    activeStep: PropTypes.number.isRequired,
    binaryData: PropTypes.array.isRequired,
    verificationProof: PropTypes.array.isRequired,
    onFileUpload: PropTypes.func.isRequired,
    onProofUpload: PropTypes.func.isRequired,
    isVerifyFileName: PropTypes.bool.isRequired,
    handleCheckboxChange: PropTypes.func.isRequired,
    handleReset: PropTypes.func.isRequired,
    handleVerify: PropTypes.func.isRequired,
}

export default RwdUploadSection
