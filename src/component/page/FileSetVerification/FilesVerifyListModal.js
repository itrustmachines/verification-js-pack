import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import {
    Box,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
    Hidden,
    Modal,
} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import SearchIcon from '@mui/icons-material/Search'
import HelpIcon from '@mui/icons-material/Help'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'

const FilesVerifyListModal = ({ verifyFileDetailList, modalOpen, handleVerifyListModalClose, handleMoreInfoOpen }) => {
    const { t } = useTranslation()

    const renderResult = (result) => {
        if (result === 'OK') {
            return <CheckIcon sx={{ color: 'success.main', fontSize: '1.8rem' }} />
        } else if (result === 'NOT_IN_PROOF') {
            return (
                <Tooltip title={t('Proof Not Found')} placement="right">
                    <HelpIcon sx={{ color: 'warning.light' }} />
                </Tooltip>
            )
        } else if (result === 'MISSING_DATA_TO_VERIFY') {
            return (
                <Tooltip title={t('Missing data to verify')} placement="right">
                    <PriorityHighIcon sx={{ color: 'warning.main' }} />
                </Tooltip>
            )
        } else {
            return <CloseIcon sx={{ color: 'error.main', fontSize: '1.8rem' }} />
        }
    }

    const renderMoreInfo = (data) => {
        const { status, fileName, fileHash } = data
        const moreInfoContent = {
            status,
            fileName,
            fileHash,
        }
        return (
            <IconButton onClick={() => handleMoreInfoOpen(moreInfoContent)} size="large">
                <SearchIcon />
            </IconButton>
        )
    }

    return (
        <Modal open={modalOpen} onClose={handleVerifyListModalClose}>
            <Box
                sx={{
                    backgroundColor: 'background.main',
                    position: 'absolute',
                    overflowY: 'auto',
                    boxShadow: 5,
                    p: 3,
                    pb: 4,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { xs: '80%', lg: '70%' },
                    maxHeight: { sm: '75%' },
                    maxWidth: { lg: 950 },
                }}
            >
                <Box mb={2} display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="h6" color="textPrimary" sx={{ color: 'common.white' }}>
                        {t('Files Verify List')}
                    </Typography>
                    <IconButton
                        sx={{ color: 'common.white' }}
                        aria-label="close-modal"
                        onClick={handleVerifyListModalClose}
                        size="large"
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>
                {/* TODO update rwd view */}
                <TableContainer component={Paper} sx={{ width: '100%' }}>
                    <Table stickyHeader aria-label="files verify list table">
                        <TableHead>
                            <TableRow id="files-verify-list-header-row">
                                <TableCell>{t('File Name')}</TableCell>
                                <Hidden only={['xs']}>
                                    <TableCell>{t('File Hash')}</TableCell>
                                </Hidden>
                                <TableCell align="center">{t('Status')}</TableCell>
                                <TableCell align="center">{t('More Info')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {verifyFileDetailList.length > 0 &&
                                verifyFileDetailList.map((data, index) => {
                                    return (
                                        <TableRow
                                            key={`file-verify-result-row-${index}`}
                                            id={`file-verify-result-row-${index}`}
                                        >
                                            <TableCell>
                                                <Tooltip title={data.fileName} placement="bottom-end">
                                                    <Box component="div" textOverflow="ellipsis" overflow="hidden">
                                                        {data.fileName}
                                                    </Box>
                                                </Tooltip>
                                            </TableCell>
                                            <Hidden only={['xs']}>
                                                <TableCell>
                                                    <Tooltip title={data.fileHash} placement="bottom-end">
                                                        <Box component="div" textOverflow="ellipsis" overflow="hidden">
                                                            {data.fileHash}
                                                        </Box>
                                                    </Tooltip>
                                                </TableCell>
                                            </Hidden>
                                            <TableCell align="center">
                                                <Box display="flex" justifyContent="center">
                                                    {renderResult(data.status)}
                                                </Box>
                                            </TableCell>
                                            <TableCell align="center">{renderMoreInfo(data)}</TableCell>
                                        </TableRow>
                                    )
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Modal>
    )
}

FilesVerifyListModal.propTypes = {
    verifyFileDetailList: PropTypes.array.isRequired,
    modalOpen: PropTypes.bool.isRequired,
    handleVerifyListModalClose: PropTypes.func.isRequired,
    handleMoreInfoOpen: PropTypes.func.isRequired,
}

export default FilesVerifyListModal
