import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useMediaQuery, Grid, Typography, Card, Box, Divider, IconButton } from '@mui/material'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow'
import ProofIcon from '../../img/gavel.svg'
import RawDataIcon from '../../img/file.svg'
import FolderIcon from '../../img/folder.svg'
import theme from '../../theme/Theme'

const linkStyle = {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
}

const HomePage = () => {
    const { t } = useTranslation()
    const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    return (
        <>
            <Typography variant={matches ? 'h5' : 'h4'} sx={{ color: 'common.white' }}>
                {t('Home')}
            </Typography>
            <Box mt={2}>
                <Grid container spacing={2}>
                    <Grid item xs={12} lg={6}>
                        <Card>
                            <Box m={4} display="flex" alignItems="center">
                                <Box display="flex" alignItems="center">
                                    <Box mr={1} display="inline">
                                        <img alt="ProofIcon" src={ProofIcon} height="25" width="25" />
                                    </Box>
                                    <Typography variant="h6" display="inline">
                                        {t('Proof Verification')}
                                    </Typography>
                                </Box>
                            </Box>
                            <Divider variant="middle" />
                            <Box m={2}>
                                <Link to="/proofVerification" style={linkStyle}>
                                    <IconButton size="large">
                                        <DoubleArrowIcon fontSize="small" sx={{ color: 'background.main' }} />
                                    </IconButton>
                                    <Typography variant="body1" display="inline">
                                        {t('Proof Verification')}
                                    </Typography>
                                </Link>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Card>
                            <Box m={4}>
                                <Box display="flex" alignItems="center">
                                    <Box mr={1} display="inline">
                                        <img alt="RawDataIcon" src={RawDataIcon} height="25" width="25" />
                                    </Box>
                                    <Typography variant="h6" display="inline">
                                        {t('Raw Data Verification')}
                                    </Typography>
                                </Box>
                            </Box>
                            <Divider variant="middle" />
                            <Box m={2}>
                                <Link to="/rawDataVerification" style={linkStyle}>
                                    <IconButton size="large">
                                        <DoubleArrowIcon fontSize="small" sx={{ color: 'background.main' }} />
                                    </IconButton>
                                    <Typography variant="body1" display="inline">
                                        {t('Raw Data Verification')}
                                    </Typography>
                                </Link>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Card>
                            <Box m={4} display="flex" alignItems="center">
                                <Box display="flex" alignItems="center">
                                    <Box mr={1} display="inline">
                                        <img alt="FolderIcon" src={FolderIcon} height="25" width="25" />
                                    </Box>
                                    <Typography variant="h6" display="inline">
                                        {t('File Set Verification')}
                                    </Typography>
                                </Box>
                            </Box>
                            <Divider variant="middle" />
                            <Box m={2}>
                                <Link to="/fileSetVerification" style={linkStyle}>
                                    <IconButton size="large">
                                        <DoubleArrowIcon fontSize="small" sx={{ color: 'background.main' }} />
                                    </IconButton>
                                    <Typography variant="body1" display="inline">
                                        {t('File Set Verification')}
                                    </Typography>
                                </Link>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default HomePage
