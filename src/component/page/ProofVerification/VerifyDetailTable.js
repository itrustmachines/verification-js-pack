import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import {
    Box,
    Typography,
    Tooltip,
    TableContainer,
    Table,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    Hidden,
    IconButton,
    Collapse,
    Button,
} from '@mui/material'
import HelpIcon from '@mui/icons-material/Help'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import VerifyListModal from './VerifyListModal'
import MoreInfoModal from './MoreInfoModal'
import { getContractAddressUrl, renderTime, getTxHashBaseUrl } from '../../../util/stringUtil'

const contentTypo = { mt: 1, wordBreak: 'break-all' }
const titleCell = { minWidth: '70px' }
const contentCell = { wordBreak: 'break-all' }

const VerifyDetailTable = ({ detailData }) => {
    const { t } = useTranslation()
    const [detailExpand, setDetailExpand] = useState(true)
    const [modalOpen, setModalOpen] = useState(false)
    const [moreInfo, setMoreInfo] = useState({})
    const [moreInfoModalOpen, setMoreInfoModalOpen] = useState(false)

    const contractAddressUrl = getContractAddressUrl(detailData.evmEnv, detailData.contractAddress)

    const renderResult = (result, verifyResultDescription) => {
        if (result === 'PASS') {
            return (
                <>
                    <CheckIcon sx={{ color: 'success.main' }} data-testid="CheckIcon" />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                        {t(`${verifyResultDescription}`)}
                    </Typography>
                </>
            )
        } else {
            return (
                <>
                    <CloseIcon sx={{ color: 'error.main' }} data-testid="CloseIcon" />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                        {t(`${verifyResultDescription}`)}
                    </Typography>
                </>
            )
        }
    }

    const handleVerifyListModalOpen = () => {
        setModalOpen(true)
    }

    const handleVerifyListModalClose = () => {
        setModalOpen(false)
    }

    const handleMoreInfoModalOpen = (data) => {
        setMoreInfoModalOpen(true)
        const txHashBaseUrl = getTxHashBaseUrl(detailData.evmEnv)
        setMoreInfo({ ...data, txHashBaseUrl })
    }

    const handleMoreInfoModalClose = () => {
        setMoreInfoModalOpen(false)
    }

    return (
        <>
            <Box display="flex" alignItems="center" mb={2}>
                <Typography variant="h6" color="textPrimary" sx={{ color: 'common.white' }}>
                    {t('Blockchain Verify Detail')}
                </Typography>
                <IconButton
                    size="small"
                    sx={{ color: 'common.white' }}
                    aria-label="expand-detail"
                    onClick={() => setDetailExpand((prev) => !prev)}
                >
                    {detailExpand ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
            </Box>
            <Collapse data-testid="detail-collapse" in={detailExpand} timeout="auto" unmountOnExit>
                <Paper>
                    <TableContainer component={Paper}>
                        <Table id="verify-detail-table">
                            <TableBody>
                                <Hidden only={['xs']}>
                                    <TableRow id="off-chain-proof-row">
                                        <TableCell align="left" sx={titleCell}>
                                            {t('Off-chain Proof')}
                                        </TableCell>
                                        <TableCell align="left" sx={contentCell}>
                                            {detailData.proofFileName}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow id="verify-time-row">
                                        <TableCell align="left" sx={titleCell}>
                                            {t('Upload Time')}
                                        </TableCell>
                                        <TableCell align="left" sx={contentCell}>
                                            {renderTime(detailData.uploadTimestamp)}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow id="contract-address-row">
                                        <TableCell align="left" sx={titleCell}>
                                            {t('Contract Address')}
                                        </TableCell>
                                        <TableCell align="left" sx={contentCell}>
                                            <Box display="flex" alignItems="center">
                                                <Typography
                                                    component="a"
                                                    variant="body2"
                                                    href={contractAddressUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    sx={{
                                                        color: 'primary.main',
                                                        textDecoration: 'none',
                                                        mr: 1,
                                                        wordBreak: 'break-all',
                                                    }}
                                                >
                                                    {detailData.contractAddress}
                                                </Typography>
                                                <Tooltip
                                                    title={t('proof.verification.detail.help_contract_address')}
                                                    placement="right"
                                                    aria-label="contractAddress"
                                                >
                                                    <HelpIcon fontSize="small" color="primary" />
                                                </Tooltip>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                    {detailData.verifyResultDescription !== 'Contract connection error' && (
                                        <TableRow id="existence-status-row">
                                            <TableCell align="left" sx={titleCell}>
                                                {t('Existence Status')}
                                            </TableCell>
                                            <TableCell align="left" sx={contentCell}>
                                                {t('Total')}: {detailData.totalCount},{t('Pass')}:{' '}
                                                {detailData.successCount},{t('Modified')}: {detailData.modifiedCount}
                                                {detailData.queryType !== 'LOCATOR' && (
                                                    <>
                                                        , {t('Added')}: {detailData.addedCount},{t('Removed')}:{' '}
                                                        {detailData.removedCount}
                                                    </>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    )}
                                    <TableRow id="verify-result-row">
                                        <TableCell align="left" sx={titleCell}>
                                            {t('Verify Result')}
                                        </TableCell>
                                        <TableCell align="left" sx={contentCell}>
                                            <Box display="flex" alignItems="center">
                                                {renderResult(
                                                    detailData.verifyResult,
                                                    detailData.verifyResultDescription,
                                                )}
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                    {detailData.verifyResultDescription !== 'Contract connection error' &&
                                        detailData.proofDetailList.length !== 0 && (
                                            <TableRow id="blockchain-verify-list-row">
                                                <TableCell align="left" sx={titleCell}>
                                                    {t('Blockchain Verify List')}
                                                </TableCell>
                                                <TableCell align="left" sx={contentCell}>
                                                    <Box display="flex" alignItems="center">
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            size="small"
                                                            onClick={handleVerifyListModalOpen}
                                                        >
                                                            {t('View')}
                                                        </Button>
                                                    </Box>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                </Hidden>
                                <Hidden only={['sm', 'md', 'lg', 'xl']}>
                                    <TableRow id="proof-token-row">
                                        <TableCell>
                                            <Typography variant="body2">{t('Off-chain Proof')}</Typography>
                                            <Typography variant="body2" sx={contentTypo}>
                                                {detailData.proofFileName}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow id="verify-time-row">
                                        <TableCell>
                                            <Typography variant="body2">{t('Upload Time')}</Typography>
                                            <Typography variant="body2" sx={contentTypo}>
                                                {renderTime(detailData.uploadTimestamp)}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow id="contract-address-row">
                                        <TableCell>
                                            <Typography variant="body2">{t('Contract Address')}</Typography>
                                            <Box display="flex" alignItems="center" sx={contentTypo}>
                                                <Typography
                                                    component="a"
                                                    variant="body2"
                                                    href={contractAddressUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    sx={{
                                                        color: 'primary.main',
                                                        textDecoration: 'none',
                                                        mr: 1,
                                                        wordBreak: 'break-all',
                                                    }}
                                                >
                                                    {detailData.contractAddress}
                                                </Typography>
                                                <Tooltip
                                                    title={t('proof.verification.detail.help_contract_address')}
                                                    placement="right"
                                                    aria-label="contractAddress"
                                                >
                                                    <HelpIcon fontSize="small" color="primary" />
                                                </Tooltip>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                    {detailData.verifyResultDescription !== 'Contract connection error' && (
                                        <TableRow id="existence-status-row">
                                            <TableCell>
                                                <Typography variant="body2">{t('Existence Status')}</Typography>
                                                <Typography variant="body2" sx={contentTypo}>
                                                    {t('Total')}: {detailData.totalCount},{t('Pass')}:{' '}
                                                    {detailData.successCount},{t('Modified')}:{' '}
                                                    {detailData.modifiedCount}
                                                    {detailData.queryType !== 'LOCATOR' && (
                                                        <>
                                                            , {t('Added')}: {detailData.addedCount},{t('Removed')}:{' '}
                                                            {detailData.removedCount}
                                                        </>
                                                    )}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                    <TableRow id="verify-result-row">
                                        <TableCell>
                                            <Typography variant="body2">{t('Verify Result')}</Typography>
                                            <Box display="flex" alignItems="center" sx={contentTypo}>
                                                {renderResult(
                                                    detailData.verifyResult,
                                                    detailData.verifyResultDescription,
                                                )}
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                    {detailData.verifyResultDescription !== 'Contract connection error' &&
                                        detailData.proofDetailList.length !== 0 && (
                                            <TableRow id="blockchain-verify-list-row">
                                                <TableCell>
                                                    <Typography variant="body2">
                                                        {t('Blockchain Verify List')}
                                                    </Typography>
                                                    <Box display="flex" alignItems="center" sx={contentTypo}>
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            size="small"
                                                            onClick={handleVerifyListModalOpen}
                                                        >
                                                            {t('View')}
                                                        </Button>
                                                    </Box>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                </Hidden>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Collapse>
            <VerifyListModal
                detailData={detailData}
                modalOpen={modalOpen}
                handleVerifyListModalClose={handleVerifyListModalClose}
                handleMoreInfoModalOpen={handleMoreInfoModalOpen}
            />
            <MoreInfoModal
                moreInfo={moreInfo}
                moreInfoModalOpen={moreInfoModalOpen}
                onClose={handleMoreInfoModalClose}
            />
        </>
    )
}

VerifyDetailTable.propTypes = {
    detailData: PropTypes.object.isRequired,
}

export default VerifyDetailTable
