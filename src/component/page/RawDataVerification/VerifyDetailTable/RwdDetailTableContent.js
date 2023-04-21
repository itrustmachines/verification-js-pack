import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Typography, Box, TableRow, TableCell, Tooltip } from '@mui/material'
import ErrorIcon from '@mui/icons-material/Error'
import HelpIcon from '@mui/icons-material/Help'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorCircleIcon from '@mui/icons-material/Error'
import {
    renderTime,
    renderCmd,
    renderCertificatedName,
    renderAttesterAddress,
    getContractAddressUrl,
    getTxHashBaseUrl,
    isEmptyString,
} from '../../../../util/stringUtil'

const contentTypo = { mt: 1, wordBreak: 'break-all' }

const RwdDetailTableContent = ({ detailData }) => {
    const { t } = useTranslation()

    const {
        certification,
        clearanceOrder,
        cmd,
        contractAddress,
        evmEnv,
        indexValue,
        ledgerInputTimestamp,
        merkleProofRootHash,
        proofFileName,
        txHash,
        verifyFileName,
        verifyResult,
        uploadFileHash,
    } = detailData
    const attesterAddress = renderAttesterAddress(detailData)
    const contractAddressUrl = getContractAddressUrl(evmEnv, contractAddress)
    const txHashBaseUrl = getTxHashBaseUrl(evmEnv)

    let parseCmd = null
    if (detailData?.cmd !== '') {
        parseCmd = JSON.parse(cmd)
    }

    return (
        <>
            <TableRow id="uploaded-data-file-name-row">
                <TableCell>
                    <Typography variant="body2">{t('Uploaded Data File Name')}</Typography>
                    <Typography variant="body2" sx={contentTypo}>
                        {verifyFileName}
                    </Typography>
                </TableCell>
            </TableRow>
            <TableRow id="uploaded-data-file-hash-row">
                <TableCell>
                    <Typography variant="body2">{t('Uploaded Data File Hash')}</Typography>
                    <Typography variant="body2" sx={contentTypo}>
                        {isEmptyString(uploadFileHash) ? 'N/A' : uploadFileHash}
                    </Typography>
                </TableCell>
            </TableRow>
            {parseCmd && !isEmptyString(parseCmd.description) && (
                <TableRow id="description-row">
                    <TableCell>
                        <Typography variant="body2">{t('Description')}</Typography>
                        <Typography variant="body2" sx={contentTypo}>
                            {parseCmd && parseCmd.description}
                        </Typography>
                    </TableCell>
                </TableRow>
            )}
            {!isEmptyString(attesterAddress) && (
                <TableRow id="attester-wallet-address-row">
                    <TableCell>
                        <Typography variant="body2">{t('Attester Wallet Address')}</Typography>
                        <Typography variant="body2" sx={contentTypo}>
                            {attesterAddress}
                        </Typography>
                    </TableCell>
                </TableRow>
            )}
            <TableRow id="attester-certificated-info-row">
                <TableCell>
                    <Typography variant="body2">{t('Attester Certificated Info')}</Typography>
                    <Box display="flex" alignItems="center" sx={contentTypo}>
                        <Typography variant="body2">
                            {certification ? renderCertificatedName(certification) : t('Not Certified')}
                        </Typography>
                        {certification ? (
                            <CheckCircleIcon fontSize="small" sx={{ color: 'primary.main', ml: 1 }} />
                        ) : (
                            <ErrorCircleIcon fontSize="small" sx={{ color: 'text.hint', ml: 1 }} />
                        )}
                    </Box>
                </TableCell>
            </TableRow>
            {!isEmptyString(ledgerInputTimestamp) && (
                <TableRow id="attestation-time-row">
                    <TableCell>
                        <Typography variant="body2">{t('Attestation Time')}</Typography>
                        <Typography variant="body2" sx={contentTypo}>
                            {renderTime(ledgerInputTimestamp)}
                        </Typography>
                    </TableCell>
                </TableRow>
            )}
            <TableRow id="off-chain-roof-row">
                <TableCell>
                    <Typography variant="body2">{t('Off-chain Proof')}</Typography>
                    <Typography variant="body2" sx={contentTypo}>
                        {proofFileName}
                    </Typography>
                </TableCell>
            </TableRow>
            <TableRow id="contract-address-row">
                <TableCell>
                    <Typography variant="body2">{t('Contract Address')}</Typography>
                    {isEmptyString(contractAddress) ? (
                        'N/A'
                    ) : (
                        <Box display="flex" alignItems="center" sx={contentTypo}>
                            <Typography
                                id="contract-address-link"
                                component="a"
                                variant="body2"
                                href={contractAddressUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{ color: 'primary.main', textDecoration: 'none', wordBreak: 'break-all' }}
                            >
                                {contractAddress}
                            </Typography>
                            {verifyResult === 'PROOF_ERROR' ? (
                                <Tooltip
                                    title={t('The Proof had been modified, the link might be invalid')}
                                    placement="top"
                                    arrow
                                >
                                    <ErrorIcon fontSize="small" sx={{ color: 'warning.main', ml: 1 }} />
                                </Tooltip>
                            ) : (
                                <Tooltip
                                    title={t('proof.verification.detail.help_contract_address')}
                                    placement="top"
                                    aria-label="contractAddress"
                                >
                                    <HelpIcon color="primary" fontSize="small" sx={{ ml: 1 }} />
                                </Tooltip>
                            )}
                        </Box>
                    )}
                </TableCell>
            </TableRow>
            <TableRow id="blockchain-detail-row">
                <TableCell>
                    <Typography variant="body2">{t('Blockchain Detail')}</Typography>
                    {isEmptyString(clearanceOrder) ? (
                        'N/A'
                    ) : (
                        <Box display="flex" alignItems="center" sx={contentTypo}>
                            <Typography
                                id="clearance-order-link"
                                component="a"
                                variant="body2"
                                href={`${txHashBaseUrl}/${txHash}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{ color: 'primary.main', textDecoration: 'none', wordBreak: 'break-all' }}
                            >
                                {clearanceOrder}
                            </Typography>
                            {verifyResult === 'PROOF_ERROR' ? (
                                <Tooltip
                                    title={t('The Proof had been modified, the link might be invalid')}
                                    placement="right"
                                >
                                    <ErrorIcon sx={{ color: 'warning.main', ml: 1 }} />
                                </Tooltip>
                            ) : (
                                <Tooltip title={t('proof.verification.detail.help_clearance_order')} placement="right">
                                    <HelpIcon color="primary" fontSize="small" sx={{ ml: 1 }} />
                                </Tooltip>
                            )}
                        </Box>
                    )}
                </TableCell>
            </TableRow>
            <TableRow id="index-value-row">
                <TableCell>
                    <Typography variant="body2">Index Value</Typography>
                    <Typography variant="body2" sx={contentTypo}>
                        {isEmptyString(indexValue) ? 'N/A' : indexValue}
                    </Typography>
                </TableCell>
            </TableRow>
            <TableRow id="root-hash-row">
                <TableCell>
                    <Typography variant="body2">Root Hash</Typography>
                    <Typography variant="body2" sx={contentTypo}>
                        {isEmptyString(merkleProofRootHash) ? 'N/A' : merkleProofRootHash}
                    </Typography>
                </TableCell>
            </TableRow>
            <TableRow id="attested-fields-row">
                <TableCell>
                    <Typography variant="body2">{t('Attested Fields')}</Typography>
                    <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', mt: 1 }}>
                        {isEmptyString(cmd) ? 'N/A' : renderCmd(cmd)}
                    </Typography>
                </TableCell>
            </TableRow>
        </>
    )
}

RwdDetailTableContent.propTypes = {
    detailData: PropTypes.object.isRequired,
}

export default RwdDetailTableContent
