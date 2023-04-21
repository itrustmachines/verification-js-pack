import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Toolbar, Drawer, List, ListItem, ListItemText, ListItemIcon, Hidden, Box } from '@mui/material'
import { styled } from '@mui/material/styles'
// TODO replce image with mui icon
import HomeIcon from '../img/home.svg'
import ProofIcon from '../img/gavel.svg'
import RawDataIcon from '../img/file.svg'
// import KeyIcon from '../img/key.svg'
import FolderIcon from '../img/folder.svg'

const drawerWidth = 240
const CustomDrawer = styled(Drawer)(() => ({
    width: drawerWidth,
    flexShrink: 0,
    '.MuiDrawer-paper': { width: drawerWidth },
}))

export const links = [
    { id: 0, icon: HomeIcon, text: 'Home', to: '/' },
    { id: 1, icon: ProofIcon, text: 'Proof Verification', to: '/proofVerification' },
    { id: 2, icon: RawDataIcon, text: 'Raw Data Verification', to: '/rawDataVerification' },
    { id: 3, icon: FolderIcon, text: 'File Set Verification', to: '/fileSetVerification' },
    // { id: 4, icon: KeyIcon, text: 'Recovery Key and Address', to: '/recoveryKeyAddress' },
]

const Sidebar = () => {
    const { t } = useTranslation()
    return (
        <Hidden mdDown>
            <CustomDrawer id="sidebar" variant="permanent">
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {links.map((link) => (
                            <Link key={link.id} to={link.to} style={{ textDecoration: 'none', color: 'black' }}>
                                <ListItem id={`sidebar-item-${link.id}`} button>
                                    <ListItemIcon>
                                        <img alt={link.text} src={link.icon} height="20" width="20" />
                                    </ListItemIcon>
                                    <ListItemText>{t(link.text)}</ListItemText>
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                </Box>
            </CustomDrawer>
        </Hidden>
    )
}

export default Sidebar
