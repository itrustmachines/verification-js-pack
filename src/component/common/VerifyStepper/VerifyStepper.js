import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { Stepper, Step, StepLabel } from '@mui/material'
import { VerificationType } from '../../../constants/VerificationType'
import theme from '../../../theme/Theme'

const VerifyStepper = ({ activeStep }) => {
    const { t } = useTranslation()
    const location = useLocation()
    const pathname = location.pathname.substring(1)

    const rawDataSteps = ['Upload File to Verify', 'Upload Off-chain Proof', 'Verify']
    const fileSetSteps = ['Upload Folder to Verify', 'Upload Off-chain Proof', 'Verify']

    const rawDataType = { id: 'raw-data', steps: rawDataSteps }
    const fileSetType = { id: 'file-set', steps: fileSetSteps }

    const [stepper, setStepper] = useState(rawDataType)

    useEffect(() => {
        if (pathname === VerificationType.rawDataVerification) {
            setStepper(rawDataType)
        } else if (pathname === VerificationType.fileSetVerification) {
            setStepper(fileSetType)
        }
    }, [pathname])

    return (
        <Stepper
            id={`${stepper.id}-verification-stepper`}
            data-testid="stepper"
            activeStep={activeStep}
            sx={{
                borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`,
                p: 3,
                backgroundColor: 'common.white',
            }}
        >
            {stepper.steps.map((label, index) => {
                const stepProps = {}
                const labelProps = {}
                return (
                    <Step id={`${stepper.id}-verification-step-${index}`} key={label} data-testid="step" {...stepProps}>
                        <StepLabel {...labelProps}>{t(label)}</StepLabel>
                    </Step>
                )
            })}
        </Stepper>
    )
}

VerifyStepper.propTypes = {
    activeStep: PropTypes.number.isRequired,
}

export default VerifyStepper
