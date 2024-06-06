import React from 'react';
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import {useNavigate} from 'react-router-dom';

const transactions = [
    {date: '28 May 2024', type: 'Purchase Record', txnNo: 1, partyName: 'sandeep', amount: '₹1,000'},
    {date: '28 May 2024', type: 'Sales Invoice', txnNo: 3, partyName: 'Cash Sale', amount: '₹200'},
    {date: '28 May 2024', type: 'Sales Invoice', txnNo: 2, partyName: 'Cash Sale', amount: '₹200'},
    {date: '23 May 2024', type: 'Sales Invoice', txnNo: 1, partyName: 'Raju', amount: '₹100'},
    // Add more transactions as needed
];

const AllTransactions = () => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/');
    };
    return (
        <>
            <Button variant="contained" color="primary" onClick={handleBackClick} style={{marginBottom: '10px'}}>
                Back to Dashboard
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{fontWeight: 'bold'}}>Date</TableCell>
                            <TableCell sx={{fontWeight: 'bold'}}>Type</TableCell>
                            <TableCell sx={{fontWeight: 'bold'}}>Txn No</TableCell>
                            <TableCell sx={{fontWeight: 'bold'}}>Party Name</TableCell>
                            <TableCell sx={{fontWeight: 'bold'}}>Amount</TableCell>
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
            </TableContainer>    </>
    );
}

export default AllTransactions;
