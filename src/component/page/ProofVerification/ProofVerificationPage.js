import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import { useSnackbar } from 'notistack'
import { useMediaQuery, Typography, Backdrop, CircularProgress, Box, Hidden } from '@mui/material'
import UploadSection from './UploadSection/UploadSection'
import RwdUploadSection from './UploadSection/RwdUploadSection'
import VerifyDetailTable from './VerifyDetailTable'
import { verifyProof } from '../../../function/api/verifyProofApi'
import theme from '../../../theme/Theme'

const ProofVerificationPage = () => {
    const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'))
    const { enqueueSnackbar } = useSnackbar()
    const { t } = useTranslation()
    const [open, setopen] = useState(false)
    const [detailData, setDetailData] = useState(null)

    useEffect(() => {
        setDetailData(null)
    }, [])

    const handleVerify = async (acceptedFiles) => {
        const uploadTimestamp = Number(moment(moment.now()).format('x'))
        acceptedFiles.forEach(async (file) => {
            setopen(true)
            verifyProof(file)
                .then((result) => {
                    console.log('handleVerify() verifyProof', { result })
                    if (result.status === 'ok') {
                        result.uploadTimestamp = uploadTimestamp
                        setDetailData(result)
                        enqueueSnackbar(`${t('Upload successful')}`, {
                            variant: 'success',
                        })
                    } else if (
                        result.status !== 'ok' &&
                        result.description &&
                        result.description.toLocaleLowerCase().includes('convert', 'fail')
                    ) {
                        enqueueSnackbar(`${t('Fail to upload, proof file content is not JSON format')}`, {
                            variant: 'error',
                        })
                    } else {
                        enqueueSnackbar(`${t('Upload fail')}`, {
                            variant: 'error',
                        })
                    }
                    setopen(false)
                })
                .catch((error) => {
                    console.log('verifyProof error=', error)
                    setopen(false)
                    enqueueSnackbar(`${t('Upload fail')}`, {
                        variant: 'error',
                    })
                })
        })
    }

    return (
        <>
            <Typography variant={matches ? 'h5' : 'h4'} sx={{ color: 'common.white' }}>
                {t('Proof Verification')}
            </Typography>
            <Box sx={{ my: { xs: 3, sm: 0 } }}>
                <Hidden only={['xs']}>
                    <UploadSection detailData={detailData} handleVerify={handleVerify} />
                </Hidden>
                <Hidden only={['sm', 'md', 'lg', 'xl']}>
                    <RwdUploadSection handleVerify={handleVerify} />
                </Hidden>
            </Box>
            {detailData && <VerifyDetailTable detailData={detailData} />}
            <Backdrop open={open} sx={{ zIndex: theme.zIndex.drawer + 1, color: 'common.white' }}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
}

export default ProofVerificationPage
