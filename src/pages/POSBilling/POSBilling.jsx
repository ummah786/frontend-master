import React, {useEffect, useState} from "react";
import {
    Autocomplete,
    Box,
    Button,
    FormControl,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from '@mui/material';
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
import UserRole from "../../jsonfile/Role.json";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import {Transition} from "react-transition-group";
import CloseIcon from "@mui/icons-material/Close";

const POSBilling = () => {
    const [selectedRow, setSelectedRow] = useState(null);
    const [filteredPosBilling, setFilteredPosBilling] = useState([]);
    const {partyUser} = useSelector((state) => state.partyReducerValue);
    const {inventoryUser} = useSelector((state) => state.inventoryReducerValue);
    const {salePurchaseUser} = useSelector((state) => state.salePurchaseReducerValue);
    const loginData = useSelector((state) => state.loginReducerValue);
    const handleAutoComplete = (event, newValue) => {
        if (newValue) {
            addObjectOnTop(newValue);
        }
    };


    const [sideTotalAmount, setSideTotalAmount] = useState("");
    const [sideSubTotalAmount, setSideSubTotalAmount] = useState("");
    const [sideTax, setSideTax] = useState("");
    const [receivedAmount, setReceivedAmount] = useState(0);
    const [paymentMode, setPaymentMode] = useState("")
    //additional Discount
    const [addDiscountFlag, setAddDiscountFlag] = useState(false);
    const [addAdditionalChargeFlag, setAddAdditionalChargeFlag] = useState(false);
    const [addDiscountInRupee, setAddDiscountInRupee] = useState(0);
    const [addDiscountInPer, setAddDiscountInPer] = useState(0);
    const [discountOption, setDiscountOption] = useState();

    const handleChange = (event) => {
        setDiscountOption(event.target.value);
        console.log("check box ", event.target.value)
    };
    //add Addition Charge
    useEffect(() => {
        const totalAmount = filteredPosBilling.reduce((acc, emp) => {
            const parsedValue = parseFloat(emp.total);
            if (isNaN(parsedValue)) {
                return acc;
            }
            return acc + parsedValue;
        }, 0);
        const roundedTotalAmount = parseFloat(totalAmount.toFixed(2));

        const fieldsValueTotal = fields.reduce((acc, field) => {
            const value = parseFloat(field.value) || 0; // Convert to number and handle empty strings
            return acc + value;
        }, 0);
        setSideTotalAmount(parseFloat(roundedTotalAmount + fieldsValueTotal).toFixed(2));
        const subTax = filteredPosBilling.reduce((acc, emp) => {
            let parseGst = parseFloat(emp.gst);
            let parseSale = parseFloat(emp.salePrice);
            let parseQuantity = parseFloat(emp.quantity);
            let calculatedRValue = null;
            if (isNaN(parseQuantity) || parseQuantity === 0) {
                parseQuantity = 1;
            }
            if (isNaN(parseGst) || parseGst === 0) {
                calculatedRValue = 0;
            } else {
                calculatedRValue = (parseSale * parseQuantity * parseGst) / 200;
            }
            return acc + calculatedRValue;
        }, 0);
        const roundedSubTax = parseFloat(subTax.toFixed(2));
        setSideTax(roundedSubTax);
        setSideSubTotalAmount(parseFloat(roundedTotalAmount - roundedSubTax).toFixed(2));
    }, [filteredPosBilling]);


    const deleteRow = (id) => {
        const updatedEmployees = filteredPosBilling.filter((employee) => employee.id !== id);
        setFilteredPosBilling(updatedEmployees);
    };

    const addObjectOnTop = (newObject) => {
        // Set default quantity to 1 if it's an empty string or undefined
        newObject.quantity = newObject.quantity === "" || newObject.quantity === undefined ? 1 : newObject.quantity;
        const existingIndex = filteredPosBilling.findIndex(
            (item) => item.id === newObject.id
        );
        newObject.total =
            newObject.salePrice * newObject.quantity +
            (newObject.gst / 100) * newObject.salePrice * newObject.quantity;
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
                } else if (key === "salePrice") {
                    employee.total =
                        value * employee.quantity +
                        (employee.gst / 100) * value * employee.quantity;
                    return {...employee, [key]: value};
                } else {
                    return {...employee, [key]: value};
                }
            }
            return employee;
        });
        setFilteredPosBilling(updatedEmployees);
    };

    const handleClickForAdditionDiscount = (e) => {
        e.preventDefault();
        //add logic for handling Additional Discount

        //check for type of flag //   const [addDiscountInRupee, setAddDiscountInRupee] = useState(0);
        //     const [addDiscountInPer, setAddDiscountInPer] = useState(0);
        //     const [discountOption, setDiscountOption] = useState();
        if (discountOption !== null && discountOption === 'a') {
            if (addDiscountInRupee > 0) {
                const sideAddDiscountInRuppe = sideTotalAmount - addDiscountInRupee;
                setSideTotalAmount(sideAddDiscountInRuppe);
            } else if (addDiscountInPer > 0) {
                const findValue = sideTotalAmount * addDiscountInPer / 100;
                setAddDiscountInRupee(findValue);
                const sideAddDiscountInRuppe = sideTotalAmount - findValue;
                setSideTotalAmount(sideAddDiscountInRuppe);
            }
        }

        //  after mai 2 thing per total ka per   price to direct hai


    }
    const handleClickForAdditionCharge = (e) => {
        e.preventDefault();
        setAddAdditionalChargeFlag(false);
        const fieldsValueTotal = fields.reduce((acc, field) => {
            const value = parseFloat(field.value) || 0; // Convert to number and handle empty strings
            return acc + value;
        }, 0);
        const totalAmount = parseFloat(fieldsValueTotal) + sideTotalAmount;
        setSideTotalAmount(totalAmount);
    }
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 500,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 1,
    };
    const [fields, setFields] = useState([{key: "", value: ""}]);
    const addField = () => {
        setFields([...fields, {key: "", value: ""}]);
    };
    const handleInputChangess = (index, keyOrValue, e) => {
        const updatedFields = [...fields];
        updatedFields[index][keyOrValue] = e.target.value;
        setFields(updatedFields);
        console.log("Fields >>   ", fields);
    };
    const removeField = (index) => {
        const updatedFields = [...fields];
        updatedFields.splice(index, 1);
        setFields(updatedFields);
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
                            height: '80vh'
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
                            <TableContainer component={Paper} sx={{height: '67vh'}}>
                                <Table
                                    aria-label="customized table"
                                    stickyHeader
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
                                            <TableRow key={row.id}>
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
                                                            sx: {fontSize: 10},
                                                        }}
                                                        sx={{width: "60%", '& .MuiInputBase-input': {fontSize: 10}}}
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
                                                            sx: {fontSize: 10},
                                                        }}
                                                        sx={{width: "60%", '& .MuiInputBase-input': {fontSize: 10}}}
                                                    /></StyledTableCellPOSBILLING>
                                                <StyledTableCellPOSBILLING
                                                    align="center">{row.total}</StyledTableCellPOSBILLING>
                                                <StyledTableCellPOSBILLING align="center">
                                                    <IconButton
                                                        aria-label="delete"
                                                        onClick={() => deleteRow(row.id)}
                                                    >
                                                        <DeleteIcon/>
                                                    </IconButton>
                                                </StyledTableCellPOSBILLING>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
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
                        <Box>
                            <Box sx={{display: 'flex', boxShadow: 3, p: 2}}>
                                <Button onClick={(e) => setAddDiscountFlag(true)}>Add Discount</Button>
                                <Transition in={addDiscountFlag} timeout={400}>
                                    <Modal
                                        open={addDiscountFlag}
                                        onClose={() => setAddDiscountFlag(false)}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Box sx={style}>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <ModalClose variant="plain" sx={{m: 1}}/>
                                                <Typography component="h1" variant="h5">
                                                    Add Discount
                                                </Typography>
                                                <Box sx={{display: 'flex', marginTop: '15px'}}>
                                                    <FormControl component="fieldset">
                                                        <RadioGroup
                                                            aria-label="discount"
                                                            name="discount"
                                                            value={discountOption}
                                                            onChange={handleChange}
                                                            sx={{
                                                                display: 'flex',
                                                                flexDirection: 'row'
                                                            }} // Adding flexbox styling here
                                                        >
                                                            <FormControlLabel value="b" control={<Radio/>}
                                                                              label="Discount Before Tax"/>
                                                            <FormControlLabel value="a" control={<Radio/>}
                                                                              label="Discount After Tax"/>
                                                        </RadioGroup>
                                                    </FormControl>
                                                </Box>
                                                <Box
                                                    component="form"
                                                    onSubmit={handleClickForAdditionDiscount}
                                                    noValidate
                                                    sx={{mt: 1}}
                                                >
                                                    <TextField
                                                        margin="normal"
                                                        label="Percentage Amount  %  "
                                                        fullWidth={true}
                                                        value={addDiscountInPer}
                                                        onChange={(e) =>
                                                            setAddDiscountInPer(e.target.value)
                                                        }
                                                    />
                                                    <TextField
                                                        margin="normal"
                                                        label="Amount In Rupee   ₹ "
                                                        fullWidth={true}
                                                        value={addDiscountInRupee}
                                                        onChange={(e) =>
                                                            setAddDiscountInRupee(e.target.value)
                                                        }
                                                    />
                                                    <Button
                                                        type="submit"
                                                        fullWidth
                                                        variant="contained"
                                                        onClick={handleClickForAdditionDiscount}
                                                        sx={{
                                                            mt: 3,
                                                            mb: 2,
                                                            color: "whitesmoke",
                                                            background: "#212121",
                                                        }}
                                                    >
                                                        Submit
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Modal>
                                </Transition>
                                <Box sx={{flexGrow: 1}}/>
                                <Button onClick={(e) => setAddAdditionalChargeFlag(true)}>Add Additional Charge</Button>

                                <Transition in={addAdditionalChargeFlag} timeout={400}>
                                    <Modal
                                        open={addAdditionalChargeFlag}
                                        onClose={() => setAddAdditionalChargeFlag(false)}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Box sx={style}>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <ModalClose variant="plain" sx={{m: 1}}/>
                                                <Box
                                                    component="form"
                                                    onSubmit={handleClickForAdditionCharge}
                                                    noValidate
                                                    sx={{mt: 1}}
                                                >
                                                    <Box sx={{padding: "10px"}}>
                                                        <Button variant="contained" onClick={addField}
                                                                disabled={fields.length >= 3}>
                                                            Add Additional Charges
                                                        </Button>
                                                        {fields.slice(0, 3).map((field, index) => (
                                                            <Box
                                                                key={index}
                                                                sx={{
                                                                    marginTop: 2,
                                                                    display: "flex",
                                                                    alignItems: "center"
                                                                }}
                                                            >
                                                                <Box sx={{width: "65%"}}>
                                                                    <TextField
                                                                        label="Enter Charges (ex.Transport Charge)"
                                                                        value={field.key}
                                                                        onChange={(e) => handleInputChangess(index, "key", e)}
                                                                        disabled={field.disabled}
                                                                        sx={{marginRight: 1}}
                                                                    />
                                                                </Box>{" "}
                                                                <Box sx={{width: "25%"}}>
                                                                    <TextField
                                                                        label=" ₹ "
                                                                        value={field.value}
                                                                        onChange={(e) => handleInputChangess(index, "value", e)}
                                                                        disabled={field.disabled}
                                                                        inputProps={{
                                                                            inputMode: "decimal",
                                                                            pattern: "[0-9]*[.,]?[0-9]*",
                                                                        }}
                                                                        type="number"
                                                                        sx={{marginRight: 1}}
                                                                    />{" "}
                                                                </Box>{" "}
                                                                <Box sx={{width: "10%"}}>
                                                                    <IconButton
                                                                        onClick={() => removeField(index)}
                                                                        disabled={field.disabled}
                                                                    >
                                                                        <CloseIcon/>
                                                                    </IconButton>
                                                                </Box>
                                                            </Box>
                                                        ))}
                                                        {fields.length === 0}
                                                    </Box>
                                                    <Button
                                                        type="submit"
                                                        fullWidth
                                                        variant="contained"
                                                        onClick={handleClickForAdditionCharge}
                                                        sx={{
                                                            mt: 3,
                                                            mb: 2,
                                                            color: "whitesmoke",
                                                            background: "#212121",
                                                        }}
                                                    >
                                                        Submit
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Modal>
                                </Transition>

                            </Box>
                            <Box sx={{
                                boxShadow: 3,
                                p: 2,
                                marginTop: '30px',
                                border: '1px solid #ccc',
                                borderRadius: '8px'
                            }}>
                                <Typography variant="h5">Bill
                                    details</Typography>
                                <Box sx={{display: 'flex', mt: 1, borderTop: '1px solid #ccc', pt: 1}}>
                                    <Typography variant="h6">Sub Total</Typography>
                                    <Box sx={{flexGrow: 1}}/>
                                    <Typography variant="h6">₹ {sideSubTotalAmount}</Typography>
                                </Box>
                                <Box sx={{display: 'flex', mt: 1}}>
                                    <Typography variant="h6">Tax</Typography>
                                    <Box sx={{flexGrow: 1}}/>
                                    <Typography variant="h6">₹ {sideTax}</Typography>
                                </Box>
                                <Box sx={{mt: 1}}>
                                    {Array.isArray(fields) && fields.map((values, index) => (
                                        (values.key && values.value) && (
                                            <Box key={index} sx={{display: 'flex', alignItems: 'center', mb: 1}}>
                                                <Typography variant="h6" sx={{mr: 2}}>{values.key}</Typography>
                                                <Box sx={{flexGrow: 1}}/>
                                                <Typography variant="h6">₹ {values.value}</Typography>
                                            </Box>
                                        )
                                    ))}
                                </Box>
                                <Box>
                                    {(discountOption === 'a') &&
                                        <Box sx={{display: 'flex', alignItems: 'center', mb: 1}}>
                                            <Typography variant="h6" sx={{mr: 2}}>Discount After Tax</Typography>
                                            <Box sx={{flexGrow: 1}}/>
                                            <Typography variant="h6">- ₹ {addDiscountInRupee}</Typography>
                                        </Box>
                                    }
                                </Box>
                                <Box sx={{display: 'flex', mt: 1}}>
                                    <Typography variant="h6">Total Amount</Typography>
                                    <Box sx={{flexGrow: 1}}/>
                                    <Typography variant="h6">₹ {sideTotalAmount}</Typography>
                                </Box>
                            </Box>
                            <Box sx={{boxShadow: 3, p: 2, marginTop: '5px'}}>
                                <Typography variant="h5" sx={{textDecoration: 'underline'}}>Received
                                    Amount</Typography>
                                <Box sx={{display: 'flex', mt: 1, borderTop: '1px solid #ccc', pt: 1}}>
                                    <TextField sx={{width: '150px'}} label="Received Amount"
                                               onChange={(e) => setReceivedAmount(e.target.vaue)}> ₹ {receivedAmount}</TextField>

                                    <TextField
                                        select
                                        label="Payment Mode"
                                        sx={{width: '150px', marginLeft: "20px"}}
                                        value={paymentMode}
                                        onChange={(e) => setPaymentMode(e.target.value)}
                                    >
                                        {UserRole.paymentMode.map((userrole) => (
                                            <MenuItem key={userrole.name} value={userrole.name}>
                                                {userrole.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Box>
                            </Box>

                            <Box sx={{display: 'flex', boxShadow: 3, p: 2, marginTop: '10px'}}>
                                <Button>Save & Print</Button>
                                <Box sx={{flexGrow: 1}}/>
                                <Button>Save Bill</Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>

            </Box>
        </>
    )
        ;
};

export default POSBilling;
