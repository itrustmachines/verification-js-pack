import React, { useState } from 'react'
import PropTypes from 'prop-types'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import { Typography, Box, Button } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import UploadedInfoAlert from '../../../common/UploadedInfoAlert'
import { toHumanReadableFileSize } from '../../../../util/stringUtil'

const RwdUploadSection = ({ handleVerify }) => {
    const { t } = useTranslation()
    const { enqueueSnackbar } = useSnackbar()
    const [proofFile, setProofFile] = useState([])
    const [isVerify, setIsVerify] = useState(false)
    const maxSize = Number(process.env.REACT_APP_UPLOAD_MAX_SIZE) * 1024 * 1024

    const onProofUpload = (event) => {
        const uploadProof = event.target.files[0]
        console.log('uploadProof=', uploadProof)

        if (
            uploadProof.name.slice(uploadProof.name.lastIndexOf('.')) === '.json' ||
            uploadProof.name.slice(uploadProof.name.lastIndexOf('.')) === '.itm'
        ) {
            if (uploadProof.size <= maxSize) {
                setProofFile([uploadProof])
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

    const onVerifyClick = () => {
        handleVerify(proofFile)
        setIsVerify(true)
    }

    const handleReset = () => {
        setIsVerify(false)
        setProofFile([])
    }

    return (
        <>
            <Typography sx={{ color: 'common.white' }} variant="body1">
                {t('Upload Off-chain Proof')}
            </Typography>
            <Button
                id="upload-button"
                variant="contained"
                component="label"
                color="primary"
                startIcon={<CloudUploadIcon />}
                disabled={isVerify}
                sx={{ mt: 1 }}
            >
                {t('Upload')}
                <input
                    style={{ display: 'none' }}
                    id="upload-input"
                    data-testid="upload-input"
                    type="file"
                    onChange={onProofUpload}
                />
            </Button>
            {proofFile[0] && <UploadedInfoAlert uploadedFiles={proofFile} />}
            <Box mt={2}>
                <Typography sx={{ color: 'common.white' }} variant="body1">
                    {t('Verify')}
                </Typography>
                <Box display="flex" alignItems="center">
                    <Button
                        id="verify-btn"
                        variant="contained"
                        color="primary"
                        onClick={isVerify ? handleReset : onVerifyClick}
                        disabled={!proofFile[0]}
                        sx={{ mt: 1 }}
                    >
                        {isVerify ? t('Reupload') : t('Verify')}
                    </Button>
                </Box>
            </Box>
        </>
    )
}

RwdUploadSection.propTypes = {
    handleVerify: PropTypes.func.isRequired,
}

export default RwdUploadSection
