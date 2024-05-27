import {AddBankAccountForm} from './AddBankAccountForm';
import React, {useState} from 'react';
import {
    Box,
    Button,
    Container,
    FormControl,
    Grid,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import {Download as DownloadIcon, Share as ShareIcon, Visibility as VisibilityIcon} from '@mui/icons-material';

const transactions = [
    {
        date: '27 May 2024',
        type: 'Add Money',
        txnNo: 2,
        party: '-',
        mode: 'Bank',
        paid: '-',
        received: '₹100',
        balance: '₹1,00,100'
    }
];

export const CashAndBank = () => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [dateRange, setDateRange] = useState('');

    const handleDateChange = (event) => {
        setDateRange(event.target.value);
    };

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

            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Typography variant="h6">Total Balance: ₹1,00,100</Typography>
                    <Typography>Cash in hand: ₹0</Typography>
                    <Typography>Bank Accounts</Typography>
                    <Box display="flex" alignItems="center" mt={1} mb={1}>
                        <Box sx={{display: 'flex', alignItems: 'center', mr: 1}}>
                            <Box component="span" sx={{display: 'flex', alignItems: 'center', pr: 1}}>
                                <Typography variant="body2">SBI</Typography>
                            </Box>
                            <Typography variant="body2">Deactivated</Typography>
                        </Box>
                        <Typography>329392432</Typography>
                        <Typography>₹1,00,100</Typography>
                    </Box>
                    <Button variant="contained" sx={{mt: 1}}>+ Add New Bank</Button>
                </Grid>

                <Grid item xs={9}>
                    <Box mb={2}>
                        <Typography variant="h6">Account Holder's Name: sardar asif jahan</Typography>
                        <Typography>Account Name: SBI <Button variant="outlined" size="small" color="secondary"
                                                              sx={{ml: 1}}>Deactivated</Button></Typography>
                        <Typography>Account Number: 329392432</Typography>
                        <Typography>IFSC Code: SBIN0001235</Typography>
                        <Typography>Bank & Branch: State Bank of India, PHUSRO BAZAR</Typography>
                        <Button variant="outlined" startIcon={<VisibilityIcon/>} sx={{mt: 1}}>Reactivate
                            Account</Button>
                        <Button variant="outlined" startIcon={<ShareIcon/>} sx={{mt: 1, ml: 1}}>Share Bank
                            Details</Button>
                        <Button variant="outlined" startIcon={<DownloadIcon/>} sx={{mt: 1, ml: 1}}>Download
                            Statement</Button>
                    </Box>

                    <FormControl fullWidth sx={{mb: 2}}>
                        <Select value={dateRange} onChange={handleDateChange}>
                            <MenuItem value="today">Today</MenuItem>
                            <MenuItem value="yesterday">Yesterday</MenuItem>
                            <MenuItem value="thisWeek">This Week</MenuItem>
                            <MenuItem value="lastWeek">Last Week</MenuItem>
                            <MenuItem value="last7Days">Last 7 Days</MenuItem>
                            <MenuItem value="thisMonth">This Month</MenuItem>
                            <MenuItem value="previousMonth">Previous Month</MenuItem>
                        </Select>
                    </FormControl>

                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Txn No</TableCell>
                                    <TableCell>Party</TableCell>
                                    <TableCell>Mode</TableCell>
                                    <TableCell>Paid</TableCell>
                                    <TableCell>Received</TableCell>
                                    <TableCell>Balance</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {transactions.map((txn, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{txn.date}</TableCell>
                                        <TableCell>{txn.type}</TableCell>
                                        <TableCell>{txn.txnNo}</TableCell>
                                        <TableCell>{txn.party}</TableCell>
                                        <TableCell>{txn.mode}</TableCell>
                                        <TableCell>{txn.paid}</TableCell>
                                        <TableCell>{txn.received}</TableCell>
                                        <TableCell>{txn.balance}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Container>
    );
};