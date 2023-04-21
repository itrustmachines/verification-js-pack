import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import {
    Typography,
    TableContainer,
    TableHead,
    Table,
    TableRow,
    TableBody,
    Paper,
    Tooltip,
    IconButton,
    TableCell,
    Hidden,
    Box,
    Modal,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import DataRow from '../../common/VerifyListTableRow/DataRow'
import CollapseRow from '../../common/VerifyListTableRow/CollapseRow'
import { arrangeRowDataList } from '../../../util/verifyListTableDataUtil'
import { getTxHashBaseUrl } from '../../../util/stringUtil'
import { proofDetailSortAscFunction } from '../../../util/sortUtil'

const CustomCell = styled(TableCell)(({ theme }) => ({
    minWidth: 70,
    [theme.breakpoints.down('lg')]: {
        width: 120,
    },
    [theme.breakpoints.down('md')]: {
        minWidth: 45,
    },
    [theme.breakpoints.down('sm')]: {
        width: '80%',
    },
}))

const VerifyListModal = ({ detailData, modalOpen, handleMoreInfoModalOpen, handleVerifyListModalClose }) => {
    const { t } = useTranslation()
    const txHashBaseUrl = getTxHashBaseUrl(detailData.evmEnv)

    const renderClearanceOrder = (data) => {
        return data.txHash !== null ? (
            <Tooltip title={t('proof.verification.detail.help_clearance_order')} placement="bottom-start">
                <Typography
                    id="row-co-link"
                    component="a"
                    variant="body2"
                    href={`${txHashBaseUrl}/${data.txHash}`}
                    sx={{ color: 'primary.main', textDecoration: 'none' }}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {data.clearanceOrder}
                </Typography>
            </Tooltip>
        ) : (
            <>{data.clearanceOrder}</>
        )
    }

    const renderMoreInfo = (data) => {
        return (
            data.proofExistStatus !== 'REMOVED' && (
                <IconButton onClick={() => handleMoreInfoModalOpen(data)} size="large">
                    <SearchIcon />
                </IconButton>
            )
        )
    }

    const renderShortIndexValue = (value) => {
        return value.substr(value.length - 2)
    }

    const [rowList, setRowList] = useState([])

    useEffect(() => {
        if (detailData.proofDetailList && detailData.proofDetailList.length > 0) {
            detailData.proofDetailList.sort(proofDetailSortAscFunction)

            setRowList(arrangeRowDataList(detailData.proofDetailList))
        }
    }, [detailData])

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
                    maxHeight: { xs: '85%', md: '75%' },
                    width: { xs: '80%', md: '60%', lg: '80%' },
                    maxWidth: 950,
                }}
            >
                <Box mb={2} display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="h6" color="textPrimary" sx={{ color: 'common.white' }}>
                        {t('Blockchain Verify List')}
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
                <TableContainer component={Paper}>
                    <Table id="verify-list-table" stickyHeader aria-label="sticky table">
                        <TableHead>
                            {
                                <Hidden only={['xs']}>
                                    <TableRow id="proof-verification-header-row">
                                        <TableCell>
                                            <Typography variant="body2">{t('Attestation Time')}</Typography>
                                        </TableCell>
                                        <Hidden lgDown>
                                            <TableCell>
                                                <Typography variant="body2" sx={{ mt: 1 }}>
                                                    {t('Attester Certificated Info')}
                                                </Typography>
                                            </TableCell>
                                        </Hidden>
                                        <TableCell>
                                            <Typography variant="body2">{t('Blockchain Detail')}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2">{'Index Value'}</Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="body2">{t('Status')}</Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="body2">{t('More Info')}</Typography>
                                        </TableCell>
                                    </TableRow>
                                </Hidden>
                            }
                            {
                                <Hidden only={['sm', 'md', 'lg', 'xl']}>
                                    <TableRow id="verify-list-header-row">
                                        <CustomCell align="left">
                                            <Typography variant="body2">{t('Attestation Time')}</Typography>
                                            <Typography variant="body2" sx={{ mt: 1 }}>
                                                CO / SN
                                            </Typography>
                                        </CustomCell>
                                        <CustomCell align="center">{t('Status')}</CustomCell>
                                        <CustomCell align="center">{t('More Info')}</CustomCell>
                                    </TableRow>
                                </Hidden>
                            }
                        </TableHead>
                        <TableBody>
                            {rowList.map(({ collapse, dataList }, index) => {
                                return (
                                    <React.Fragment key={`verify-list-row-${index}`}>
                                        {collapse && (
                                            <CollapseRow
                                                dataArr={dataList}
                                                renderMoreInfo={renderMoreInfo}
                                                renderClearanceOrder={renderClearanceOrder}
                                                hideBottomBorder={index === rowList.length - 1}
                                                renderShortIndexValue={renderShortIndexValue}
                                            />
                                        )}
                                        {!collapse &&
                                            dataList.map((singleRowData, index) => (
                                                <DataRow
                                                    key={`data-row-${index}`}
                                                    data={singleRowData}
                                                    renderMoreInfo={renderMoreInfo}
                                                    renderClearanceOrder={renderClearanceOrder}
                                                    renderShortIndexValue={renderShortIndexValue}
                                                />
                                            ))}
                                    </React.Fragment>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>{' '}
            </Box>
        </Modal>
    )
}

VerifyListModal.propTypes = {
    detailData: PropTypes.object.isRequired,
    modalOpen: PropTypes.bool.isRequired,
    handleMoreInfoModalOpen: PropTypes.func.isRequired,
    handleVerifyListModalClose: PropTypes.func.isRequired,
}

export default VerifyListModal
