import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Typography, Box, TableRow, TableCell, Tooltip } from '@mui/material'
import ErrorIcon from '@mui/icons-material/Error'
import HelpIcon from '@mui/icons-material/Help'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import {
    renderTime,
    renderCmd,
    renderCertificatedName,
    renderAttesterAddress,
    getContractAddressUrl,
    getTxHashBaseUrl,
    isEmptyString,
} from '../../../../util/stringUtil'

const titleCell = { minWidth: '150px' }
const contentCell = { wordBreak: 'break-all' }

const DetailTableContent = ({ detailData }) => {
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
                <TableCell align="left" sx={titleCell}>
                    {t('Uploaded Data File Name')}
                </TableCell>
                <TableCell align="left" sx={contentCell}>
                    {verifyFileName}
                </TableCell>
            </TableRow>
            <TableRow id="uploaded-data-file-hash-row">
                <TableCell align="left" sx={titleCell}>
                    {t('Uploaded Data File Hash')}
                </TableCell>
                <TableCell align="left" sx={contentCell}>
                    {isEmptyString(uploadFileHash) ? 'N/A' : uploadFileHash}
                </TableCell>
            </TableRow>
            {parseCmd && !isEmptyString(parseCmd.description) && (
                <TableRow id="description-row">
                    <TableCell align="left" sx={titleCell}>
                        {t('Description')}
                    </TableCell>
                    <TableCell align="left" sx={contentCell}>
                        {parseCmd && parseCmd.description}
                    </TableCell>
                </TableRow>
            )}
            {!isEmptyString(attesterAddress) && (
                <TableRow id="attester-wallet-address-row">
                    <TableCell align="left" sx={titleCell}>
                        {t('Attester Wallet Address')}
                    </TableCell>
                    <TableCell align="left" sx={contentCell}>
                        {attesterAddress}
                    </TableCell>
                </TableRow>
            )}
            <TableRow id="attester-certificated-info-row">
                <TableCell align="left" sx={titleCell}>
                    {t('Attester Certificated Info')}
                </TableCell>
                <TableCell align="left" sx={contentCell}>
                    <Box display="flex" alignItems="center">
                        {certification ? renderCertificatedName(certification) : t('Not Certified')}
                        {certification ? (
                            <CheckCircleIcon fontSize="small" sx={{ color: 'primary.main', ml: 1 }} />
                        ) : (
                            <ErrorIcon fontSize="small" sx={{ color: 'text.hint', ml: 1 }} />
                        )}
                    </Box>
                </TableCell>
            </TableRow>
            {!isEmptyString(ledgerInputTimestamp) && (
                <TableRow id="attestation-time-row">
                    <TableCell align="left" sx={titleCell}>
                        {t('Attestation Time')}
                    </TableCell>
                    <TableCell align="left" sx={contentCell}>
                        {renderTime(ledgerInputTimestamp)}
                    </TableCell>
                </TableRow>
            )}
            <TableRow id="off-chain-proof-row">
                <TableCell align="left" sx={titleCell}>
                    {t('Off-chain Proof')}
                </TableCell>
                <TableCell align="left" sx={contentCell}>
                    {proofFileName}
                </TableCell>
            </TableRow>
            <TableRow id="contract-address-row">
                <TableCell align="left" sx={titleCell}>
                    {t('Contract Address')}
                </TableCell>
                <TableCell align="left" sx={contentCell}>
                    {isEmptyString(contractAddress) ? (
                        'N/A'
                    ) : (
                        <Box display="flex" alignItems="center">
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
                <TableCell align="left" sx={titleCell}>
                    {t('Blockchain Detail')}
                </TableCell>
                <TableCell align="left" sx={contentCell}>
                    {isEmptyString(clearanceOrder) ? (
                        'N/A'
                    ) : (
                        <Box display="flex" alignItems="center">
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
                <TableCell align="left" sx={titleCell}>
                    Index Value
                </TableCell>
                <TableCell align="left" sx={contentCell}>
                    {isEmptyString(indexValue) ? 'N/A' : indexValue}
                </TableCell>
            </TableRow>
            <TableRow id="root-hash-row">
                <TableCell align="left" sx={titleCell}>
                    Root Hash
                </TableCell>
                <TableCell align="left" sx={contentCell}>
                    {isEmptyString(merkleProofRootHash) ? 'N/A' : merkleProofRootHash}
                </TableCell>
            </TableRow>
            <TableRow id="attested-fields-row">
                <TableCell align="left" sx={titleCell}>
                    {t('Attested Fields')}
                </TableCell>
                <TableCell align="left" sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', mt: 1 }}>
                    {isEmptyString(cmd) ? 'N/A' : renderCmd(cmd)}
                </TableCell>
            </TableRow>
        </>
    )
}

DetailTableContent.propTypes = {
    detailData: PropTypes.object.isRequired,
}

export default DetailTableContent
