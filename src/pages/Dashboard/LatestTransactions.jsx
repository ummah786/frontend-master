import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Link } from '@mui/material';

const transactions = [
    { date: '28 May 2024', type: 'Purchase Record', txnNo: 1, partyName: 'sandeep', amount: '₹1,000' },
    { date: '28 May 2024', type: 'Sales Invoice', txnNo: 3, partyName: 'Cash Sale', amount: '₹200' },
    { date: '28 May 2024', type: 'Sales Invoice', txnNo: 2, partyName: 'Cash Sale', amount: '₹200' },
    { date: '23 May 2024', type: 'Sales Invoice', txnNo: 1, partyName: 'Raju', amount: '₹100' },
];

function LatestTransactions() {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Txn No</TableCell>
                        <TableCell>Party Name</TableCell>
                        <TableCell>Amount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.map((txn) => (
                        <TableRow key={txn.txnNo}>
                            <TableCell>{txn.date}</TableCell>
                            <TableCell>{txn.type}</TableCell>
                            <TableCell>{txn.txnNo}</TableCell>
                            <TableCell>{txn.partyName}</TableCell>
                            <TableCell>{txn.amount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Link href="#" style={{ margin: '10px' }}>See All Transactions</Link>
        </TableContainer>
    );
}

export default LatestTransactions;
