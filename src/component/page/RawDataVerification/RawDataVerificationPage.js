import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMediaQuery, Typography, Backdrop, CircularProgress, Box } from '@mui/material'
import UploadSection from './UploadSection/UploadSection'
import VerifyResultTable from './VerifyResultTable'
import VerifyDetailTable from './VerifyDetailTable/VerifyDetailTable'
import theme from '../../../theme/Theme'

const RawDataVerificationPage = () => {
    const { t } = useTranslation()
    const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'))
    const [open, setopen] = useState(false)
    const [detailData, setDetailData] = useState(null)

    const handleDetailDataChange = (data) => {
        setDetailData(data)
    }

    const handleBackdropOpen = () => {
        setopen(true)
    }

    const handleBackdropClose = () => {
        setopen(false)
    }

    return (
        <div>
            <Typography variant={matches ? 'h5' : 'h4'} sx={{ color: 'common.white' }}>
                {t('Raw Data Verification')}
            </Typography>
            <Box mt={2}>
                <UploadSection
                    handleDetailDataChange={handleDetailDataChange}
                    handleBackdropOpen={handleBackdropOpen}
                    handleBackdropClose={handleBackdropClose}
                />
                {detailData && (
                    <>
                        <VerifyResultTable detailData={detailData} />
                        <VerifyDetailTable detailData={detailData} />
                    </>
                )}
            </Box>
            <Backdrop open={open} sx={{ zIndex: theme.zIndex.drawer + 1, color: 'common.white' }}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}

export default RawDataVerificationPage
