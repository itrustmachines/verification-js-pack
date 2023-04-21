import React from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'
import { TableRow, Tooltip, Box, Typography, Hidden, TableCell } from '@mui/material'
import { styled } from '@mui/material/styles'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorCircleIcon from '@mui/icons-material/Error'
import { ExistenceType } from '../../../constants/ExistenceType'
import { renderTime, renderCertificatedName } from '../../../util/stringUtil'
import VerifyStatus from '../VerifyStatus'

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

const DataRow = ({ data, renderMoreInfo, renderClearanceOrder, renderShortIndexValue }) => {
    const { t } = useTranslation()

    const renderLimitLengthValue = (value) => {
        return (
            <>
                <Hidden lgDown>
                    <CustomCell align="left">{value}</CustomCell>
                </Hidden>
                <Hidden only={['xs', 'sm', 'lg', 'xl']}>
                    <CustomCell align="left">
                        <Tooltip title={value} placement="bottom">
                            <span>{`${value.substr(0, 5)}...${value.substr(value.length - 5)}`}</span>
                        </Tooltip>
                    </CustomCell>
                </Hidden>
                <Hidden only={['md', 'lg', 'xl']}>
                    <CustomCell align="left">
                        <Tooltip title={value} placement="bottom">
                            <span>{`${value.substr(0, 3)}...${value.substr(value.length - 3)}`}</span>
                        </Tooltip>
                    </CustomCell>
                </Hidden>
            </>
        )
    }

    return (
        <TableRow id="verify-list-result-row" key={uuidv4()}>
            <CustomCell align="left">
                <Hidden only={['xs']}>
                    <Typography variant="body2">
                        {data.existenceType === ExistenceType.EXIST && renderTime(data.receiptTimestamp)}
                    </Typography>
                </Hidden>
                <Hidden smUp>
                    <Typography variant="body2">
                        {data.existenceType === ExistenceType.EXIST && renderTime(data.receiptTimestamp)}
                    </Typography>
                    {renderShortIndexValue && (
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            {renderClearanceOrder(data)} / {renderShortIndexValue(data.indexValue)}
                        </Typography>
                    )}
                </Hidden>
            </CustomCell>
            <Hidden lgDown>
                <CustomCell align="left">
                    {data.existenceType === ExistenceType.EXIST && (
                        <Box display="flex" alignItems="center">
                            {data.certification ? t('Certified') : t('Not Certified')}
                            {data.certification ? (
                                <Tooltip title={renderCertificatedName(data.certification)} placement="right">
                                    <CheckCircleIcon
                                        fontSize="small"
                                        color="primary"
                                        sx={{ color: 'primary.main', ml: 1 }}
                                    />
                                </Tooltip>
                            ) : (
                                <ErrorCircleIcon fontSize="small" sx={{ color: 'text.hint', ml: 1 }} />
                            )}
                        </Box>
                    )}
                </CustomCell>
            </Hidden>
            <Hidden only={['xs']}>
                <CustomCell align="left">{renderClearanceOrder(data)}</CustomCell>
                {renderLimitLengthValue(data.indexValue)}
            </Hidden>
            <CustomCell align="center">
                <VerifyStatus status={data.proofExistStatus} iconOnly={true} />
            </CustomCell>
            <CustomCell align="center">{renderMoreInfo(data)}</CustomCell>
        </TableRow>
    )
}

DataRow.propTypes = {
    data: PropTypes.object.isRequired,
    renderMoreInfo: PropTypes.func.isRequired,
    renderClearanceOrder: PropTypes.func.isRequired,
    renderShortIndexValue: PropTypes.func,
}

export default DataRow
