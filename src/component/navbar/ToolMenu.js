import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MenuItem, Menu, IconButton, Typography } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import ToolIcon from '../../img/tool.svg'

const ToolMenu = () => {
    const { t } = useTranslation()
    const [anchorEl, setAnchorEl] = useState(null)
    const accountOpen = Boolean(anchorEl)

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }
    return (
        <div>
            <IconButton
                aria-label="tool"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                size="large"
            >
                <img alt="ToolIcon" src={ToolIcon} height="25" />
            </IconButton>
            <Menu
                id="tool-menu"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={accountOpen}
                onClose={handleClose}
            >
                <MenuItem
                    onClick={(event) => {
                        event.preventDefault()
                        window.open('https://github.com/itrustmachines/spo-verification-program')
                        handleClose()
                    }}
                >
                    <GitHubIcon style={{ marginRight: '10px', fill: '#4b4b4b' }} />
                    <Typography variant="body1">{t('Verification Program Source Code')}</Typography>
                </MenuItem>
            </Menu>
        </div>
    )
}

export default ToolMenu
