import { Box, Button, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import Typography from "@mui/joy/Typography";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import * as React from "react";
import { useState } from "react";
import { Close } from '@mui/icons-material';
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@material-ui/icons/Search';
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
import TableCell from '@mui/material/TableCell';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { Search, SearchIconWrapper, StyledInputBase, StyledTableCell, StyledTableRow } from "../../commonStyle";
import axios from "axios";
import { SAVE_ADDRESS } from "../apiendpoint/APIEndPoint";
import ButtonGroup from '@mui/material/ButtonGroup';
import { useEffect } from "react";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 1,
};

export const SalesInvoiceCreate = () => {

    const [openItemModal, setOpenItemModal] = React.useState(false);
    const [onSelectOfShipTo, setOnSelectOfShipTo] = React.useState(null);
    const [editOpen, setEditOpen] = React.useState(false);
    const [shipToAddress, setShipToAddress] = useState('');
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
    const [checkedMark, setCheckedMark] = useState(false);
    const [saleInvoiceDate, setSaleInvoiceDate] = React.useState(dayjs('2024-01-01'));
    const [dueDate, setDueDate] = React.useState(dayjs('2024-01-01'));
    const [billTo, setBillTo] = useState('');
    const [shipTo, setShipTo] = useState('');
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');
    const [selectedRows, setSelectedRows] = useState([]);

    const { partyUser } = useSelector(state => state.partyReducerValue);
    const { inventoryUser } = useSelector(state => state.inventoryReducerValue);
    const loginData = useSelector(state => state.loginReducerValue);
    const [inventorys, setInventorys] = useState([]);

    useEffect(() => {
        setInventorys(inventoryUser.map((inventory) => {
            return {
                ...inventory, quantity: 1, discount: 0
            }
        }));
        console.log("Inventory >>  " + inventorys)

    }, [inventoryUser])

    const increaseSalary = (id) => {
        const updatedEmployees = inventorys.map(emp => {
            if (emp.id === id) {
                return { ...emp, quantity: emp.quantity + 1 };
            }
            return emp;
        });
        setInventorys(updatedEmployees);
    };

    const decreaseSalary = (id) => {
        const updatedEmployees = inventorys.map(emp => {
            if (emp.id === id) {
                return { ...emp, quantity: emp.quantity - 1 };
            }
            return emp;
        });
        setInventorys(updatedEmployees);
    };



    const handleCheckboxClick = (id) => {
        const selectedIndex = selectedRows.indexOf(id);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selectedRows, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selectedRows.slice(1));
        } else if (selectedIndex === selectedRows.length - 1) {
            newSelected = newSelected.concat(selectedRows.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selectedRows.slice(0, selectedIndex),
                selectedRows.slice(selectedIndex + 1)
            );
        }
        setSelectedRows(newSelected);
    };

    const handleSubmitForItemSelect = (e) => {
        //handle for Item select from modal
        e.preventDefault();
        const selectedRowsValues = selectedRows.map(item => findMatchingObject(item, inventorys));
        updateTotal(selectedRowsValues);
        setOpenItemModal(false);
    }


    // Function to calculate total salary based on rate
    const calculateTotal = (item) => {
        return item.quantity * item.salePrice - item.discount - item.quantity * item.salePrice * item.gst / 100;
    };

    // Function to update total salary for a specific employee
    const updateTotal = (employeess) => {
        console.log("Employee     " + employees);
        const updatedEmployees = employeess.map((employee) => {
            return { ...employee, total: calculateTotal(employee) };
        });
        setEmployees(updatedEmployees);
    };

    const findMatchingObject = (id, list) => {
        return list.find(item => item.id === id);
    };

    const [shipId, setShipId] = useState('');
    const [editId, setEditId] = React.useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [stateLoc, setStateLoc] = useState('');
    const [zip, setZip] = useState('');
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        }
    };


    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(SAVE_ADDRESS + '/' + `${editId}`, {
                id: shipId,
                multipleShippingAddress: [
                    {
                        id: editId,
                        address: address,
                        city: city,
                        state: stateLoc,
                        zip: zip
                    }
                ]
            }, axiosConfig);
            console.log(response.data); // Handle response data
            if (response.data.code === 200) {
                console.log("hesab response if ", response.data.response);
                //  dispatch(addLogin(response.data.response));
                // onBooleanChange();
            } else {
                console.log("hesab response else ", response.data.response);
            }
        } catch (error) {
            console.error('Error:', error);
        } closeEditOpenFlag();

    };
    function closeEditOpenFlag() {
        setEditOpen(false);
        setShipId('');
        setEditId('');
        setAddress('');
        setCity('');
        setStateLoc('');
        setZip('');
    }


    function handleEdit(id, data, shipToId) {
        handleBooleanChange();
        findObjectById(id);
        console.log("ID >> ", id);
        console.log("Edit Data ", data);
        // Call the function with parameters
        setShipId(shipToId);
        setEditId(id);
        setAddress(data.address);
        setCity(data.city);
        setStateLoc(data.state);
        setZip(data.zip);
        console.log("Edit Data ", data.address, data.city);
        setEditOpen(true)

        // fetchAllManageUserData();
        // dispatch(updateBusinessUser(data));
    }
    const handleBooleanChange = () => {
    };

    const findObjectById = (id) => {


    };


    const handleChange = (event) => {
        setOnSelectOfShipTo(event);
        setOpenCategory(false);
    };

    useEffect(() => {
        setShipToAddress(onSelectOfShipTo)
    }, [onSelectOfShipTo]);



    const handleBilltoSHipToo = (event) => {
        setShipTo(event.target.value);
        setBillTo(event.target.value);
        setShipToAddress(event.target.value.shippingAddress)
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

    const handleChangeCheckedMarkAsFUll = (event) => {
        setCheckedMark(event.target.checked);
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
        setOpenItemModal(true);
        //     const newEmployee = {id: employees.length + 1, item: '', quantity: 0, rate: 0, total: 0};
        //     const newEmployee = { id: employees.length + 1 };
        //  setEmployees([...employees, newEmployee]);
    };
    const deleteRow = (id) => {
        const updatedEmployees = employees.filter(employee => employee.id !== id);
        setEmployees(updatedEmployees);
    };
    const handleInputChange = (id, key, value) => {
        const updatedEmployees = employees.map(employee => {
            if (employee.id === id) {
                if (key === 'quantity') {
                    employee.total = value * employee.salePrice - employee.gst / 100 * value * employee.salePrice - employee.discount;
                    employee.total = value * employee.salePrice;
                    return { ...employee, [key]: value };
                } else if (key === 'discount') {
                    employee.total = employee.salePrice * employee.quantity - employee.gst / 100 * employee.salePrice * employee.quantity;
                    employee.total = employee.total - value;
                    return { ...employee, [key]: value };
                } else if (key === 'gst') {
                    employee.total = employee.salePrice * employee.quantity - employee.discount;
                    employee.total = employee.total - value / 100 * employee.total;
                    return { ...employee, [key]: value };
                }
                else {
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
                                        <Typography variant="h2" sx={{ marginLeft: '10px' }}>Change Shipping Address</Typography>
                                        <ModalClose variant="plain" sx={{
                                            borderStyle: 'dashed',
                                            borderWidth: '1px'
                                        }} />
                                        <Box sx={{ margin: '5px' }}>
                                            <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
                                                <Table sx={{ minWidth: 350 }} aria-label="customized table" stickyHeader>
                                                    <TableHead>
                                                        <TableRow>
                                                            <StyledTableCell align="center">Address</StyledTableCell>
                                                            <StyledTableCell align="center">Actions</StyledTableCell>
                                                            <StyledTableCell align="center">Select</StyledTableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        <StyledTableRow key="1">
                                                            <StyledTableCell align="center">{shipTo.shippingAddress}</StyledTableCell>
                                                            <StyledTableCell align="center"> NA </StyledTableCell>
                                                            <StyledTableCell align="center">
                                                                <Button variant="outlined" color="primary" sx={{ margin: '10px' }}
                                                                    onClick={() => handleChange(shipTo.shippingAddress)}>Select</Button>
                                                            </StyledTableCell>
                                                        </StyledTableRow>
                                                        {shipTo && shipTo.multipleShippingAddress && shipTo.multipleShippingAddress.map(shipIn => (
                                                            <StyledTableRow key={shipIn.id}>
                                                                <StyledTableCell align="center">{shipIn.address},{shipIn.city},{shipIn.state},{shipIn.zip}</StyledTableCell>
                                                                <StyledTableCell align="center">
                                                                    <IconButton aria-label="edit"
                                                                        onClick={() => handleEdit(shipIn.id, shipIn, shipTo.id)}>
                                                                        <EditIcon />
                                                                    </IconButton>
                                                                </StyledTableCell>
                                                                <StyledTableCell align="center">
                                                                    {shipIn && (
                                                                        <Button variant="outlined" color="primary" sx={{ margin: '10px' }}
                                                                            onClick={() => handleChange((shipIn.address) + ' ' + (shipIn.city) + ' ' + (shipIn.state) + ' ' + (shipIn.zip))}>Select</Button>
                                                                    )}
                                                                </StyledTableCell>
                                                            </StyledTableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                                <Modal
                                                    open={editOpen}
                                                    onClose={() => setEditOpen(false)}
                                                    aria-labelledby="child-modal-title"
                                                    aria-describedby="child-modal-description"
                                                >
                                                    <Box sx={{ ...style, width: 200 }}>
                                                        <Box sx={{
                                                            position: 'absolute',
                                                            top: '50%',
                                                            left: '50%',
                                                            transform: 'translate(-50%, -50%)',
                                                            width: 500,
                                                            bgcolor: 'background.paper',
                                                            border: '2px solid #000',
                                                            boxShadow: 24,
                                                            p: 1,
                                                        }}>
                                                            <Box
                                                                sx={{
                                                                    display: 'flex',
                                                                    flexDirection: 'column',
                                                                    alignItems: 'center',
                                                                }}
                                                            >
                                                                <Box sx={{
                                                                    display: 'flex', borderStyle: 'dashed',
                                                                    borderWidth: '2px'
                                                                }}>
                                                                    <Typography component="h1" variant="h5">
                                                                        Edit Shipping Address
                                                                    </Typography>
                                                                    <ModalClose variant="plain" sx={{
                                                                        m: 1, borderStyle: 'dashed',
                                                                        borderWidth: '2px'
                                                                    }} />
                                                                </Box>
                                                                <Box component="form" onSubmit={handleClick}>
                                                                    <Box>
                                                                        <TextField
                                                                            sx={{ width: '100%' }}
                                                                            margin="normal"
                                                                            value={address}
                                                                            label="Street Address*"
                                                                            onChange={(e) => setAddress(e.target.value)}
                                                                            fullWidth={true}
                                                                        />
                                                                    </Box>
                                                                    <Box>
                                                                        <TextField
                                                                            margin="normal"
                                                                            required
                                                                            fullWidth
                                                                            value={city}
                                                                            label="City*"
                                                                            onChange={(e) => setCity(e.target.value)}
                                                                        />
                                                                    </Box>
                                                                    <Box sx={{ display: 'flex' }}>
                                                                        <TextField
                                                                            select
                                                                            fullWidth={true}
                                                                            sx={{ margin: '10px' }}
                                                                            label="State"
                                                                            value={stateLoc}
                                                                            variant="outlined"
                                                                            margin="normal"
                                                                            onChange={(event) => setStateLoc(event.target.value)}
                                                                        >
                                                                            {
                                                                                UserRole.india.map(indi => (
                                                                                    <MenuItem key={indi.name}
                                                                                        value={indi.name}>{indi.name}</MenuItem>))
                                                                            }
                                                                        </TextField>
                                                                    </Box>
                                                                    <Box>
                                                                        <TextField
                                                                            margin="normal"
                                                                            required
                                                                            value={zip}
                                                                            label="Pin Code *"
                                                                            fullWidth={true}
                                                                            onChange={(e) => setZip(e.target.value)}
                                                                        />
                                                                    </Box>

                                                                    <Button
                                                                        type="submit"
                                                                        fullWidth
                                                                        variant="contained"
                                                                        onClick={handleClick}
                                                                        sx={{ mt: 3, mb: 2, color: "whitesmoke", background: '#212121' }}
                                                                    >
                                                                        Submit
                                                                    </Button>

                                                                </Box>
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                </Modal>
                                            </TableContainer>
                                        </Box>
                                        <ChildModal value={shipTo.id} />
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
                                    <label style={{ fontSize: '12px' }}>Address :- <strong>{shipToAddress}</strong></label>
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
                                    <StyledTableCell align="center">PRICE/ITEM (₹)</StyledTableCell>
                                    <StyledTableCell align="center">QTY</StyledTableCell>
                                    <StyledTableCell align="center">DISCOUNT</StyledTableCell>
                                    <StyledTableCell align="center">TAX</StyledTableCell>
                                    <StyledTableCell align="center">AMOUNT (₹)</StyledTableCell>
                                    <StyledTableCell align="center">Actions</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {employees.map(employee => (
                                    <TableRow key={employee.id}><StyledTableCell align="center">
                                        <TextField
                                            value={employee.id}
                                            disabled={true}
                                            onChange={(e) => handleInputChange(employee.id, 'id', e.target.value)}
                                        />
                                    </StyledTableCell><StyledTableCell align="center">
                                            <TextField
                                                value={employee.item}
                                                disabled={true}
                                                onChange={(e) => handleInputChange(employee.item, 'item', e.target.value)}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <TextField
                                                value={employee.hsn}
                                                disabled={true}
                                                onChange={(e) => handleInputChange(employee.id, 'hsn', e.target.value)}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <TextField
                                                disabled={true}
                                                value={employee.salePrice}
                                                onChange={(e) => handleInputChange(employee.salePrice, 'salePrice', e.target.value)}
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
                                                value={employee.discount}
                                                onChange={(e) => handleInputChange(employee.id, 'discount', e.target.value)}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <TextField
                                                select
                                                value={employee.gst}
                                                onChange={(e) => handleInputChange(employee.id, 'gst', e.target.value)}
                                            >
                                                {
                                                    UserRole.GST.map(indi => (
                                                        <MenuItem key={indi.name}
                                                            value={indi.name}>{indi.name}</MenuItem>))
                                                }
                                            </TextField>
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
                        <Modal
                            open={openItemModal}
                            onClose={() => setOpenItemModal(false)}
                            aria-labelledby="child-modal-title"
                            aria-describedby="child-modal-description"
                        >
                            <Box sx={{ ...style, width: 200 }}>
                                <Box sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: 1000,
                                    bgcolor: 'background.paper',
                                    border: '2px solid #000',
                                    boxShadow: 24,
                                    p: 1,
                                }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Box>
                                            <Typography component="h1" variant="h3">
                                                Add Items
                                            </Typography>
                                            <ModalClose variant="plain" sx={{
                                                borderStyle: 'dashed',
                                                borderWidth: '1px'
                                            }} />
                                        </Box>
                                        <Box component="form" onSubmit={handleSubmitForItemSelect} sx={{ width: '100%' }}>
                                            <Box sx={{
                                                display: 'flex'
                                                , margin: '5px',
                                                borderStyle: 'dashed',
                                                borderWidth: '2px'
                                            }}>
                                                <Box sx={{ width: '35%', margin: '5px' }}>
                                                    <TextField
                                                        fullWidth
                                                        placeholder="Search Items"
                                                        variant="outlined"
                                                        InputProps={{
                                                            startAdornment: (
                                                                <SearchIcon sx={{ marginRight: 1, color: 'action.active' }} />
                                                            ),
                                                        }}
                                                    />
                                                </Box>
                                                <Box sx={{ width: '35%', margin: '5px' }}>
                                                    <TextField
                                                        fullWidth
                                                        select
                                                        //   value={manageUserObj.state}
                                                        // onChange={(event) => handleTextFieldChange(event, 'state')}
                                                        label="Select Category"
                                                        variant="outlined">
                                                        {
                                                            UserRole.india.map(indi => (
                                                                <MenuItem key={indi.name}
                                                                    value={indi.name}>{indi.name}</MenuItem>))
                                                        }
                                                    </TextField>
                                                </Box>
                                                <Box sx={{ width: '30%', margin: '5px' }}>
                                                    <Button variant="outlined" color="secondary"> +Add New Items</Button>
                                                </Box>
                                            </Box>
                                            <Box sx={{
                                                margin: '5px', borderStyle: 'dashed',
                                                borderWidth: '1px'
                                            }}>
                                                <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
                                                    <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell padding="checkbox">
                                                                    <Checkbox
                                                                        indeterminate={
                                                                            selectedRows.length > 0 && selectedRows.length < inventorys.length
                                                                        }
                                                                        checked={selectedRows.length === inventorys.length}
                                                                        onChange={() =>
                                                                            setSelectedRows(
                                                                                selectedRows.length === inventorys.length ? [] : inventorys.map((row) => row.id)
                                                                            )
                                                                        }
                                                                    />
                                                                </TableCell>
                                                                <TableCell>ITEM NAME</TableCell>
                                                                <TableCell align="center">ITEM CODE</TableCell>
                                                                <TableCell align="center">SALES PRICE</TableCell>
                                                                <TableCell align="center">PURCHASE PRICE</TableCell>
                                                                <TableCell align="center">CURRENT STOCK</TableCell>
                                                                <TableCell align="center">QUANTITY</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {inventorys && inventorys.map((row) => (
                                                                <TableRow
                                                                    key={row.name}
                                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                >
                                                                    <TableCell padding="checkbox">
                                                                        <Checkbox
                                                                            checked={selectedRows.indexOf(row.id) !== -1}
                                                                            onClick={() => handleCheckboxClick(row.id)}
                                                                        />
                                                                    </TableCell>
                                                                    <TableCell component="th" scope="row">
                                                                        {row.item}
                                                                    </TableCell>
                                                                    <TableCell align="center">{row.itemCode}</TableCell>
                                                                    <TableCell align="center">{row.salePrice}</TableCell>
                                                                    <TableCell align="center">{row.purchasePrice}</TableCell>
                                                                    <TableCell align="center">{row.totalStock}</TableCell>
                                                                    <TableCell align="right">
                                                                        <Box >

                                                                            <ButtonGroup size="small" aria-label="small outlined button group">
                                                                                <Button onClick={() => decreaseSalary(row.id)}>-</Button>
                                                                                <Button disabled>{row.quantity}</Button>
                                                                                <Button onClick={() => increaseSalary(row.id)}>+</Button>
                                                                            </ButtonGroup>
                                                                        </Box>
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>

                                            </Box>


                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                onClick={handleSubmitForItemSelect}
                                                sx={{ mt: 3, mb: 2, color: "whitesmoke", background: '#212121' }}
                                            >
                                                Submit
                                            </Button>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Modal>


                        <Table sx={{ minWidth: 1250 }} aria-label="customized table" stickyHeader>
                            <TableHead>
                                <TableRow>
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
                                        control={<Checkbox checked={checkedMark} onChange={handleChangeCheckedMarkAsFUll} />}
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
const ChildModal = (props) => {
    const [open, setOpen] = React.useState(false);
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [stateLoc, setStateLoc] = useState('');
    const [zip, setZip] = useState('');
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        }
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(SAVE_ADDRESS, {
                id: props.value,
                multipleShippingAddress: [
                    {
                        address: address,
                        city: city,
                        state: stateLoc,
                        zip: zip
                    }
                ]
            }, axiosConfig);
            console.log(response.data); // Handle response data
            if (response.data.code === 200) {
                console.log("hesab response if ", response.data.response);
                //  dispatch(addLogin(response.data.response));
                // onBooleanChange();
            } else {
                console.log("hesab response else ", response.data.response);
            }
        } catch (error) {
            console.error('Error:', error);
        }
        handleClose();
    };

    return (
        <React.Fragment>
            <Button variant="outlined" color="primary" onClick={handleOpen} sx={{ margin: '10px' }}>Add New Shipping Address</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 200 }}>
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 500,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 1,
                    }}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Box sx={{
                                display: 'flex', borderStyle: 'dashed',
                                borderWidth: '2px'
                            }}>
                                <Typography component="h1" variant="h5">
                                    Edit Shipping Address
                                </Typography>
                                <ModalClose variant="plain" sx={{
                                    m: 1, borderStyle: 'dashed',
                                    borderWidth: '2px'
                                }} />
                            </Box>
                            <Box component="form" onSubmit={handleClick}>
                                <Box>
                                    <TextField
                                        sx={{ width: '100%' }}
                                        margin="normal"
                                        label="Street Address*"
                                        onChange={(e) => setAddress(e.target.value)}
                                        fullWidth={true}
                                    />
                                </Box>
                                <Box>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="City*"
                                        onChange={(e) => setCity(e.target.value)}
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
                                        onChange={(event) => setStateLoc(event.target.value)}
                                    >
                                        {
                                            UserRole.india.map(indi => (
                                                <MenuItem key={indi.name}
                                                    value={indi.name}>{indi.name}</MenuItem>))
                                        }
                                    </TextField>
                                </Box>
                                <Box>
                                    <TextField
                                        margin="normal"
                                        required
                                        label="Pin Code *"
                                        fullWidth={true}
                                        onChange={(e) => setZip(e.target.value)}
                                    />
                                </Box>

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    onClick={handleClick}
                                    sx={{ mt: 3, mb: 2, color: "whitesmoke", background: '#212121' }}
                                >
                                    Submit
                                </Button>

                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </React.Fragment >
    );
}