import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Cookies from 'universal-cookie'
import { Button, Hidden, Menu, MenuItem, Box } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import TranslateIcon from '../../img/translate.svg'

const LanguageMenu = () => {
    const [language, setlanguage] = useState(null)
    const [selectedIndex, setselectedIndex] = useState(0)
    const languageOpen = Boolean(language)
    const cookies = new Cookies()
    const defaultCookieLanguage = cookies.get('language')
    const [currentLanguage, setcurrentLanguage] = useState(defaultCookieLanguage ? defaultCookieLanguage : 'English')
    const { i18n } = useTranslation()

    const handleLanguageMenu = (event) => {
        setlanguage(event.currentTarget)
    }

    const handleLanguageClose = () => {
        setlanguage(null)
    }

    const handleLanguage = (event, index) => {
        const language = event.currentTarget.getAttribute('data-id')
        if (language === '中文') {
            i18n.changeLanguage('zh-TW')
            cookies.set('language', '中文', { path: '/' })
            setcurrentLanguage('中文')
        } else {
            i18n.changeLanguage('en')
            cookies.set('language', 'English', { path: '/' })
            setcurrentLanguage('English')
        }
        setlanguage(null)
        setselectedIndex(index)
    }

    const languageOptions = ['中文', 'English']
    return (
        <div>
            <Button sx={{ p: 0.5, minWidth: 20 }} onClick={handleLanguageMenu} color="inherit">
                <img src={TranslateIcon} alt="TranslateIcon" height="20" width="20" />
                <Hidden smDown>
                    <Box ml={1}>{currentLanguage || '中文'}</Box>
                    <ExpandMoreIcon />
                </Hidden>
            </Button>
            <Menu
                id="language"
                anchorEl={language}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={languageOpen}
                onClose={handleLanguageClose}
            >
                {languageOptions.map((option, index) => (
                    <MenuItem
                        key={option}
                        data-id={option}
                        selected={index === selectedIndex}
                        onClick={(event) => handleLanguage(event, index)}
                    >
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    )
}

export default LanguageMenu
