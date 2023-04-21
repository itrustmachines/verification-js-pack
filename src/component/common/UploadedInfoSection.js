import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { Typography, Box } from '@mui/material'
import UploadedInfoAlert from './UploadedInfoAlert'
import VerifyFileNameCheckbox from '../page/RawDataVerification/UploadSection/VerifyFileNameCheckbox'
import { VerificationType } from '../../constants/VerificationType'

const UploadedInfoSection = ({
    uploadedFiles,
    verificationProof,
    isVerifyFileName,
    handleCheckboxChange,
    rootFolderName,
}) => {
    const { t } = useTranslation()
    const location = useLocation()
    const pathname = location.pathname.substring(1)

    return (
        <>
            <Box my={2}>
                <Typography sx={{ color: 'common.white' }} component={'div'} variant="h6">
                    {pathname === VerificationType.rawDataVerification && t('Uploaded File to Verify')}
                    {pathname === VerificationType.fileSetVerification && t('Folder to Verify')}
                </Typography>
                <UploadedInfoAlert uploadedFiles={uploadedFiles} rootFolderName={rootFolderName} />
            </Box>
            <Typography sx={{ color: 'common.white' }} component={'div'} variant="h6">
                {t('Uploaded Off-chain Proof')}
            </Typography>
            <UploadedInfoAlert uploadedFiles={verificationProof} />
            {pathname === VerificationType.rawDataVerification && (
                <VerifyFileNameCheckbox
                    isVerifyFileName={isVerifyFileName}
                    handleCheckboxChange={handleCheckboxChange}
                />
            )}
        </>
    )
}

UploadedInfoSection.propTypes = {
    uploadedFiles: PropTypes.array.isRequired,
    verificationProof: PropTypes.array.isRequired,
    isVerifyFileName: PropTypes.bool,
    handleCheckboxChange: PropTypes.func,
    rootFolderName: PropTypes.string,
}

export default UploadedInfoSection
