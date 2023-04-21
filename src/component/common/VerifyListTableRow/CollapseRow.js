import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'
import { useMediaQuery, TableRow, Box, Button, Typography, Hidden, Tooltip, TableCell } from '@mui/material'
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore'
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess'
import VerifyStatus from '../VerifyStatus'
import theme from '../../../theme/Theme'

const CollapseRow = ({ dataArr, renderMoreInfo, renderClearanceOrder, renderShortIndexValue, hideBottomBorder }) => {
    const [expand, setExpand] = useState(false)
    const { t } = useTranslation()
    const isMdDown = useMediaQuery((theme) => theme.breakpoints.down('lg'))

    const handleHiddenRowExpand = () => {
        setExpand((prev) => !prev)
    }

    const renderLimitLengthValue = (value) => {
        if (value === '') {
            return <TableCell align="left">N/A</TableCell>
        } else {
            return (
                <>
                    <Hidden lgDown>
                        <TableCell align="left">{value}</TableCell>
                    </Hidden>
                    <Hidden only={['xs', 'sm', 'lg', 'xl']}>
                        <TableCell align="left">
                            <Tooltip title={value} placement="bottom">
                                <span>{`${value.substr(0, 5)}...${value.substr(value.length - 5)}`}</span>
                            </Tooltip>
                        </TableCell>
                    </Hidden>
                    <Hidden only={['md', 'lg', 'xl']}>
                        <TableCell align="left">
                            <Tooltip title={value} placement="bottom">
                                <span>{`${value.substr(0, 3)}...${value.substr(value.length - 3)}`}</span>
                            </Tooltip>
                        </TableCell>
                    </Hidden>
                </>
            )
        }
    }

    // FIXME refactor border logic
    return (
        <>
            <TableRow id="expand-hidden-row" key={uuidv4()}>
                <TableCell
                    align="left"
                    colSpan={12}
                    sx={
                        hideBottomBorder
                            ? {
                                  padding: 0,
                                  borderBottom: (expand) => (expand ? `1px solid ${theme.palette.grey[300]}` : 'none'),
                              }
                            : { p: 0 }
                    }
                >
                    <Box display="flex">
                        <Button
                            startIcon={
                                expand ? <UnfoldLessIcon fontSize="small" /> : <UnfoldMoreIcon fontSize="small" />
                            }
                            sx={{
                                flexGrow: 1,
                                justifyContent: 'flex-start',
                                color: 'text.hint',
                                backgroundColor: theme.palette.grey[100],
                                '&:hover': { backgroundColor: theme.palette.grey[200] },
                                textTransform: 'none',
                            }}
                            onClick={handleHiddenRowExpand}
                        >
                            {expand ? t('Hide verify data hint') : t('Show hidden verify data hint')}
                        </Button>
                    </Box>
                </TableCell>
            </TableRow>
            {dataArr &&
                dataArr.map((data, index) => (
                    <React.Fragment key={`collapse-row-${index}`}>
                        {expand && (
                            <TableRow sx={{ backgroundColor: theme.palette.grey[100] }}>
                                <TableCell align="left" size="small" colSpan={isMdDown ? 1 : 2}>
                                    <Typography variant="body2">{t('End of record proof')}</Typography>
                                    <Hidden smUp>
                                        {renderShortIndexValue && data.clearanceOrder !== -1 && (
                                            <Typography variant="body2">
                                                {renderClearanceOrder(data)} / {renderShortIndexValue(data.indexValue)}
                                            </Typography>
                                        )}
                                    </Hidden>
                                </TableCell>
                                <Hidden only={['xs']}>
                                    <TableCell align="left" size="small">
                                        {renderClearanceOrder(data)}
                                    </TableCell>
                                    {renderLimitLengthValue(data.indexValue)}
                                </Hidden>
                                <TableCell align="center" size="small">
                                    <VerifyStatus status={data.proofExistStatus} iconOnly={true} />
                                </TableCell>
                                <TableCell align="center" size="small">
                                    {renderMoreInfo(data)}
                                </TableCell>
                            </TableRow>
                        )}
                    </React.Fragment>
                ))}
        </>
    )
}

CollapseRow.propTypes = {
    dataArr: PropTypes.array.isRequired,
    renderMoreInfo: PropTypes.func.isRequired,
    renderClearanceOrder: PropTypes.func.isRequired,
    renderShortIndexValue: PropTypes.func,
    hideBottomBorder: PropTypes.bool,
}

export default CollapseRow
