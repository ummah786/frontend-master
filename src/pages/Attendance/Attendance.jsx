import React, {useState} from 'react';
import {
    Box,
    Button,
    Divider,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    Menu,
    MenuItem,
    Modal,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';


const staffData = [
    {
        name: 'rajus',
        mobile: '7209848644',
        lastMonthDue: '-',
        balance: '₹454',
        balanceType: 'increase',
    },
    {
        name: 'khan sir',
        mobile: '3324354667',
        lastMonthDue: '-',
        balance: '₹4,385',
        balanceType: 'increase',
    },
];

const Attendance = () => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [salaryPayoutType, setSalaryPayoutType] = useState('Monthly');
    const [salary, setSalary] = useState('');
    const [salaryCycle, setSalaryCycle] = useState('10 to 10 Every month');
    const [outstandingOpening, setOutstandingOpening] = useState('0');
    const [paymentType, setPaymentType] = useState('To Pay');

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{flexGrow: 1, padding: 4}}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5">Staff Attendance & Payroll</Typography>
                <Box>
                    <Button variant="outlined" startIcon={<SettingsIcon/>}>
                        Attendance Settings
                    </Button>
                    <Button variant="contained" startIcon={<AddIcon/>} sx={{ml: 2}} color="primary"
                            onClick={handleOpen}>
                        + Add Staff
                    </Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="add-staff-modal-title"
                        aria-describedby="add-staff-modal-description"
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: 400,
                                bgcolor: 'background.paper',
                                boxShadow: 24,
                                p: 4,
                                borderRadius: 2,
                            }}
                        >
                            <Typography id="add-staff-modal-title" variant="h6" component="h2">
                                Add Staff
                            </Typography>
                            <TextField
                                label="Name"
                                fullWidth
                                margin="normal"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <TextField
                                label="Mobile Number"
                                fullWidth
                                margin="normal"
                                required
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                            />
                            <FormControl fullWidth margin="normal" required>
                                <InputLabel>Salary Payout Type</InputLabel>
                                <Select
                                    value={salaryPayoutType}
                                    onChange={(e) => setSalaryPayoutType(e.target.value)}
                                    label="Salary Payout Type"
                                >
                                    <MenuItem value="Monthly">Monthly</MenuItem>
                                    <MenuItem value="Weekly">Weekly</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                label="Salary"
                                fullWidth
                                margin="normal"
                                required
                                value={salary}
                                onChange={(e) => setSalary(e.target.value)}
                                InputProps={{
                                    startAdornment: <span style={{marginRight: 5}}>₹</span>,
                                }}
                            />
                            <FormControl fullWidth margin="normal" required>
                                <InputLabel>Salary Cycle</InputLabel>
                                <Select
                                    value={salaryCycle}
                                    onChange={(e) => setSalaryCycle(e.target.value)}
                                    label="Salary Cycle"
                                >
                                    <MenuItem value="10 to 10 Every month">10 to 10 Every month</MenuItem>
                                    <MenuItem value="1 to 30 Every month">1 to 30 Every month</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                label="Outstanding/Opening"
                                fullWidth
                                margin="normal"
                                required
                                value={outstandingOpening}
                                onChange={(e) => setOutstandingOpening(e.target.value)}
                                InputProps={{
                                    startAdornment: <span style={{marginRight: 5}}>₹</span>,
                                }}
                            />
                            <FormControl fullWidth margin="normal" required>
                                <InputLabel>Payment Type</InputLabel>
                                <Select
                                    value={paymentType}
                                    onChange={(e) => setPaymentType(e.target.value)}
                                    label="Payment Type"
                                >
                                    <MenuItem value="To Collect">To Collect</MenuItem>
                                    <MenuItem value="To Pay">To Pay</MenuItem>
                                </Select>
                            </FormControl>
                            <Box display="flex" justifyContent="space-between" mt={2}>
                                <Button onClick={handleClose} color="secondary">
                                    Cancel
                                </Button>
                                <Button variant="contained" color="primary">
                                    Save
                                </Button>
                            </Box>
                        </Box>
                    </Modal>
                </Box>
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="subtitle1">Tue, 04 Jun 2024</Typography>
                <Box>
                    <Button variant="outlined">{'<'} Today: Tue, 04 Jun 2024 {'>'}</Button>
                </Box>
            </Box>
            <Divider/>
            <Grid container spacing={2} mt={2}>
                <Grid item xs={2}>
                    <Typography>Present (P)</Typography>
                    <Typography variant="h6">0</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography>Absent (A)</Typography>
                    <Typography variant="h6">1</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography>Half day (HD)</Typography>
                    <Typography variant="h6">0</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography>Paid Leave (PL)</Typography>
                    <Typography variant="h6">0</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography>Weekly off (WO)</Typography>
                    <Typography variant="h6">1</Typography>
                </Grid>
            </Grid>
            <TableContainer component={Paper} sx={{mt: 2}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Staff Name</TableCell>
                            <TableCell>Mobile Number</TableCell>
                            <TableCell>Last Month Due</TableCell>
                            <TableCell>Balance</TableCell>
                            <TableCell>Mark Attendance</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {staffData.map((staff, index) => (
                            <TableRow key={index}>
                                <TableCell>{staff.name}</TableCell>
                                <TableCell>{staff.mobile}</TableCell>
                                <TableCell>{staff.lastMonthDue}</TableCell>
                                <TableCell>
                                    <Typography color={staff.balanceType === 'increase' ? 'error' : 'primary'}>
                                        {staff.balanceType === 'increase' ? '↑' : '↓'} {staff.balance}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Button variant="contained" color="success" sx={{mr: 1}}>
                                        P
                                    </Button>
                                    <Button variant="outlined" color="error" sx={{mr: 1}}>
                                        A
                                    </Button>
                                    <Button variant="outlined" sx={{mr: 1}}>
                                        WO
                                    </Button>
                                    <IconButton onClick={handleMenuClick}>
                                        <MoreVertIcon/>
                                    </IconButton>
                                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                                        <MenuItem onClick={handleMenuClose}>Half day</MenuItem>
                                        <MenuItem onClick={handleMenuClose}>Paid leave</MenuItem>
                                        <MenuItem onClick={handleMenuClose}>Week off</MenuItem>
                                        <MenuItem onClick={handleMenuClose}>Add overtime</MenuItem>
                                    </Menu>
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell colSpan={3}>
                                <Typography>Pending amount</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography>₹0</Typography>
                                <Typography color="error">↑ ₹4,839</Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default Attendance;
