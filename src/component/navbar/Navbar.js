import React from 'react'
import { Link } from 'react-router-dom'
import { useMediaQuery, AppBar, Toolbar, Box, Avatar, Button, Typography, Hidden } from '@mui/material'
// TODO replace img with mui icon
import LanguageMenu from './LanguageMenu'
import ToolMenu from './ToolMenu'
import Status from './Status'
import MobileMenu from './MobileMenu'
import ITMIcon from '../../img/ITM.svg'
import ICPIcon from '../../img/icp_logo.svg'
import theme from '../../theme/Theme'

const CLIENT_TYPE = process.env.REACT_APP_CLIENT_TYPE || 'ITM'
const isIcpStyle = CLIENT_TYPE.toLocaleLowerCase() === 'icp'

const Navbar = () => {
    const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'))

    const renderLogo = () => {
        if (isIcpStyle) {
            return (
                <img
                    alt="icpLogo"
                    src={ICPIcon}
                    height="50"
                    style={{ backgroundColor: 'white', borderRadius: '5px' }}
                />
            )
        } else {
            return <img alt="itmLogo" src={ITMIcon} width={matches ? 65 : 60} />
        }
    }

    return (
        <>
            <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1, backgroundColor: 'background.main' }}>
                <Toolbar>
                    <Hidden mdUp>
                        <MobileMenu />
                    </Hidden>
                    <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
                        <Button sx={{ textTransform: 'none', color: 'common.white', alignItems: 'center' }}>
                            {renderLogo()}
                            <Box mx={2}>
                                <Typography variant="h5">Verification</Typography>
                            </Box>
                        </Button>
                    </Link>
                    <Box ml="auto">
                        <LanguageMenu />
                    </Box>
                    <Hidden mdDown>
                        <ToolMenu />
                    </Hidden>
                    <Status />
                    {!isIcpStyle && (
                        <Hidden mdDown>
                            <Avatar sx={{ width: 30, height: 30, backgroundColor: theme.palette.grey[500], ml: 1 }}>
                                <img src={ITMIcon} alt="ITMAvatar" width="22" />
                            </Avatar>
                            <Box ml={1}>
                                <Typography variant="caption" sx={{ color: '#858796' }}>
                                    ITM Corp.
                                </Typography>
                            </Box>
                        </Hidden>
                    )}
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar
