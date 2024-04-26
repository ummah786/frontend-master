import { Box, Button, TextField } from "@mui/material";
import Typography from "@mui/joy/Typography";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { StyledTableCell } from "../../commonStyle";
import TableBody from "@mui/material/TableBody";
import * as React from "react";
import { useState } from "react";
import { Close } from '@mui/icons-material';
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import UserRole from "../../jsonfile/Role.json";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import { Transition } from "react-transition-group";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useDispatch, useSelector } from 'react-redux';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const SalesInvoiceCreate = () => {
    const [labelBillTO, setLabelBillTO] = useState('Select Party');
    const [shipToFlag, setShipToFlag] = React.useState(true);
    const [openCategory, setOpenCategory] = React.useState(false);
    const [textFields, setTextFields] = useState(['']);
    const [boxes, setBoxes] = useState([]);
    const [fields, setFields] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [openNotes, setOpenNotes] = useState(false);
    const [openTermCondition, setOpenTermCondition] = useState(false);
    const [textValue, setTextValue] = useState('');
    const [showAddDiscount, setShowAddDiscount] = useState(false);
    const [checked, setChecked] = useState(false);
    const [saleInvoiceDate, setSaleInvoiceDate] = React.useState(dayjs('2024-01-01'));
    const [dueDate, setDueDate] = React.useState(dayjs('2024-01-01'));
    const [billTo, setBillTo] = useState('');
    const [shipTo, setShipTo] = useState('');
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');

    const { partyUser } = useSelector(state => state.partyReducerValue);

    const handleBilltoSHipToo = (event) => {
        setShipTo(event.target.value);
        setBillTo(event.target.value);
        setShipToFlag(false);
        setLabelBillTO("Bill To")
    };

    const handleSHipToo = (event) => {
        setShipTo(event.target.value);
    };

    const handleImageUpload = (event, setImage) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleChangeChecked = (event) => {
        setChecked(event.target.checked);
    };

    const addField = () => {
        setFields([...fields, { key: '', value: '' }]);
    };
    const removeField = (index) => {
        const updatedFields = [...fields];
        updatedFields.splice(index, 1);
        setFields(updatedFields);
    };
    const handleInputChangess = (index, keyOrValue, e) => {
        const updatedFields = [...fields];
        updatedFields[index][keyOrValue] = e.target.value;
        setFields(updatedFields);
        console.log(fields)
    };
    const handleAddDiscount = () => {
        setBoxes([...boxes, { id: Date.now() }]);
    };
    const handleCloseBox = (id) => {
        setBoxes(boxes.filter(box => box.id !== id));
    };
    const handleToggleNotes = () => {
        setOpenNotes(!openNotes);
    };
    const handleToggleTermCondition = () => {
        setOpenTermCondition(!openTermCondition);
    };
    const addTextField = () => {
        setTextFields([...textFields, '']);
    };
    const disableTextField = (index) => {
        const updatedTextFields = [...textFields];
        updatedTextFields[index] = 'Disabled';
        setTextFields(updatedTextFields);
    };
    const addRow = () => {
        //     const newEmployee = {id: employees.length + 1, item: '', quantity: 0, rate: 0, total: 0};
        const newEmployee = { id: employees.length + 1 };
        setEmployees([...employees, newEmployee]);
    };
    const deleteRow = (id) => {
        const updatedEmployees = employees.filter(employee => employee.id !== id);
        setEmployees(updatedEmployees);
    };
    const handleInputChange = (id, key, value) => {
        const updatedEmployees = employees.map(employee => {
            if (employee.id === id) {
                if (key === 'quantity') {
                    employee.total = value * employee.rate;
                    return { ...employee, [key]: value };
                } else if (key === 'rate') {
                    employee.total = value * employee.quantity;
                    return { ...employee, [key]: value };
                } else {
                    return { ...employee, [key]: value };
                }
            }
            return employee;
        });
        setEmployees(updatedEmployees);
    };
    return (
        <>
            <Box sx={{ maxHeight: 300 }}>
                <Box>
                    <Card variant="outlined">
                        <Box sx={{ height: '100px', width: '100px' }}>
                            {
                                image1 ? (
                                    <Box sx={{ display: 'flex', position: 'relative' }}>
                                        <CardMedia
                                            sx={{
                                                height: '90px',
                                                width: '90px',
                                                margin: '10px',
                                                borderStyle: 'dashed',
                                                borderWidth: '2px'
                                            }}
                                            image={image1}
                                            alt="Add Company Logo"
                                        />
                                        <IconButton sx={{
                                            opacity: '0.9',
                                            top: '-1px', color: 'black', backgroundColor: 'white',
                                            marginLeft: '70px', position: 'absolute'
                                        }} onClick={() => setImage1(null)}>
                                            <CloseIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                ) : (
                                    <label htmlFor="image-upload-1">
                                        <Button variant="plain" sx={{
                                            borderStyle: 'dashed',
                                            borderWidth: '2px', textAlign: 'center'
                                        }}
                                            component="span">
                                            Add Company Logo
                                        </Button>
                                    </label>
                                )
                            }
                        </Box>
                        <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="image-upload-1"
                            type="file"
                            onChange={(event) => handleImageUpload(event, setImage1)}
                        />
                    </Card>
                    <Typography>Ummah Hub</Typography>
                </Box>
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{
                        width: '60%', borderStyle: 'dashed',
                        borderWidth: '1px'
                    }}>
                        <Box sx={{
                            display: 'flex'
                        }}>
                            <Box sx={{
                                width: '50%', display: 'flex', justifyContent: 'space-between'
                            }}>
                                <TextField
                                    select
                                    fullWidth={true}
                                    sx={{ margin: '10px' }}
                                    label={labelBillTO}
                                    variant="outlined"
                                    margin="normal"
                                    onChange={(event) => handleBilltoSHipToo(event)}
                                >
                                    {
                                        partyUser.map(indi => (
                                            <MenuItem key={indi.id}
                                                value={indi}>{indi.pname}  - {indi.company}</MenuItem>))
                                    }
                                </TextField>
                            </Box>
                            <Box sx={{
                                width: '50%', display: 'flex', justifyContent: 'space-between'
                            }}>
                                <TextField
                                    select
                                    fullWidth={true}
                                    sx={{ margin: '10px' }}
                                    label="Ship To"
                                    variant="outlined"
                                    margin="normal"
                                    disabled={shipToFlag}
                                    onChange={(event) => handleSHipToo(event)}
                                >
                                    <MenuItem onClick={() => setOpenCategory(true)}>Change Shipping Address</MenuItem>
                                    {
                                        partyUser.map(indi => (
                                            <MenuItem key={indi.id}
                                                value={indi}>{indi.pname}  - {indi.company}</MenuItem>))
                                    }
                                </TextField>
                            </Box>
                            <Transition in={openCategory} timeout={400}>
                                <Modal
                                    open={openCategory}
                                    onClose={() => setOpenCategory(false)}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                >
                                    <Box sx={style}>
                                        <Box
                                            sx={{
                                                marginTop: 8,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Box sx={{ display: 'flex' }}>
                                                <Typography component="h1" variant="h5">
                                                    Edit Shipping Address
                                                </Typography>
                                                <ModalClose variant="plain" sx={{ m: 1 }} />
                                            </Box>
                                            <Box component="form" noValidate sx={{ mt: 1 }}>
                                                <Box>
                                                    <TextField
                                                        margin="normal"
                                                        required
                                                        fullWidth
                                                        id="Street Address *"
                                                        label="Street Address *"
                                                        name="Street Address *"
                                                        autoComplete="Street Address *"
                                                        autoFocus
                                                    />
                                                </Box>
                                                <Box sx={{ display: 'flex' }}>
                                                    <TextField
                                                        select
                                                        fullWidth={true}
                                                        sx={{ margin: '10px' }}
                                                        label="State"
                                                        variant="outlined"
                                                        margin="normal"
                                                        onChange={(event) => handleBilltoSHipToo(event)}
                                                    >
                                                        {
                                                            UserRole.india.map(indi => (
                                                                <MenuItem key={indi.name}
                                                                    value={indi.name}>{indi.name}</MenuItem>))
                                                        }
                                                    </TextField>
                                                    <TextField
                                                        margin="normal"
                                                        required
                                                        id="Pin Code *"
                                                        label="Pin Code *"
                                                        name="Pin Code *"
                                                        autoComplete="Pin Code *"
                                                        autoFocus
                                                    />
                                                </Box>
                                                <Box>
                                                    <TextField
                                                        margin="normal"
                                                        required
                                                        fullWidth
                                                        id="City*"
                                                        label="City*"
                                                        name="City*"
                                                        autoComplete="City*"
                                                        autoFocus
                                                    />
                                                </Box>
                                                <Button
                                                    type="submit"
                                                    fullWidth
                                                    variant="contained"
                                                    sx={{ mt: 3, mb: 2, color: "whitesmoke", background: '#212121' }}
                                                >
                                                    Submit
                                                </Button>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Modal>
                            </Transition>
                        </Box>
                        <Box sx={{ display: 'flex' }}>
                            <Box sx={{
                                width: '50%'
                            }}>
                                <Box sx={{ margin: '5px' }}>
                                    <label style={{ fontSize: '12px' }}>Address :- <strong>{billTo.billingAddress}</strong></label>
                                </Box> <Box sx={{ margin: '5px' }}>
                                    <label style={{ fontSize: '12px' }}>Phone :-  {billTo.mobileNumber}</label>
                                </Box>
                                <Box sx={{ margin: '5px' }}>
                                    <label style={{ fontSize: '12px' }}>GST :-  {billTo.gstNumber}</label>
                                </Box>
                            </Box>
                            <Box sx={{
                                width: '50%'
                            }}>
                                <Box sx={{ margin: '10px' }}>
                                    <label style={{ fontSize: '12px' }}>Address :- <strong>{shipTo.shippingAddress}</strong></label>
                                </Box> <Box sx={{ margin: '10px' }}>
                                    <label style={{ fontSize: '12px' }}>Phone :- {shipTo.mobileNumber}</label>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{
                        width: '40%', borderStyle: 'dashed',
                        borderWidth: '2px'
                    }}>
                        <Box sx={{ display: 'flex' }}>
                            <Box sx={{ width: '50%', margin: '10px' }}>
                                <TextField
                                    label="Sales Invoice No: "
                                /*       value={employee.itemName}
                                       onChange={(e) => handleInputChange(employee.id, 'itemName', e.target.value)}*/
                                />
                            </Box>
                            <Box sx={{ width: '50%', margin: '10px' }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker', 'DatePicker']}>
                                        <DatePicker
                                            label="Sales Invoice Date:"
                                            value={saleInvoiceDate}
                                            onChange={(newValue) => setSaleInvoiceDate(newValue)}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex' }}>
                            <Box sx={{ width: '50%', margin: '10px' }}>
                                <TextField
                                    label="Payment Terms: "
                                /* value={employee.itemName}
                                 onChange={(e) => handleInputChange(employee.id, 'itemName', e.target.value)}*/
                                />
                            </Box>
                            <Box sx={{ width: '50%', margin: '10px' }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker', 'DatePicker']}>
                                        <DatePicker
                                            label="Due Date:"
                                            value={dueDate}
                                            onChange={(newValue) => setDueDate(newValue)}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 1250 }} aria-label="customized table" stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">NO</StyledTableCell>
                                    <StyledTableCell align="center">ITEMS</StyledTableCell>
                                    <StyledTableCell align="center">HSN</StyledTableCell>
                                    <StyledTableCell align="center">BATCH NO.</StyledTableCell>
                                    <StyledTableCell align="center">EXP. DATE</StyledTableCell>
                                    <StyledTableCell align="center"> MFG DATE</StyledTableCell>
                                    <StyledTableCell align="center"> QTY</StyledTableCell>
                                    <StyledTableCell align="center"> PRICE/ITEM (₹)</StyledTableCell>
                                    <StyledTableCell align="center"> DISCOUNT</StyledTableCell>
                                    <StyledTableCell align="center"> TAX</StyledTableCell>
                                    <StyledTableCell align="center"> AMOUNT (₹)</StyledTableCell>
                                    <StyledTableCell align="center">Actions</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {employees.map(employee => (
                                    <TableRow key={employee.id}><StyledTableCell align="center">
                                        <TextField
                                            value={employee.itemName}
                                            onChange={(e) => handleInputChange(employee.id, 'itemName', e.target.value)}
                                        />
                                    </StyledTableCell><StyledTableCell align="center">
                                            <TextField
                                                value={employee.itemName}
                                                onChange={(e) => handleInputChange(employee.id, 'itemName', e.target.value)}
                                            />
                                        </StyledTableCell><StyledTableCell align="center">
                                            <TextField
                                                value={employee.itemName}
                                                onChange={(e) => handleInputChange(employee.id, 'itemName', e.target.value)}
                                            />
                                        </StyledTableCell><StyledTableCell align="center">
                                            <TextField
                                                value={employee.itemName}
                                                onChange={(e) => handleInputChange(employee.id, 'itemName', e.target.value)}
                                            />
                                        </StyledTableCell><StyledTableCell align="center">
                                            <TextField
                                                value={employee.itemName}
                                                onChange={(e) => handleInputChange(employee.id, 'itemName', e.target.value)}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <TextField
                                                value={employee.itemName}
                                                onChange={(e) => handleInputChange(employee.id, 'itemName', e.target.value)}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <TextField
                                                value={employee.quantity}
                                                onChange={(e) => handleInputChange(employee.id, 'quantity', e.target.value)}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <TextField
                                                value={employee.rate}
                                                onChange={(e) => handleInputChange(employee.id, 'rate', e.target.value)}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <TextField
                                                value={employee.rate}
                                                onChange={(e) => handleInputChange(employee.id, 'rate', e.target.value)}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <TextField
                                                value={employee.rate}
                                                onChange={(e) => handleInputChange(employee.id, 'rate', e.target.value)}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <TextField
                                                value={employee.total}
                                            //   onChange={(e) => handleInputChange(employee.id, 'total', employee.quantity * employee.rate)}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Button onClick={() => deleteRow(employee.id)}>Delete</Button>
                                        </StyledTableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <Button onClick={addRow} sx={{
                            borderStyle: 'dashed',
                            borderWidth: '2px'
                        }}>Add Row</Button>
                        <Table sx={{ minWidth: 1250 }} aria-label="customized table" stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center" style={{ color: 'black' }}>1</StyledTableCell>
                                    <StyledTableCell align="center" style={{ color: 'black' }}>1</StyledTableCell>
                                    <StyledTableCell align="center" style={{ color: 'black' }}>1</StyledTableCell>
                                    <StyledTableCell align="center" style={{ color: 'black' }}>1</StyledTableCell>
                                    <StyledTableCell align="center" style={{ color: 'black' }}>1</StyledTableCell>
                                    <StyledTableCell align="center" style={{ color: 'black' }}>1</StyledTableCell>
                                    <StyledTableCell align="center" style={{ color: 'black' }}>1</StyledTableCell>
                                    <StyledTableCell align="center" style={{ color: 'black' }}>1</StyledTableCell>
                                    <StyledTableCell align="center">SUBTOTAL</StyledTableCell>
                                    <StyledTableCell align="center">(₹)</StyledTableCell>
                                    <StyledTableCell align="center">(₹)</StyledTableCell>
                                    <StyledTableCell align="center">(₹)</StyledTableCell>
                                    <StyledTableCell align="center" style={{ color: 'black' }}>1</StyledTableCell>
                                </TableRow>
                            </TableHead>
                        </Table>
                    </TableContainer>
                </Box>
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ width: '50%' }}>
                        <Box sx={{ padding: '10px' }}>
                            <Button onClick={handleToggleNotes} variant="contained" color="primary">
                                +Add Notes
                            </Button>
                            {openNotes && (
                                <Box sx={{ display: 'flex', padding: '10px' }}>
                                    <TextField label="Enter Notes" variant="outlined" fullWidth={true} />
                                    <IconButton onClick={handleToggleNotes}>
                                        <Close />
                                    </IconButton>
                                </Box>
                            )}
                        </Box>
                        <Box sx={{ padding: '10px' }}>
                            <Button onClick={handleToggleTermCondition} variant="contained" color="primary">
                                +Terms and Conditions
                            </Button>
                            {openTermCondition && (
                                <Box sx={{ display: 'flex', padding: '10px' }}>
                                    <TextField label="Enter Terms & Conditions" variant="outlined" fullWidth={true} />
                                    <IconButton onClick={handleToggleTermCondition}>
                                        <Close />
                                    </IconButton>
                                </Box>
                            )
                            }{
                                !openTermCondition && (
                                    <Box sx={{ padding: '10px' }}>
                                        <Typography>1. Goods once sold will not be taken back or exchanged </Typography>
                                        <Typography>2. All disputes are subject to [ENTER_YOUR_CITY_NAME] jurisdiction
                                            only</Typography>
                                    </Box>
                                )
                            }
                        </Box>
                    </Box>
                    <Box sx={{ width: '50%' }}>
                        {/*                        <Box>
                            <Button variant="contained" onClick={handleAddDiscount}>
                                Add Additional Charges
                            </Button>
                            {boxes.map((box, index) => (
                                <Box key={box.id} mt={2} p={2} border={1} display="flex" alignItems="center">
                                    <TextField label="Enter Text" fullWidth/>
                                    <IconButton onClick={() => handleCloseBox(box.id)}>
                                        <CloseIcon/>
                                    </IconButton>
                                </Box>
                            ))}
                        </Box>*/}
                        <Box>
                            <Box sx={{ padding: '10px' }}>
                                <Button variant="contained" onClick={addField}> Add Additional Charges</Button>
                                {fields.map((field, index) => (
                                    <Box key={index} sx={{ marginTop: 2, display: 'flex', alignItems: 'center' }}>
                                        <Box sx={{ width: '65%' }}>
                                            <TextField
                                                label="Enter Charges (ex.Transport Charge)"
                                                value={field.key}
                                                onChange={(e) => handleInputChangess(index, 'key', e)}
                                                disabled={field.disabled}
                                                sx={{ marginRight: 1 }}
                                            />
                                        </Box> <Box sx={{ width: '25%' }}>
                                            <TextField
                                                label=" ₹ "
                                                value={field.value}
                                                onChange={(e) => handleInputChangess(index, 'value', e)}
                                                disabled={field.disabled}
                                                inputProps={{ inputMode: 'decimal', pattern: '[0-9]*[.,]?[0-9]*' }}
                                                type="number"
                                                sx={{ marginRight: 1 }}
                                            /> </Box> <Box sx={{ width: '10%' }}>
                                            <IconButton onClick={() => removeField(index)} disabled={field.disabled}>
                                                <CloseIcon />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                ))}
                                {fields.length === 0}
                            </Box>
                            <Box sx={{ padding: '10px', display: 'flex' }}>
                                <Box sx={{ width: '65%' }}>
                                    <Typography>Taxable Amount</Typography>
                                </Box> <Box sx={{ width: '25%' }}>
                                    <TextField
                                        label=" ₹ "
                                        inputProps={{ inputMode: 'decimal', pattern: '[0-9]*[.,]?[0-9]*' }}
                                        type="number"
                                        sx={{ marginRight: 1 }}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ padding: '10px' }}>
                                <Button variant="contained" onClick={() => setShowAddDiscount(!showAddDiscount)}>+ Add
                                    Discount</Button>
                                {showAddDiscount ? (
                                    <Box sx={{ marginTop: 2, display: 'flex', alignItems: 'center' }}>
                                        <Box sx={{ width: '65%' }}>
                                            <TextField
                                                label="Taxable Amount"
                                                value="Taxable Amount"
                                                sx={{ marginRight: 1 }}
                                            />
                                        </Box>
                                        <Box sx={{ width: '25%' }}>
                                            <TextField
                                                label=" ₹ "
                                                value={textValue}
                                                onChange={(e) => setTextValue(e.target.value)}
                                                inputProps={{ inputMode: 'decimal', pattern: '[0-9]*[.,]?[0-9]*' }}
                                                type="number"
                                                sx={{ marginRight: 1 }}
                                            /></Box>
                                        <Box sx={{ width: '10%' }}>
                                            <IconButton onClick={() => {
                                                setShowAddDiscount(!showAddDiscount);
                                                setTextValue(0);
                                            }}>
                                                <CloseIcon />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                ) : (
                                    <Box></Box>
                                )}
                            </Box>

                        </Box>
                        <Box>
                            <Box sx={{ padding: '10px', display: 'flex' }}>
                                <Box sx={{ width: '65%' }}>
                                    <FormControlLabel
                                        control={<Checkbox checked={checked} onChange={handleChangeChecked} />}
                                        label="Auto Round Off"
                                    />
                                </Box>
                                <Box sx={{ width: '25%' }}>
                                    <TextField
                                        label=" ₹ "
                                        inputProps={{ inputMode: 'decimal', pattern: '[0-9]*[.,]?[0-9]*' }}
                                        type="number"
                                        sx={{ marginRight: 1 }}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ padding: '10px', display: 'flex' }} variant="outlined">
                                <Box sx={{ width: '65%' }}>
                                    <Typography>Total Amount</Typography>
                                </Box>
                                <Box sx={{ width: '25%' }}>
                                    <TextField
                                        label=" Enter Payment Amount "
                                        inputProps={{ inputMode: 'decimal', pattern: '[0-9]*[.,]?[0-9]*' }}
                                        type="number"
                                        sx={{ marginRight: 1 }}
                                    />
                                </Box>
                            </Box>
                        </Box>

                        <Box>

                            <Box sx={{ padding: '10px', display: 'flex' }}>
                                <Box sx={{ width: '65%' }}>
                                    <FormControlLabel
                                        control={<Checkbox checked={checked} onChange={handleChangeChecked} />}
                                        label="Marked As Fully Paid"
                                    />
                                </Box>
                                <Box sx={{ width: '25%' }}>
                                </Box>
                            </Box>
                            <Box sx={{
                                padding: '10px', display: 'flex', borderStyle: 'dashed',
                                borderWidth: '2px'
                            }}>
                                <Box sx={{ width: '65%' }}>
                                    <Typography>Amount Received</Typography>
                                </Box>
                                <Box sx={{ width: '35%', display: 'flex' }}>
                                    <TextField
                                        label=" ₹  "
                                        inputProps={{ inputMode: 'decimal', pattern: '[0-9]*[.,]?[0-9]*' }}
                                        type="number"
                                        sx={{ marginRight: 1 }}
                                    />
                                    <TextField
                                        fullWidth
                                        select
                                        label="Mode"
                                        variant="outlined"
                                        sx={{ marginRight: 1 }}
                                    >
                                        {
                                            UserRole.paymentMode.map(userrole => (
                                                <MenuItem key={userrole.name}
                                                    value={userrole.name}>{userrole.name}</MenuItem>
                                            ))
                                        }
                                    </TextField>

                                </Box>
                            </Box>

                        </Box>
                        <Box>
                            <Box sx={{ padding: '10px', display: 'flex' }}>
                                <Box sx={{ width: '65%' }}>
                                    <Typography>Balance Amount</Typography>
                                </Box>
                                <Box sx={{ width: '25%' }}>
                                    <TextField
                                        label=" ₹  "
                                        inputProps={{ inputMode: 'decimal', pattern: '[0-9]*[.,]?[0-9]*' }}
                                        type="number"
                                        sx={{ marginRight: 1 }}
                                    />
                                </Box>
                            </Box>
                        </Box>
                        <Box>
                            <Card variant="outlined">
                                <Box
                                >
                                    {
                                        image2 ? (
                                            <Box sx={{ display: 'flex', position: 'relative' }}>
                                                <CardMedia
                                                    sx={{
                                                        height: '90px',
                                                        width: '90px',
                                                        margin: '10px',
                                                        borderStyle: 'dashed',
                                                        borderWidth: '2px'
                                                    }}
                                                    image={image2}
                                                    alt="Upload Signature"
                                                />
                                                <IconButton onClick={() => setImage2('')} sx={{
                                                    opacity: '0.8',
                                                    top: '0px', color: 'black', backgroundColor: 'white',
                                                    marginLeft: '75px', position: 'absolute'
                                                }}>
                                                    <CloseIcon />
                                                </IconButton>
                                            </Box>

                                        ) : (
                                            <label htmlFor="image-upload-2">
                                                <Button variant="plain" component="span" sx={{
                                                    borderStyle: 'dashed',
                                                    borderWidth: '2px'
                                                }}>
                                                    Upload Signature
                                                </Button>
                                            </label>
                                        )
                                    }
                                </Box>
                                <input
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    id="image-upload-2"
                                    type="file"
                                    onChange={(event) => handleImageUpload(event, setImage2)}
                                />
                            </Card>
                        </Box>
                    </Box>
                </Box>

            </Box>
        </>
    )
}