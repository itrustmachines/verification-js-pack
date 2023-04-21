import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import {
    Typography,
    Box,
    Paper,
    Table,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    Hidden,
    IconButton,
    Collapse,
} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { renderTime } from '../../../util/stringUtil'

const VerifyResultTable = ({ detailData }) => {
    const { t } = useTranslation()
    const [resultExpand, setResultExpand] = useState(true)

    const renderResult = (result) => {
        if (result === 'PASS') {
            return (
                <Box display="flex" alignItems="center">
                    <CheckIcon sx={{ color: 'success.main', fontSize: '1.8rem' }} />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                        {t('Success')}
                    </Typography>
                </Box>
            )
        } else if (result === 'PROOF_ERROR') {
            return (
                <Box display="flex" alignItems="center">
                    <PriorityHighIcon sx={{ color: 'warning.main' }} />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                        {t('Proof Error')}
                    </Typography>
                </Box>
            )
        } else if (result === 'FAIL') {
            return (
                <Box display="flex" alignItems="center">
                    <CloseIcon sx={{ color: 'error.main', fontSize: '1.8rem' }} />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                        {t('Fail')}
                    </Typography>
                </Box>
            )
        } else {
            return false
        }
    }

    const checkIsVerifyFileName = () => {
        var result = true
        if (detailData.isVerifyFileName !== null && detailData.isVerifyFileName !== undefined) {
            result = detailData.isVerifyFileName
        }
        return result
    }

    return (
        <>
            <Box my={2} display="flex" alignItems="center" justifyContent="space-between">
                <Box display="flex" alignItems="center">
                    <Typography variant="h6" color="textPrimary" sx={{ color: 'common.white' }}>
                        {t('Verify Result')}
                    </Typography>
                    <IconButton
                        size="small"
                        sx={{ color: 'common.white' }}
                        aria-label="expand-list"
                        onClick={() => setResultExpand((prev) => !prev)}
                    >
                        {resultExpand ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                </Box>
            </Box>
            <Collapse data-testid="list-collapse" in={resultExpand} timeout="auto" unmountOnExit>
                <TableContainer component={Paper} sx={{ width: { xs: '100%', sm: 400 } }}>
                    <Table id="verify-result-table" stickyHeader aria-label="sticky table">
                        <TableBody>
                            <Hidden only={['xs']}>
                                {checkIsVerifyFileName() && (
                                    <TableRow id="file-name-row">
                                        <TableCell align="left">{t('File Name')}</TableCell>
                                        <TableCell align="left">
                                            {renderResult(detailData.fileNameVerifyResult)}
                                        </TableCell>
                                    </TableRow>
                                )}
                                <TableRow id="content-row">
                                    <TableCell align="left">{t('Content')}</TableCell>
                                    <TableCell align="left">
                                        {renderResult(detailData.fileContentVerifyResult)}
                                    </TableCell>
                                </TableRow>
                                <TableRow id="verify-time-row">
                                    <TableCell align="left" sx={{ minWidth: 150 }}>
                                        {t('Upload Time')}
                                    </TableCell>
                                    <TableCell align="left">{renderTime(detailData.uploadTimestamp)}</TableCell>
                                </TableRow>
                            </Hidden>
                            <Hidden only={['sm', 'md', 'lg', 'xl']}>
                                {checkIsVerifyFileName() && (
                                    <TableRow id="file-name-row">
                                        <TableCell>
                                            <Typography variant="body2">{t('File Name')}</Typography>
                                            <Box sx={{ mt: 1, wordBreak: 'break-all' }}>
                                                {renderResult(detailData.fileNameVerifyResult)}
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                )}
                                <TableRow id="content-row">
                                    <TableCell>
                                        <Typography variant="body2">{t('Content')}</Typography>
                                        <Box sx={{ mt: 1, wordBreak: 'break-all' }}>
                                            {renderResult(detailData.fileContentVerifyResult)}
                                        </Box>
                                    </TableCell>
                                </TableRow>
                                <TableRow id="verify-time-row">
                                    <TableCell>
                                        <Typography variant="body2">{t('Upload Time')}</Typography>
                                        <Typography variant="body2" sx={{ mt: 1, wordBreak: 'break-all' }}>
                                            {renderTime(detailData.uploadTimestamp)}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </Hidden>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Collapse>
        </>
    )
}

VerifyResultTable.propTypes = {
    detailData: PropTypes.object.isRequired,
}

export default VerifyResultTable
