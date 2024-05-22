import React, {useState} from "react";

import {Autocomplete, Box, Button, Grid, TextField, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import {StyledTableCellPOSBILLING} from "../../commonStyle";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";
const POSBilling = () => {
    const [selectedRow, setSelectedRow] = useState(null);
    const [filteredPosBilling, setFilteredPosBilling] = useState([]);
    const {partyUser} = useSelector((state) => state.partyReducerValue);
    const {inventoryUser} = useSelector((state) => state.inventoryReducerValue);
    const {salePurchaseUser} = useSelector(
        (state) => state.salePurchaseReducerValue
    );
    const loginData = useSelector((state) => state.loginReducerValue);
    const handleAutoComplete = (event, newValue) => {
        console.log("Auto Complete ", newValue);
        if (newValue) {
            addObjectOnTop(newValue);
        }
    };
    const deleteRow = (id) => {
        const updatedEmployees = filteredPosBilling.filter((employee) => employee.id !== id);
        setFilteredPosBilling(updatedEmployees);
    };

    const addObjectOnTop = (newObject) => {
        const existingIndex = filteredPosBilling.findIndex(
            (item) => item.id === newObject.id
        );
        if (existingIndex === -1) {
            setFilteredPosBilling([newObject, ...filteredPosBilling]);
        } else {
            const updatedArray = [...filteredPosBilling];
            updatedArray[existingIndex] = newObject;
            setFilteredPosBilling(updatedArray);
        }
    };
    const buttonStyle = {
        margin: '10px',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    };

    const handleRowClick = (id) => {
        setSelectedRow(id);
    };
    const handleInputChange = (id, key, value) => {
        const updatedEmployees = filteredPosBilling.map((employee) => {
            if (employee.id === id) {
                if (key === "quantity") {
                    employee.total =
                        value * employee.salePrice -
                        (employee.gst / 100) * value * employee.salePrice -
                        employee.discount;
                    employee.total = value * employee.salePrice;
                    return {...employee, [key]: value};
                } else if (key === "discount") {
                    employee.total =
                        employee.salePrice * employee.quantity +
                        (employee.gst / 100) * employee.salePrice * employee.quantity;
                    employee.total = employee.total - value;
                    return {...employee, [key]: value};
                } else if (key === "gst") {
                    employee.total =
                        employee.salePrice * employee.quantity - employee.discount;
                    employee.total = employee.total + (value / 100) * employee.total;
                    return {...employee, [key]: value};
                } else {
                    return {...employee, [key]: value};
                }
            }
            return employee;
        });
        setFilteredPosBilling(updatedEmployees);
    };
    return (
        <>
            <Box sx={{p: 2}}>
                <Box sx={{mb: 2}}>
                    <Button variant="contained">POS BILLING</Button>
                </Box>
                <Box sx={{display: "flex", width: "100%"}}>
                    <Box
                        sx={{
                            width: "70%",
                            border: "1px solid",
                            boxShadow: 3,
                            p: 2,
                            mr: 1,
                        }}
                    >
                        <Box>
                            <Autocomplete
                                disablePortal
                                onChange={handleAutoComplete}
                                id="combo-box-demo"
                                fullWidth
                                options={inventoryUser}
                                getOptionLabel={(option) =>
                                    `${option.item} (${option.totalStock}) (${option.salePrice})`
                                }
                                renderOption={(props, option) => (
                                    <Box component="li" {...props} sx={{
                                        display: 'flex',
                                        backgroundColor: 'white',
                                        justifyContent: 'space-between',
                                        borderBottom: '1px solid #ccc',
                                        '&:hover': {
                                            backgroundColor: 'black'
                                        }
                                    }}>
                                        <Grid container spacing={2} sx={{width: '100%', alignItems: 'center'}}>
                                            <Grid item xs={4}>
                                                <Box sx={{padding: '8px'}}>{option.item}</Box>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Box sx={{padding: '8px'}}>{option.totalStock}</Box>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Box sx={{padding: '8px'}}>{option.salePrice}</Box>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                )}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Search By Item/Item Code or Scan Barcode"
                                    />
                                )}
                                ListboxProps={{
                                    style: {
                                        maxHeight: '200px',
                                        overflow: 'auto',
                                    },
                                }}
                                PaperComponent={({children}) => (
                                    <Box sx={{position: 'relative', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)'}}>
                                        <Box sx={{
                                            top: 0,
                                            backgroundColor: 'white',
                                            zIndex: 1,
                                            borderBottom: '1px solid #ccc',
                                            padding: '8px 16px',
                                        }}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={4}>
                                                    <Typography variant="body2"
                                                                sx={{
                                                                    fontWeight: 'bold',
                                                                    marginLeft: '10px'
                                                                }}>Item</Typography>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Typography variant="body2" sx={{fontWeight: 'bold'}}>Total
                                                        Stock</Typography>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Typography variant="body2" sx={{fontWeight: 'bold'}}>Sale
                                                        Price</Typography>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                        {children}
                                    </Box>
                                )}
                            />
                        </Box>
                        <Box sx={{marginTop: '10px'}}>
                            <Box>
                                <TableContainer component={Paper}>
                                    <Table
                                        aria-label="customized table"
                                        stickyHeader sx={{maxHeight: '200px',}}
                                    >
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCellPOSBILLING align="center">
                                                    S.NO.
                                                </StyledTableCellPOSBILLING>
                                                <StyledTableCellPOSBILLING align="center">
                                                    ITEMS
                                                </StyledTableCellPOSBILLING>
                                                <StyledTableCellPOSBILLING align="center">
                                                    ITEM CODE
                                                </StyledTableCellPOSBILLING>
                                                <StyledTableCellPOSBILLING align="center">
                                                    (₹) SP
                                                </StyledTableCellPOSBILLING>
                                                <StyledTableCellPOSBILLING align="center">
                                                    QUANTITY
                                                </StyledTableCellPOSBILLING>
                                                <StyledTableCellPOSBILLING align="center">
                                                    (₹) AMOUNT
                                                </StyledTableCellPOSBILLING>
                                                <StyledTableCellPOSBILLING align="center">
                                                    Delete
                                                </StyledTableCellPOSBILLING>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {filteredPosBilling.map((row) => (
                                                <TableRow
                                                    key={row.id}
                                                >
                                                    <StyledTableCellPOSBILLING
                                                        align="center">{row.id}</StyledTableCellPOSBILLING>
                                                    <StyledTableCellPOSBILLING
                                                        align="center">{row.item}</StyledTableCellPOSBILLING>
                                                    <StyledTableCellPOSBILLING
                                                        align="center">{row.itemCode}</StyledTableCellPOSBILLING>
                                                    <StyledTableCellPOSBILLING align="center">
                                                        <TextField
                                                            value={row.salePrice}
                                                            onChange={(e) =>
                                                                handleInputChange(
                                                                    row.id,
                                                                    "salePrice",
                                                                    e.target.value
                                                                )
                                                            }
                                                            InputProps={{
                                                                sx: { fontSize: 10},
                                                            }}
                                                            sx={{ width: "60%", '& .MuiInputBase-input': { fontSize: 10 } }}
                                                        /></StyledTableCellPOSBILLING>
                                                    <StyledTableCellPOSBILLING align="center">

                                                        <TextField
                                                            value={row.quantity}
                                                            onChange={(e) =>
                                                                handleInputChange(
                                                                    row.id,
                                                                    "quantity",
                                                                    e.target.value
                                                                )
                                                            }
                                                            InputProps={{
                                                                sx: { fontSize: 10 },
                                                            }}
                                                            sx={{ width: "60%", '& .MuiInputBase-input': { fontSize: 10 } }}
                                                        /></StyledTableCellPOSBILLING>
                                                    <StyledTableCellPOSBILLING
                                                        align="center">{row.amount}</StyledTableCellPOSBILLING>
                                                    <StyledTableCellPOSBILLING align="center">
                                                        <IconButton
                                                            aria-label="delete"
                                                            onClick={() => deleteRow(row.id)}
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </StyledTableCellPOSBILLING>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            width: "30%",
                            border: "1px solid",
                            boxShadow: 5,
                            p: 2,
                            ml: 1,
                        }}
                    >
                        second half
                    </Box>
                </Box>

            </Box>
        </>
    );
};

export default POSBilling;
