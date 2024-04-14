import {Box, Button, TextField} from "@mui/material";
import Typography from "@mui/joy/Typography";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {StyledTableCell} from "../../commonStyle";
import TableBody from "@mui/material/TableBody";
import * as React from "react";
import {useState} from "react";
import {Close} from '@mui/icons-material';
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';

export const SalesInvoiceCreate = () => {
    const [showBoxes, setShowBoxes] = useState(false);
    const [textFields, setTextFields] = useState(['']);
    const [boxes, setBoxes] = useState([]);
    const [fields, setFields] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [openNotes, setOpenNotes] = useState(false);
    const [openTermCondition, setOpenTermCondition] = useState(false);
    const addField = () => {
        setFields([...fields, {key: '', value: ''}]);
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
    const handleAddBox = () => {
        setBoxes([...boxes, {id: Date.now()}]);
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
        const newEmployee = {id: employees.length + 1};
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
                    return {...employee, [key]: value};
                } else if (key === 'rate') {
                    employee.total = value * employee.quantity;
                    return {...employee, [key]: value};
                } else {
                    return {...employee, [key]: value};
                }
            }
            return employee;
        });
        setEmployees(updatedEmployees);
    };
    return (
        <>
            <Box sx={{maxHeight: 300}}>
                <Box border={1} borderColor="primary.main" borderRadius={1}>
                    <Typography>Add Logo</Typography>
                    <Typography>Ummah Hub</Typography>
                </Box>
                <Box sx={{display: 'flex'}} border={1} borderColor="primary.main" borderRadius={1}>
                    <Box sx={{width: '70%'}} border={1} borderColor="primary.main" borderRadius={1}>
                        <Typography>Bill To</Typography>
                    </Box>
                    <Box sx={{width: '30%'}} border={1} borderColor="primary.main" borderRadius={1}>
                        <Typography>Sales Invoice No: </Typography>
                        <Typography>Sales Invoice Date: </Typography>
                        <Typography>Payment Terms: </Typography>
                        <Typography>Due Date: </Typography>
                    </Box>
                </Box>
                <Box>
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 1250}} aria-label="customized table" stickyHeader>
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
                        <Button onClick={addRow}>Add Row</Button>
                        <Table sx={{minWidth: 1250}} aria-label="customized table" stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center" style={{color: 'black'}}>1</StyledTableCell>
                                    <StyledTableCell align="center" style={{color: 'black'}}>1</StyledTableCell>
                                    <StyledTableCell align="center" style={{color: 'black'}}>1</StyledTableCell>
                                    <StyledTableCell align="center" style={{color: 'black'}}>1</StyledTableCell>
                                    <StyledTableCell align="center" style={{color: 'black'}}>1</StyledTableCell>
                                    <StyledTableCell align="center" style={{color: 'black'}}>1</StyledTableCell>
                                    <StyledTableCell align="center" style={{color: 'black'}}>1</StyledTableCell>
                                    <StyledTableCell align="center" style={{color: 'black'}}>1</StyledTableCell>
                                    <StyledTableCell align="center">SUBTOTAL</StyledTableCell>
                                    <StyledTableCell align="center">(₹)</StyledTableCell>
                                    <StyledTableCell align="center">(₹)</StyledTableCell>
                                    <StyledTableCell align="center">(₹)</StyledTableCell>
                                    <StyledTableCell align="center" style={{color: 'black'}}>1</StyledTableCell>
                                </TableRow>
                            </TableHead>
                        </Table>
                    </TableContainer>
                </Box>
                <Box sx={{display: 'flex'}}>
                    <Box sx={{width: '50%'}}>
                        <Box sx={{padding: '10px'}}>
                            <Button onClick={handleToggleNotes} variant="contained" color="primary">
                                +Add Notes
                            </Button>
                            {openNotes && (
                                <Box sx={{display: 'flex', padding: '10px'}}>
                                    <TextField label="Enter Notes" variant="outlined" fullWidth={true}/>
                                    <IconButton onClick={handleToggleNotes}>
                                        <Close/>
                                    </IconButton>
                                </Box>
                            )}
                        </Box>
                        <Box sx={{padding: '10px'}}>
                            <Button onClick={handleToggleTermCondition} variant="contained" color="primary">
                                +Terms and Conditions
                            </Button>
                            {openTermCondition && (
                                <Box sx={{display: 'flex', padding: '10px'}}>
                                    <TextField label="Enter Terms & Conditions" variant="outlined" fullWidth={true}/>
                                    <IconButton onClick={handleToggleTermCondition}>
                                        <Close/>
                                    </IconButton>
                                </Box>
                            )
                            }{
                            !openTermCondition && (
                                <Box sx={{padding: '10px'}}>
                                    <Typography>1. Goods once sold will not be taken back or exchanged </Typography>
                                    <Typography>2. All disputes are subject to [ENTER_YOUR_CITY_NAME] jurisdiction
                                        only</Typography>
                                </Box>
                            )
                        }
                        </Box>
                    </Box>
                    <Box sx={{width: '50%'}}>
                        <Box>
                            <Button variant="contained" onClick={handleAddBox}>
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
                        </Box>
                        <Box>
                            <Box>
                                <Button variant="contained" onClick={addField}> Add Additional Charges</Button>
                                {fields.map((field, index) => (
                                    <Box key={index} sx={{marginTop: 2, display: 'flex', alignItems: 'center'}}>
                                        <TextField
                                            label="Enter Charges (ex.Transport Charge)"
                                            value={field.key}
                                            onChange={(e) => handleInputChangess(index, 'key', e)}
                                            disabled={field.disabled}
                                            sx={{marginRight: 1}}
                                        />
                                        <TextField
                                            label=" ₹ "
                                            value={field.value}
                                            onChange={(e) => handleInputChangess(index, 'value', e)}
                                            disabled={field.disabled}
                                            inputProps={{inputMode: 'decimal', pattern: '[0-9]*[.,]?[0-9]*'}}
                                            sx={{marginRight: 1}}
                                        />
                                        <IconButton onClick={() => removeField(index)} disabled={field.disabled}>
                                            <CloseIcon/>
                                        </IconButton>
                                    </Box>
                                ))}
                                {fields.length === 0 && <Typography>No boxes added yet.</Typography>}
                            </Box>
                            <Typography>Taxable Amount</Typography>
                            <Typography>+ Add Discount</Typography>
                        </Box>
                        <Box>
                            <Typography>Auto Round Off</Typography>
                            <Typography>Total Amount</Typography>
                        </Box>

                        <Box>
                            <Typography>Marked As Fully Paid</Typography>
                            <Typography>Amount Received</Typography>
                        </Box>
                        <Box>
                            <Typography>Balance Amount</Typography>
                        </Box>
                        <Box>
                            <Typography>Authorized signatory for ummah</Typography>
                            <input></input>
                        </Box>
                    </Box>
                </Box>

            </Box>
        </>
    )
}