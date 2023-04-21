import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import {
    Box,
    Paper,
    Table,
    TableCell,
    TableContainer,
    TableRow,
    Tooltip,
    Typography,
    TableBody,
    Hidden,
    IconButton,
    Collapse,
    Button,
} from '@mui/material'
import HelpIcon from '@mui/icons-material/Help'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { renderTime, getContractAddressUrl } from '../../../util/stringUtil'
import FilesVerifyListModal from './FilesVerifyListModal'
import SingleFileMoreInfoModal from './SingleFileMoreInfoModal'

const titleCell = { minWidth: '20%' }
const contentCell = { wordBreak: 'break-all', mt: { xs: 1, sm: 0 } }

const FilesVerifyDetailTable = ({ detailData }) => {
    const { t } = useTranslation()
    const [detailExpand, setDetailExpand] = useState(true)
    const [modalOpen, setModalOpen] = useState(false)
    const [moreInfoContent, setMoreInfoContent] = useState({})
    const [moreInfoOpen, setMoreInfoOpen] = useState(false)
    const contractAddressUrl = getContractAddressUrl(detailData.evmEnv, detailData.contractAddress)

    const renderResult = (result) => {
        if (result === 'PASS') {
            return (
                <Box display="flex" alignItems="center" sx={contentCell}>
                    <CheckIcon sx={{ color: 'success.main' }} />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                        {t('Success')}
                    </Typography>
                </Box>
            )
        } else if (result === 'PROOF_ERROR') {
            return (
                <Box display="flex" alignItems="center" sx={contentCell}>
                    <PriorityHighIcon sx={{ color: 'warning.main' }} />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                        {t('Proof Error')}
                    </Typography>
                </Box>
            )
        } else if (result === 'FAIL') {
            return (
                <Box display="flex" alignItems="center" sx={contentCell}>
                    <CloseIcon sx={{ color: 'error.main' }} />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                        {t('Fail')}
                    </Typography>
                </Box>
            )
        } else {
            return false
        }
    }

    const handleVerifyListModalOpen = () => {
        setModalOpen(true)
    }

    const handleVerifyListModalClose = () => {
        setModalOpen(false)
    }

    const handleMoreInfoOpen = (moreInfoContent) => {
        setMoreInfoContent(moreInfoContent)
        setMoreInfoOpen(true)
    }

    const handleMoreInfoClose = () => {
        setMoreInfoOpen(false)
    }

    return (
        <>
            <Box mt={3} mb={2} display="flex" alignItems="center" justifyContent="space-between">
                <Box display="flex" alignItems="center">
                    <Typography variant="h6" color="textPrimary" sx={{ color: 'common.white' }}>
                        {t('multiple Files Verify Detail')}
                    </Typography>
                    <IconButton
                        size="small"
                        sx={{ color: 'common.white' }}
                        aria-label="expand-list"
                        onClick={() => setDetailExpand((prev) => !prev)}
                    >
                        {detailExpand ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                </Box>
            </Box>
            <Collapse data-testid="list-collapse" in={detailExpand} timeout="auto" unmountOnExit>
                <TableContainer component={Paper} sx={{ width: '100%' }}>
                    <Table
                        id="files-verification-detail-table"
                        stickyHeader
                        aria-label="files verify detail overall info table"
                    >
                        <TableBody>
                            <Hidden only={['xs']}>
                                <TableRow id="proof-file-name-row">
                                    <TableCell align="left" sx={titleCell}>
                                        {t('Off-chain Proof')}
                                    </TableCell>
                                    <TableCell align="left" sx={contentCell}>
                                        {detailData.proofFileName}
                                    </TableCell>
                                </TableRow>
                                <TableRow id="upload-time-row">
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
                                        {detailData.contractAddress !== null && detailData.contractAddress !== '' ? (
                                            <Box display="flex" alignItems="center">
                                                <Typography
                                                    component="a"
                                                    variant="body2"
                                                    href={contractAddressUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    sx={{ color: 'primary.main', textDecoration: 'none' }}
                                                >
                                                    {detailData.contractAddress}
                                                </Typography>
                                                <Tooltip
                                                    title={t('proof.verification.detail.help_contract_address')}
                                                    placement="right"
                                                    aria-label="contract address explanation tooltip"
                                                >
                                                    <HelpIcon fontSize="small" color="primary" sx={{ ml: 1 }} />
                                                </Tooltip>
                                            </Box>
                                        ) : (
                                            <Typography variant="body2">N/A</Typography>
                                        )}
                                    </TableCell>
                                </TableRow>
                                <TableRow id="root-folder-name-row">
                                    <TableCell align="left" sx={titleCell}>
                                        {t('Root Folder Name')}
                                    </TableCell>
                                    <TableCell align="left" sx={contentCell}>
                                        {detailData.rootFolderName}
                                    </TableCell>
                                </TableRow>
                                <TableRow id="file-status-row">
                                    <TableCell align="left" sx={titleCell}>
                                        {t('File Status')}
                                    </TableCell>
                                    <TableCell align="left" sx={contentCell}>{`${t('Total')}:${
                                        detailData.verifyFileTotalCount
                                    }, ${t('Pass')}:${detailData.verifyFileSuccessCount}, ${t('Modified')}:${
                                        detailData.verifyFileModifiedCount
                                    }, ${t('Added')}:${detailData.verifyFileAddedCount}, ${t('Missing')}:${
                                        detailData.verifyFileMissingCount
                                    }`}</TableCell>
                                </TableRow>
                                <TableRow id="verify-result-row">
                                    <TableCell align="left" sx={titleCell}>
                                        {t('Verify Result')}
                                    </TableCell>
                                    <TableCell align="left" sx={contentCell}>
                                        {renderResult(detailData.fileVerifyResult)}
                                    </TableCell>
                                </TableRow>
                                <TableRow id="blockchain-verify-list-row">
                                    <TableCell align="left" sx={titleCell}>
                                        {t('Files Verify List')}
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
                            </Hidden>
                            <Hidden only={['sm', 'md', 'lg', 'xl']}>
                                <TableRow id="proof-file-name-row">
                                    <TableCell>
                                        <Typography variant="body2">{t('Off-chain Proof')}</Typography>
                                        <Typography variant="body2" sx={contentCell}>
                                            {detailData.proofFileName}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow id="upload-time-row">
                                    <TableCell>
                                        <Typography variant="body2">{t('Upload Time')}</Typography>
                                        <Typography variant="body2" sx={contentCell}>
                                            {renderTime(detailData.uploadTimestamp)}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow id="contract-address-row">
                                    <TableCell>
                                        <Typography variant="body2">{t('Contract Address')}</Typography>
                                        {detailData.contractAddress !== null && detailData.contractAddress !== '' ? (
                                            <Box display="flex" alignItems="center" sx={contentCell}>
                                                <Typography
                                                    component="a"
                                                    variant="body2"
                                                    href={contractAddressUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    sx={{ color: 'primary.main', textDecoration: 'none' }}
                                                >
                                                    {detailData.contractAddress}
                                                </Typography>
                                                <Tooltip
                                                    title={t('proof.verification.detail.help_contract_address')}
                                                    placement="right"
                                                    aria-label="contract address explanation tooltip"
                                                >
                                                    <HelpIcon fontSize="small" color="primary" sx={{ ml: 1 }} />
                                                </Tooltip>
                                            </Box>
                                        ) : (
                                            <Typography variant="body2" sx={contentCell}>
                                                N/A
                                            </Typography>
                                        )}
                                    </TableCell>
                                </TableRow>
                                <TableRow id="root-folder-name-row">
                                    <TableCell>
                                        <Typography variant="body2">{t('Root Folder Name')}</Typography>
                                        <Typography variant="body2" sx={contentCell}>
                                            {detailData.rootFolderName}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow id="file-status-row">
                                    <TableCell>
                                        <Typography variant="body2">{t('File Status')}</Typography>
                                        <Typography variant="body2" sx={contentCell}>
                                            {`${t('Total')}:${detailData.verifyFileTotalCount}, ${t('Pass')}:${
                                                detailData.verifyFileSuccessCount
                                            }, ${t('Modified')}:${detailData.verifyFileModifiedCount}, ${t('Added')}:${
                                                detailData.verifyFileAddedCount
                                            }, ${t('Missing')}:${detailData.verifyFileMissingCount}`}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow id="verify-result-row">
                                    <TableCell>
                                        <Typography variant="body2">{t('Verify Result')}</Typography>
                                        {renderResult(detailData.fileVerifyResult)}
                                    </TableCell>
                                </TableRow>

                                <TableRow id="blockchain-verify-list-row">
                                    <TableCell>
                                        <Typography variant="body2">{t('Files Verify List')}</Typography>
                                        <Box display="flex" alignItems="center" sx={contentCell}>
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
                            </Hidden>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Collapse>
            <FilesVerifyListModal
                verifyFileDetailList={detailData.verifyFileNameAndHashDetailList}
                modalOpen={modalOpen}
                handleVerifyListModalClose={handleVerifyListModalClose}
                handleMoreInfoOpen={handleMoreInfoOpen}
            />
            <SingleFileMoreInfoModal open={moreInfoOpen} onClose={handleMoreInfoClose} content={moreInfoContent} />
        </>
    )
}

FilesVerifyDetailTable.propTypes = {
    detailData: PropTypes.object.isRequired,
}

export default FilesVerifyDetailTable
