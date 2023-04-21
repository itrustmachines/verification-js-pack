import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import Cookies from 'universal-cookie'
import { useTranslation } from 'react-i18next'
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles'
import { useMediaQuery, Toolbar, Box } from '@mui/material'
import Navbar from './navbar/Navbar'
import Sidebar from './Sidebar'
import HomePage from './page/HomePage'
import ProofVerificationPage from './page/ProofVerification/ProofVerificationPage'
import RawDataVerificationPage from './page/RawDataVerification/RawDataVerificationPage'
import FileSetVerificationPage from './page/FileSetVerification/FileSetVerificationPage'
import theme from '../theme/Theme'

const App = () => {
    const { i18n } = useTranslation()
    const cookies = new Cookies()
    const isBiggerView = useMediaQuery(theme.breakpoints.up('sm'))

    useEffect(() => {
        if (cookies.get('language') === '中文') {
            i18n.changeLanguage('zh-TW')
        } else {
            cookies.set('language', 'English', { path: '/' })
            i18n.changeLanguage('en')
        }
    }, [])

    const productionPath = process.env.REACT_APP_BASE_WEB_PATH

    return (
        <Box sx={{ display: { sm: 'flex' } }}>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <SnackbarProvider
                        maxSnack={3}
                        anchorOrigin={{
                            vertical: isBiggerView ? 'top' : 'bottom',
                            horizontal: 'center',
                        }}
                    >
                        <Router basename={productionPath}>
                            <Navbar />
                            <Sidebar />
                            <Box sx={{ flexGrow: 1, p: { xs: 3, md: 4 }, pt: 3 }}>
                                <Toolbar />
                                <Switch>
                                    <Route path="/proofVerification">
                                        <ProofVerificationPage />
                                    </Route>
                                    <Route path="/rawDataVerification">
                                        <RawDataVerificationPage />
                                    </Route>
                                    <Route path="/fileSetVerification">
                                        <FileSetVerificationPage />
                                    </Route>
                                    <Route path="/">
                                        <HomePage />
                                    </Route>
                                </Switch>
                            </Box>
                        </Router>
                    </SnackbarProvider>
                </ThemeProvider>
            </StyledEngineProvider>
        </Box>
    )
}

export default App
