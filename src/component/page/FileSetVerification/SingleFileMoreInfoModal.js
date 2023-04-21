import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import {
    Box,
    IconButton,
    Modal,
    Paper,
    Table,
    TableCell,
    TableContainer,
    TableRow,
    Tooltip,
    Typography,
    TableBody,
    Hidden,
    List,
    ListItem,
} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import HelpIcon from '@mui/icons-material/Help'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import theme from '../../../theme/Theme'

const listItem = {
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
}

const SingleFileMoreInfoModal = ({ open, onClose, content }) => {
    const { t } = useTranslation()
    console.log('SingleFileMoreInfoModal', content)

    const renderVerifyFileContentResult = (status) => {
        console.log('status: ', status)
        if (status === 'OK') {
            return <CheckIcon sx={{ color: 'success.main', mr: 1 }} />
        } else if (status === 'NOT_IN_PROOF') {
            return <HelpIcon fontSize="small" sx={{ color: 'warning.light', mr: 1 }} />
        } else if (status === 'MISSING_DATA_TO_VERIFY') {
            return <PriorityHighIcon fontSize="small" sx={{ color: 'warning.main', mr: 1 }} />
        } else {
            return <CloseIcon sx={{ color: 'error.main' }} />
        }
    }

    const renderVerifyFileNameResult = (status) => {
        if (status === 'NOT_IN_PROOF') {
            return <HelpIcon fontSize="small" sx={{ color: 'warning.light', mr: 1 }} />
        } else if (status === 'MISSING_DATA_TO_VERIFY') {
            return <PriorityHighIcon fontSize="small" sx={{ color: 'warning.main', mr: 1 }} />
        } else {
            // file name is key, so it will always be correct when it's found in proof
            return <CheckIcon sx={{ color: 'success.main', mr: 1 }} />
        }
    }

    const renderVerifyResultText = (status) => {
        if (status === 'OK') {
            return t('File verify success')
        } else if (status === 'MISSING_DATA_TO_VERIFY') {
            return t('Missing data to verify')
        } else if (status === 'NOT_IN_PROOF') {
            return t('No corresponding proof found')
        } else {
            return t('File had been modified')
        }
    }

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'background.main',
                    position: 'absolute',
                    overflowY: 'auto',
                    boxShadow: 5,
                    p: 3,
                    pb: 4,
                    width: { xs: '80%', md: '60%', lg: '50%' },
                    maxWidth: { lg: 800 },
                    maxHeight: { md: '75%' },
                }}
            >
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography sx={{ color: 'common.white' }} variant="h6" gutterBottom>
                        {t('More Info')}
                    </Typography>
                    <IconButton aria-label="close-modal" onClick={onClose} size="large">
                        <CloseRoundedIcon sx={{ color: 'common.white' }} />
                    </IconButton>
                </Box>
                <Paper>
                    <Hidden only={['xs']}>
                        <TableContainer component={Paper}>
                            <Table aria-label="File verify result more info table">
                                <TableBody>
                                    <TableRow id="file-status-row">
                                        <TableCell sx={{ width: '15%' }}>{t('Status')}</TableCell>
                                        <TableCell align="center">
                                            <Box display="flex" alignItems="center">
                                                {renderVerifyFileContentResult(content.status)}
                                                <Box ml={2}>{renderVerifyResultText(content.status)}</Box>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow id="file-name-row">
                                        <TableCell sx={{ width: '15%' }}>{t('File Name')}</TableCell>
                                        <TableCell sx={{ maxWidth: 500, wordBreak: 'break-all' }}>
                                            <Box display="flex" alignItems="center">
                                                {renderVerifyFileNameResult(content.status)}
                                                <Box ml={2}>
                                                    <Tooltip title={content.fileName} placement="bottom-end">
                                                        <Box component="div" textOverflow="ellipsis" overflow="hidden">
                                                            {content.fileName}
                                                        </Box>
                                                    </Tooltip>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow id="file-hash-row">
                                        <TableCell sx={{ width: '15%' }}>{t('File Hash')}</TableCell>
                                        <TableCell sx={{ maxWidth: 500, wordBreak: 'break-all' }}>
                                            <Box display="flex" alignItems="center">
                                                {renderVerifyFileContentResult(content.status)}
                                                <Box ml={2}>
                                                    <Tooltip title={content.fileHash} placement="bottom-end">
                                                        <Box component="div" textOverflow="ellipsis" overflow="hidden">
                                                            {content.fileHash}
                                                        </Box>
                                                    </Tooltip>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Hidden>
                    <Hidden only={['sm', 'md', 'lg', 'xl']}>
                        <List sx={{ backgroundColor: 'common.white', borderRadius: 2, mt: 1 }}>
                            <ListItem sx={listItem} id="file-status-row">
                                <Typography variant="body2">{t('Status')}</Typography>
                                <Box display="flex" alignItems="center" sx={{ mt: 1, wordBreak: 'break-all' }}>
                                    {renderVerifyFileContentResult(content.status)}
                                    <Typography variant="body2">{renderVerifyResultText(content.status)}</Typography>
                                </Box>
                            </ListItem>
                            <ListItem sx={listItem} id="file-name-row">
                                <Typography variant="body2">{t('File Name')}</Typography>
                                <Box display="flex" alignItems="center" sx={{ mt: 1, wordBreak: 'break-all' }}>
                                    {renderVerifyFileNameResult(content.status)}
                                    <Typography variant="body2">
                                        <Tooltip title={content.fileName} placement="bottom-end">
                                            <Box component="div" textOverflow="ellipsis" overflow="hidden">
                                                {content.fileName}
                                            </Box>
                                        </Tooltip>
                                    </Typography>
                                </Box>
                            </ListItem>
                            <ListItem
                                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
                                id="file-hash-row"
                            >
                                <Typography variant="body2">{t('File Hash')}</Typography>
                                <Box display="flex" alignItems="center" sx={{ mt: 1, wordBreak: 'break-all' }}>
                                    {renderVerifyFileContentResult(content.status)}
                                    <Typography variant="body2">
                                        <Tooltip title={content.fileHash} placement="bottom-end">
                                            <Box component="div" textOverflow="ellipsis" overflow="hidden">
                                                {content.fileHash}
                                            </Box>
                                        </Tooltip>
                                    </Typography>
                                </Box>
                            </ListItem>
                        </List>
                    </Hidden>
                </Paper>
            </Box>
        </Modal>
    )
}

SingleFileMoreInfoModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    content: PropTypes.object.isRequired,
}

export default SingleFileMoreInfoModal
