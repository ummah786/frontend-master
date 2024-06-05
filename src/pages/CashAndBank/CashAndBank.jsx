import React, {useState} from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import {AddBankAccountForm} from './AddBankAccountForm'; // Adjust the path as needed

const dateRanges = {
    today: [new Date(), new Date()],
    yesterday: [new Date(new Date().setDate(new Date().getDate() - 1)), new Date(new Date().setDate(new Date().getDate() - 1))],
    thisWeek: [new Date(new Date().setDate(new Date().getDate() - new Date().getDay())), new Date()],
    lastWeek: [
        new Date(new Date().setDate(new Date().getDate() - new Date().getDay() - 7)),
        new Date(new Date().setDate(new Date().getDate() - new Date().getDay() - 1))
    ],
    last7Days: [new Date(new Date().setDate(new Date().getDate() - 6)), new Date()],
    thisMonth: [new Date(new Date().getFullYear(), new Date().getMonth(), 1), new Date()],
    previousMonth: [
        new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
        new Date(new Date().getFullYear(), new Date().getMonth(), 0)
    ]
};

const bankAccounts = {
    Unlinked: {
        accountHolder: 'Unknown',
        accountName: 'Unlinked Transactions',
        accountNumber: '000000000',
        ifscCode: 'UNL0000000',
        bankBranch: 'Unknown',
        balance: '₹48',
        transactions: [{
            date: '26 May 2024',
            type: 'Withdrawal',
            txnNo: 1,
            party: 'Bank',
            mode: 'Bank',
            paid: '₹500',
            received: '-',
            balance: '₹5,555'
        },
        ]
    },
    SBI: {
        accountHolder: 'Sardar Asif Jahan',
        accountName: 'SBI SARDAR ASIFJ',
        accountNumber: '353656',
        ifscCode: 'SBI903230000000',
        bankBranch: 'PHusro',
        balance: '₹88',
        transactions: [{
            date: '26 May 2024',
            type: 'Withdrawal',
            txnNo: 1,
            party: 'Bank',
            mode: 'Bank',
            paid: '₹500',
            received: '-',
            balance: '₹5,555'
        },
            {
                date: '26 May 2024',
                type: 'Withdrawal',
                txnNo: 1,
                party: 'Bank',
                mode: 'Bank',
                paid: '₹500',
                received: '-',
                balance: '₹5,555'
            },
        ]
    },
    // Add more bank accounts here
};

export const CashAndBank = () => {
    const [open, setOpen] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState('Unlinked');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAccountClick = (account) => {
        setSelectedAccount(account);
    };

    const account = bankAccounts[selectedAccount];

    return (
        <Container>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5">Cash and Bank</Typography>
                <Box>
                    <Button variant="outlined" sx={{ml: 1}}>Add/Reduce Money</Button>
                    <Button variant="outlined" sx={{ml: 1}}>Transfer Money</Button>
                    <Button variant="contained" color="primary" onClick={handleClickOpen} sx={{ml: 1}}>
                        + Add New Account
                    </Button>
                    <AddBankAccountForm open={open} handleClose={handleClose}/>
                </Box>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5">Total Balance:</Typography>
                            <Typography variant="h4">₹3,381.75</Typography>
                        </CardContent>
                    </Card>
                    <Card style={{marginTop: 16}}>
                        <CardContent>
                            <Typography variant="h6">Cash</Typography>
                            <Typography>Cash in hand: ₹3,333.75</Typography>
                        </CardContent>
                    </Card>

                    <CardContent>
                        <Typography variant="h6">Bank Accounts</Typography>
                        {Object.keys(bankAccounts).map((key) => (
                            <Card style={{marginTop: 16}}>
                                <Button
                                    key={key}
                                    onClick={() => handleAccountClick(key)}
                                    fullWidth
                                    style={{marginBottom: 8}}
                                >
                                    {bankAccounts[key].accountName}: {bankAccounts[key].balance}
                                </Button> </Card>
                        ))}
                    </CardContent>

                    <Button variant="contained" color="primary" style={{marginTop: 16}}>Add New Bank</Button>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5">Account Details</Typography>
                            <Typography>Account Holder's Name: {account.accountHolder}</Typography>
                            <Typography>Account Name: {account.accountName}</Typography>
                            <Typography>Account Number: {account.accountNumber}</Typography>
                            <Typography>IFSC Code: {account.ifscCode}</Typography>
                            <Typography>Bank & Branch: {account.bankBranch}</Typography>
                            <Button variant="outlined" color="primary" style={{marginTop: 16}}>Reactivate
                                Account</Button>
                            <Button variant="outlined" color="secondary" style={{marginTop: 16, marginLeft: 16}}>Share
                                Bank Details</Button>
                            <Button variant="outlined" style={{marginTop: 16, marginLeft: 16}}>Download
                                Statement</Button>
                        </CardContent>
                    </Card>
                    <Card style={{marginTop: 16}}>
                        <CardContent>
                            <Typography variant="h6">Transactions</Typography>
                            <TableContainer component={Paper} style={{marginTop: 16}}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Date</TableCell>
                                            <TableCell>Type</TableCell>
                                            <TableCell>TXN NO</TableCell>
                                            <TableCell>Party</TableCell>
                                            <TableCell>Mode</TableCell>
                                            <TableCell>Paid</TableCell>
                                            <TableCell>Received</TableCell>
                                            <TableCell>Balance</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {account.transactions.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={8} align="center">
                                                    No transactions found
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            account.transactions.map((row, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{row.date}</TableCell>
                                                    <TableCell>{row.type}</TableCell>
                                                    <TableCell>{row.txnNo}</TableCell>
                                                    <TableCell>{row.party}</TableCell>
                                                    <TableCell>{row.mode}</TableCell>
                                                    <TableCell>{row.paid}</TableCell>
                                                    <TableCell>{row.received}</TableCell>
                                                    <TableCell>{row.balance}</TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};
