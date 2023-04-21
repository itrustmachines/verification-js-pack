import React from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { Box, Modal, Typography, Tooltip, IconButton, List, ListItem } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorCircleIcon from '@mui/icons-material/Error'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import VerifyStatus from '../../common/VerifyStatus'
import { ExistenceType } from '../../../constants/ExistenceType'
import {
    renderTime,
    renderExistence,
    renderAttesterAddress,
    renderCmd,
    renderCertificatedName,
} from '../../../util/stringUtil'
import theme from '../../../theme/Theme'

const contentTypo = { mt: 1, wordBreak: 'break-all' }
const listItem = {
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
}
const noBorderBottomListItem = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
}

const MoreInfoModal = ({ moreInfo, moreInfoModalOpen, onClose }) => {
    const { t } = useTranslation()

    return (
        <Modal id="more-info-modal" open={moreInfoModalOpen} onClose={onClose}>
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
                    maxHeight: { xs: '80%', md: '75%', lg: '80%' },
                    width: { xs: '80%', sm: '70%', md: '60%' },
                    maxWidth: { lg: 900 },
                }}
            >
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="h6" color="textPrimary" sx={{ color: 'common.white' }}>
                        {t('More Info')}
                    </Typography>
                    <IconButton onClick={onClose} size="large">
                        <CloseRoundedIcon sx={{ color: 'common.white' }} />
                    </IconButton>
                </Box>
                <List sx={{ backgroundColor: 'common.white', borderRadius: 2, mt: 1 }}>
                    <ListItem sx={listItem} id="blockchain-detail-row">
                        <Typography variant="body2">{t('Blockchain Detail')}</Typography>
                        {moreInfo.txHash !== null ? (
                            <Tooltip
                                title={t('proof.verification.detail.help_clearance_order')}
                                placement="bottom-start"
                                sx={contentTypo}
                            >
                                <Typography
                                    id="more-info-co-link"
                                    component="a"
                                    variant="body2"
                                    href={`${moreInfo.txHashBaseUrl}/${moreInfo.txHash}`}
                                    sx={{ color: 'primary.main', textDecoration: 'none' }}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {moreInfo.clearanceOrder}
                                </Typography>
                            </Tooltip>
                        ) : (
                            <Typography variant="body2" sx={contentTypo}>
                                {moreInfo.clearanceOrder}
                            </Typography>
                        )}
                    </ListItem>
                    <ListItem sx={listItem} id="index-value-row">
                        <Typography variant="body2">Index Value</Typography>
                        <Typography variant="body2" sx={contentTypo}>
                            {moreInfo.indexValue}
                        </Typography>
                    </ListItem>
                    <ListItem sx={listItem} id="existence-row">
                        <Typography variant="body2">{t('Existence')}</Typography>
                        <Typography variant="body2" sx={contentTypo}>
                            {renderExistence(moreInfo.existenceType)}
                        </Typography>
                    </ListItem>
                    <ListItem
                        sx={moreInfo.existenceType === ExistenceType.EXIST ? listItem : noBorderBottomListItem}
                        id="verify-status-row"
                    >
                        <Typography variant="body2">{t('Status')}</Typography>
                        <Box sx={contentTypo}>
                            <VerifyStatus status={moreInfo.proofExistStatus} iconOnly={false} />
                        </Box>
                    </ListItem>
                    {moreInfo.existenceType === ExistenceType.EXIST && (
                        <>
                            <ListItem sx={listItem} id="attestation-time-row">
                                <Typography variant="body2">{t('Attestation Time')}</Typography>
                                <Typography variant="body2" sx={contentTypo}>
                                    {renderTime(moreInfo.receiptTimestamp)}
                                </Typography>
                            </ListItem>
                            {moreInfo.merkleProofRootHash !== null && (
                                <ListItem sx={listItem} id="root-hash-row">
                                    <Typography variant="body2">Root Hash</Typography>
                                    <Typography variant="body2" sx={contentTypo}>
                                        {moreInfo.merkleProofRootHash}
                                    </Typography>
                                </ListItem>
                            )}
                            <ListItem sx={listItem} id="attester-wallet-address-row">
                                <Typography variant="body2">{t('Attester Wallet Address')}</Typography>
                                <Typography variant="body2" sx={contentTypo}>
                                    {renderAttesterAddress(moreInfo)}
                                </Typography>
                            </ListItem>
                            <ListItem sx={listItem} id="attester-certificated-info-row">
                                <Typography variant="body2">{t('Attester Certificated Info')}</Typography>
                                <Box display="flex" alignItems="center" sx={contentTypo}>
                                    <Typography variant="body2">
                                        {moreInfo.certification
                                            ? renderCertificatedName(moreInfo.certification)
                                            : t('Not Certified')}
                                    </Typography>
                                    {moreInfo.certification ? (
                                        <CheckCircleIcon fontSize="small" color="primary" sx={{ ml: 1 }} />
                                    ) : (
                                        <ErrorCircleIcon fontSize="small" sx={{ color: 'text.hint', ml: 1 }} />
                                    )}
                                </Box>
                            </ListItem>
                            <ListItem
                                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
                                id="attested-fields-row"
                            >
                                <Typography variant="body2">{t('Attested Fields')}</Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', mt: 1 }}
                                >
                                    {renderCmd(moreInfo.cmd)}
                                </Typography>
                            </ListItem>
                        </>
                    )}
                </List>
            </Box>
        </Modal>
    )
}

MoreInfoModal.propTypes = {
    moreInfo: PropTypes.object.isRequired,
    moreInfoModalOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
}

export default MoreInfoModal
