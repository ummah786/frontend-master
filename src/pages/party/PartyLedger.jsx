import React from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Grid } from '@mui/material';

const PartyLedger = ({ partyName }) => {
    const ledgerData = {
        'Cash Sale': [
            { date: '2024-05-28', voucher: 'Sales Invoice', srNo: 2, credit: 200, debit: 200, balance: 200 },
            { date: '2024-05-28', voucher: 'Sales Invoice', srNo: 3, credit: 200, debit: 200, balance: 200 },
        ],
        Raju: [
            // Ledger details for Raju
        ],
        Sandeep: [
            // Ledger details for Sandeep
        ],
    }[partyName];

    return (
        <div>
            <Grid container justifyContent="space-between" alignItems="center" style={{ marginBottom: 16 }}>
                <Typography variant="h6">Party Ledger</Typography>
                <div>
                    <Button variant="contained" style={{ marginRight: 8 }}>Download</Button>
                    <Button variant="contained" style={{ marginRight: 8 }}>Print</Button>
                    <Button variant="contained">Share</Button>
                </div>
            </Grid>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Voucher</TableCell>
                            <TableCell>Sr No</TableCell>
                            <TableCell>Credit</TableCell>
                            <TableCell>Debit</TableCell>
                            <TableCell>Balance</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ledgerData.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.date}</TableCell>
                                <TableCell>{row.voucher}</TableCell>
                                <TableCell>{row.srNo}</TableCell>
                                <TableCell>{row.credit}</TableCell>
                                <TableCell>{row.debit}</TableCell>
                                <TableCell>{row.balance}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default PartyLedger;
