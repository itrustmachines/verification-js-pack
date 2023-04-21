import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Typography, Box, Tooltip } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
// TODO replace img with mui icon
import RemoveIcon from '../../img/remove.svg'
import AddIcon from '../../img/plus.svg'
import Modify from '../../img/modify.svg'

const VerifyStatus = ({ status, iconOnly }) => {
    const { t } = useTranslation()

    return (
        <>
            {status === 'PASS' &&
                (iconOnly ? (
                    <Tooltip title={t('Pass')} placement="right">
                        <CheckIcon sx={{ color: 'success.main', fontSize: '1.8rem' }} />
                    </Tooltip>
                ) : (
                    <Box display="flex" alignItems="center">
                        <CheckIcon sx={{ color: 'success.main' }} />
                        <Typography variant="body2" sx={{ ml: 0.5 }}>
                            {t('Pass')}
                        </Typography>
                    </Box>
                ))}
            {status === 'CLEARANCE_RECORD_ERROR' &&
                (iconOnly ? (
                    <Tooltip title={t('Clearance record error')} placement="right">
                        <CloseIcon sx={{ color: 'error.main', fontSize: '1.8rem' }} />
                    </Tooltip>
                ) : (
                    <Box display="flex" alignItems="center">
                        <CloseIcon sx={{ color: 'error.main' }} />
                        <Typography variant="body2" sx={{}}>
                            {t('Clearance record error')}
                        </Typography>
                    </Box>
                ))}
            {/* TODO check for the status below */}
            {status === 'REMOVED' && (
                <Tooltip title={t('Removed')} placement="right">
                    <img width="30" alt="remove" src={RemoveIcon} />
                </Tooltip>
            )}
            {status === 'ADDED' && (
                <Tooltip title={t('Added')} placement="right">
                    <img width="30" alt="add" src={AddIcon} />
                </Tooltip>
            )}
            {status === 'MODIFIED' && (
                <Tooltip title={t('Modified')} placement="right">
                    <img height="30" alt="result" src={Modify} />
                </Tooltip>
            )}
        </>
    )
}

VerifyStatus.propTypes = {
    status: PropTypes.string.isRequired,
    iconOnly: PropTypes.bool.isRequired,
}

export default VerifyStatus
