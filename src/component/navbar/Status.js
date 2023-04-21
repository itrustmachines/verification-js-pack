import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import { Popover, IconButton, Avatar, Grid, Box, Typography } from '@mui/material'
import StatusIcon from '../../img/heartbeat.svg'

const Status = () => {
    const { t } = useTranslation()

    const [statusAnchorEl, setstatusAnchorEl] = useState(null)
    const statusOpen = Boolean(statusAnchorEl)

    const handleStatusMenu = (event) => {
        setstatusAnchorEl(event.currentTarget)
    }

    const handleStatusClose = () => {
        setstatusAnchorEl(null)
    }

    const status = (
        <Box m={3}>
            <Box mb={2} sx={{ minWidth: 300 }}>
                <Grid container spacing={2}>
                    <Grid item xs={5}>
                        <Box>
                            <Typography variant="body1">{t('Version')} :</Typography>
                        </Box>
                        <Box>
                            <Typography variant="body1">{t('Current Time')} :</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={7}>
                        <Box>
                            <Typography variant="body1">{process.env.REACT_APP_VERSION || 'N/A'}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="body1">{moment().format('YYYY/MM/DD HH:mm:ss')}</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
    return (
        <div>
            <IconButton color="inherit" onClick={handleStatusMenu} size="large">
                <Avatar sx={{ backgroundColor: 'common.white', height: { xs: 20, sm: 30 }, width: { xs: 20, sm: 30 } }}>
                    <img alt="statusIcon" src={StatusIcon} height="20" />
                </Avatar>
            </IconButton>
            <Popover
                open={statusOpen}
                anchorEl={statusAnchorEl}
                onClose={handleStatusClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                {status}
            </Popover>
        </div>
    )
}

export default Status
