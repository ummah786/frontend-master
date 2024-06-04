import React, { useState } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Grid, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const PartyTransactions = ({ partyName }) => {
    const [transactionType, setTransactionType] = useState('');
    const transactions = {
        'Cash Sale': [
            { date: '28-May-2024', type: 'Sales Invoices', number: 3, amount: 200, status: 'Paid' },
            { date: '28-May-2024', type: 'Sales Invoices', number: 2, amount: 200, status: 'Unpaid' },
        ],
        Raju: [
            // Transactions for Raju
        ],
        Sandeep: [
            // Transactions for Sandeep
        ],
    }[partyName];

    const handleTransactionTypeChange = (event) => {
        setTransactionType(event.target.value);
    };

    return (
        <div>
            <Grid container justifyContent="space-between" alignItems="center" style={{ marginBottom: 16 }}>
                <Typography variant="h6">Transactions</Typography>
                <Grid item>
                    <FormControl style={{ marginRight: 16 }}>
                        <InputLabel>Select Transaction Type</InputLabel>
                        <Select
                            value={transactionType}
                            onChange={handleTransactionTypeChange}
                            displayEmpty
                        >
                            <MenuItem value="">
                                <em>All</em>
                            </MenuItem>
                            <MenuItem value="Sales Invoices">Sales Invoices</MenuItem>
                            <MenuItem value="Purchase Invoices">Purchase Invoices</MenuItem>
                            <MenuItem value="Payments">Payments</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant="contained">Last 365 Days</Button>
                </Grid>
            </Grid>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Transaction Type</TableCell>
                            <TableCell>Transaction Number</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions
                            .filter((transaction) => (transactionType ? transaction.type === transactionType : true))
                            .map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>{row.date}</TableCell>
                                    <TableCell>{row.type}</TableCell>
                                    <TableCell>{row.number}</TableCell>
                                    <TableCell>₹{row.amount}</TableCell>
                                    <TableCell>
                    <span style={{ color: row.status === 'Paid' ? 'green' : 'red' }}>
                      {row.status}
                    </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default PartyTransactions;
