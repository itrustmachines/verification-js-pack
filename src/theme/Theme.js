import { createTheme, adaptV4Theme } from '@mui/material/styles'

const defaultTheme = {
    overrides: {
        MuiDrawer: {
            paperAnchorBottom: {
                height: '100%',
            },
        },
    },
    palette: {
        primary: {
            light: '#7986CB',
            main: '#3F51B5',
            dark: '#303F9F',
        },
        secondary: {
            light: '#FF4081',
            main: '#F50057',
            dark: '#C51162',
        },
        error: {
            light: '#E57373',
            main: '#F44336',
            dark: '#D32F2F',
        },
        warning: {
            light: '#FFB74D',
            main: '#FF9800',
            dark: '#F57C00',
        },
        info: {
            light: '#64B5F6',
            main: '#2196F3',
            dark: '#1976D2',
        },
        success: {
            light: '#81C784',
            main: '#4CAF50',
            dark: '#388E3C',
        },
        text: {
            primary: 'rgba(0, 0, 0, 0.87)',
            secondary: 'rgba(0, 0, 0, 0.54)',
            hint: 'rgba(0, 0, 0, 0.38)',
        },
        background: {
            main: '#3D3F4F',
            uploader: '#F0F2F8',
        },
        fingerPrint: {
            main: '#FF5757',
        },
    },
    typography: {
        fontFamily: '"Noto Sans TC", sans-serif',
    },
    mixins: {
        toolbar: {
            minHeight: 64,
            '@media (min-width:0px)': {
                minHeight: 56,
            },
            '@media (min-width:600px)': {
                minHeight: 72,
            },
        },
    },
}

const icpTheme = {
    overrides: {
        MuiDrawer: {
            paperAnchorBottom: {
                height: '100%',
            },
        },
    },
    palette: {
        primary: {
            light: '#7986CB',
            main: '#3F51B5',
            dark: '#303F9F',
        },
        secondary: {
            light: '#FF4081',
            main: '#F50057',
            dark: '#C51162',
        },
        error: {
            light: '#E57373',
            main: '#F44336',
            dark: '#D32F2F',
        },
        warning: {
            light: '#FFB74D',
            main: '#FF9800',
            dark: '#F57C00',
        },
        info: {
            light: '#64B5F6',
            main: '#2196F3',
            dark: '#1976D2',
        },
        success: {
            light: '#81C784',
            main: '#4CAF50',
            dark: '#388E3C',
        },
        text: {
            primary: 'rgba(0, 0, 0, 0.87)',
            secondary: 'rgba(0, 0, 0, 0.54)',
            hint: 'rgba(0, 0, 0, 0.38)',
        },
        background: {
            main: '#3D3F4F',
            uploader: '#F0F2F8',
        },
        fingerPrint: {
            main: '#FF5757',
        },
    },
    typography: {
        fontFamily: '"Cardo", serif',
    },
    mixins: {
        toolbar: {
            minHeight: 64,
            '@media (min-width:0px)': {
                minHeight: 56,
            },
            '@media (min-width:600px)': {
                minHeight: 72,
            },
        },
    },
}

const CLIENT_TYPE = process.env.REACT_APP_CLIENT_TYPE || 'ITM'
const isIcpStyle = CLIENT_TYPE.toLocaleLowerCase() === 'icp'

export default createTheme(adaptV4Theme(isIcpStyle ? icpTheme : defaultTheme))
