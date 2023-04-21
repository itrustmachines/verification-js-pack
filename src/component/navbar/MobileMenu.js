import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import {
    IconButton,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    SwipeableDrawer,
    Divider,
    Toolbar,
} from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import MenuIcon from '@mui/icons-material/Menu'
import { links } from '../Sidebar'

const MobileMenu = () => {
    const { t } = useTranslation()
    const [open, setOpen] = useState(false)

    const handleDrawerOpen = () => {
        setOpen((prev) => !prev)
    }

    const handleDrawerClose = () => {
        setOpen(false)
    }
    return (
        <div>
            <IconButton color="inherit" onClick={handleDrawerOpen} size="large">
                <MenuIcon />
            </IconButton>
            <SwipeableDrawer open={open} onClose={handleDrawerClose} onOpen={handleDrawerOpen}>
                <Toolbar />
                <Divider />
                <List>
                    {links.map((link) => (
                        <Link key={link.id} to={link.to} style={{ textDecoration: 'none', color: 'black' }}>
                            <ListItem button>
                                <ListItemIcon>
                                    <img alt={link.text} src={link.icon} height="20" width="20" />
                                </ListItemIcon>
                                <ListItemText>{t(link.text)}</ListItemText>
                            </ListItem>
                        </Link>
                    ))}
                    <ListItem
                        button
                        onClick={() => {
                            window.open('https://github.com/itrustmachines/spo-verification-program', '_blank')
                        }}
                    >
                        <ListItemIcon>
                            <GitHubIcon style={{ fill: '#4b4b4b' }} alt="gitHubIcon" height="20" width="20" />
                        </ListItemIcon>
                        <ListItemText>{t('Verification Program Source Code')}</ListItemText>
                    </ListItem>
                </List>
            </SwipeableDrawer>
        </div>
    )
}

export default MobileMenu
