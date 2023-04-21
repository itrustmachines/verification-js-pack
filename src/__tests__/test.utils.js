// Custom Render Config
import React from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider, StyledEngineProvider } from '@mui/material'
import { SnackbarProvider } from 'notistack'
import { BrowserRouter as Router } from 'react-router-dom'
import theme from '../theme/Theme'
import './__mock__/matchMedia.mock'

const defaultProviders = ({ children }) => {
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <SnackbarProvider>
                    <Router>{children}</Router>
                </SnackbarProvider>
            </ThemeProvider>
        </StyledEngineProvider>
    )
}

const customRender = (ui, options) => render(ui, { wrapper: defaultProviders, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
