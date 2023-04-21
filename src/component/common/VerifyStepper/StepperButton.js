import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Box, Button } from '@mui/material'

const StepperButton = ({ activeStep, onBackButtonClick, handleVerify, handleReset }) => {
    const { t } = useTranslation()

    return (
        <Box mt={2}>
            {(activeStep === 1 || activeStep === 2) && (
                <Button id="back-button" variant="contained" onClick={onBackButtonClick} sx={{ mr: 1 }}>
                    {t('Back')}
                </Button>
            )}
            {activeStep === 2 && (
                <Button id="verify-btn" variant="contained" color="primary" onClick={handleVerify}>
                    {t('Verify')}
                </Button>
            )}
            {activeStep === 3 && (
                <Button id="reupload-btn" variant="contained" color="primary" onClick={handleReset}>
                    {t('Reupload')}
                </Button>
            )}
        </Box>
    )
}

StepperButton.propTypes = {
    activeStep: PropTypes.number.isRequired,
    onBackButtonClick: PropTypes.func.isRequired,
    handleVerify: PropTypes.func.isRequired,
    handleReset: PropTypes.func.isRequired,
}

export default StepperButton
