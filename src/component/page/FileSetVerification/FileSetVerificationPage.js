import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMediaQuery, Backdrop, Box, Typography, CircularProgress } from '@mui/material'
import UploadSection from './UploadSection/UploadSection'
import VerifyDetailTable from '../ProofVerification/VerifyDetailTable'
import FilesVerifyDetailTable from './FilesVerifyDetailTable'
import theme from '../../../theme/Theme'

const FileSetVerificationPage = () => {
    const { t } = useTranslation()
    const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'))
    const [inProgress, setInProgress] = useState(false)
    const [detailData, setDetailData] = useState(null)

    const handleInProgress = () => {
        setInProgress(true)
    }

    const handleProgressDone = () => {
        setInProgress(false)
    }

    const handleDetailDataChange = (data) => {
        setDetailData(data)
    }

    return (
        <>
            <Typography variant={matches ? 'h5' : 'h4'} sx={{ color: 'common.white' }}>
                {t('File Set Verification')}
            </Typography>
            <Box mt={2}>
                <UploadSection
                    handleDetailDataChange={handleDetailDataChange}
                    handleInProgress={handleInProgress}
                    handleProgressDone={handleProgressDone}
                />
                {detailData && (
                    <Box mt={4}>
                        <VerifyDetailTable detailData={detailData} />
                        <FilesVerifyDetailTable detailData={detailData} />
                    </Box>
                )}
            </Box>
            <Backdrop open={inProgress} sx={{ zIndex: theme.zIndex.drawer + 1, color: 'common.white' }}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
}

export default FileSetVerificationPage
