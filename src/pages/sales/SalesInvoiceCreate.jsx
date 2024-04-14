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

export const SalesInvoiceCreate = () => {
    const [employees, setEmployees] = useState([]);
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
            <Box>
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
                    <TableContainer component={Paper} sx={{maxHeight: 280}}>
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
                        <Typography>+Add Notes</Typography>
                        <Box>
                            <Typography>Terms and Conditions</Typography>
                            <Typography>1. Goods once sold will not be taken back or exchanged </Typography>
                            <Typography>2. All disputes are subject to [ENTER_YOUR_CITY_NAME] jurisdiction
                                only</Typography>
                        </Box>
                        <Typography>+Add New Account</Typography>
                    </Box>
                    <Box sx={{width: '50%'}}>
                        <Box>
                            <Typography>+ Add Additional Charges</Typography>
                            <Typography> Taxable Amount</Typography>
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