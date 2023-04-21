import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { FormControlLabel, Checkbox, Typography, Box } from '@mui/material'
import { styled } from '@mui/material/styles'

const WhiteCheckbox = styled(Checkbox)(({ theme }) => ({
    color: theme.palette.common.white,
    '&.Mui-checked': {
        color: theme.palette.common.white,
    },
}))

const VerifyFileNameCheckbox = ({ isVerifyFileName, handleCheckboxChange }) => {
    const { t } = useTranslation()

    return (
        <Box mt={1}>
            <FormControlLabel
                control={
                    <WhiteCheckbox checked={isVerifyFileName} onChange={handleCheckboxChange} name="whiteCheckbox" />
                }
                label={<Typography sx={{ color: 'common.white' }}>{t('Verify file name')}</Typography>}
            />
        </Box>
    )
}

VerifyFileNameCheckbox.propTypes = {
    isVerifyFileName: PropTypes.bool.isRequired,
    handleCheckboxChange: PropTypes.func.isRequired,
}

export default VerifyFileNameCheckbox
