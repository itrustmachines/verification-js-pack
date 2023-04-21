import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Box, Typography, Paper, Table, TableBody, TableContainer, Hidden, IconButton, Collapse } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import DetailTableContent from './DetailTableContent'
import RwdDetailTableContent from './RwdDetailTableContent'

const VerifyDetailTable = ({ detailData }) => {
    const { t } = useTranslation()
    const [detailExpand, setDetailExpand] = useState(true)

    return (
        <>
            <Box mt={4} mb={2}>
                <Box display="flex" alignItems="center">
                    <Typography variant="h6" color="textPrimary" sx={{ color: 'common.white' }}>
                        {t('Verify Detail')}
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
                <TableContainer component={Paper}>
                    <Table id="verify-detail-table" aria-label="sticky table">
                        <TableBody>
                            <Hidden only={['xs']}>
                                <DetailTableContent detailData={detailData} />
                            </Hidden>
                            <Hidden only={['sm', 'md', 'lg', 'xl']}>
                                <RwdDetailTableContent detailData={detailData} />
                            </Hidden>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Collapse>
        </>
    )
}

VerifyDetailTable.propTypes = {
    detailData: PropTypes.object.isRequired,
}

export default VerifyDetailTable
