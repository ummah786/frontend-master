import React from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Grid, MenuItem, Select } from '@mui/material';


const PartyLedger = ({ party  }) => {
    const transactions = [
        { date: '2024-05-28', voucher: 'Sales Invoice', srNo: 2, credit: 200, debit: 200, tdsByParty: '-', tdsBySelf: '-', balance: 200 },
        { date: '2024-05-28', voucher: 'Sales Invoice', srNo: 3, credit: 200, debit: 200, tdsByParty: '-', tdsBySelf: '-', balance: 200 },
    ];

    return (
        <div>
            <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Select defaultValue="Last 365 Days">
                    <MenuItem value="Last 30 Days">Last 30 Days</MenuItem>
                    <MenuItem value="Last 90 Days">Last 90 Days</MenuItem>
                    <MenuItem value="Last 365 Days">Last 365 Days</MenuItem>
                </Select>
                <div>
                    <Button variant="outlined" sx={{ mr: 1 }}>Download</Button>
                    <Button variant="outlined">Print</Button>
                </div>
            </Grid>
            <Typography variant="h6" gutterBottom>{party}</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Voucher</TableCell>
                            <TableCell>Sr No</TableCell>
                            <TableCell>Credit</TableCell>
                            <TableCell>Debit</TableCell>
                            <TableCell>TDS deducted by party</TableCell>
                            <TableCell>TDS deducted by self</TableCell>
                            <TableCell>Balance</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.map((transaction, index) => (
                            <TableRow key={index}>
                                <TableCell>{transaction.date}</TableCell>
                                <TableCell>{transaction.voucher}</TableCell>
                                <TableCell>{transaction.srNo}</TableCell>
                                <TableCell>{transaction.credit}</TableCell>
                                <TableCell>{transaction.debit}</TableCell>
                                <TableCell>{transaction.tdsByParty}</TableCell>
                                <TableCell>{transaction.tdsBySelf}</TableCell>
                                <TableCell>{transaction.balance}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default PartyLedger;
