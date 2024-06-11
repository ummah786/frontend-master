import {
  Autocomplete,
  Box,
  ButtonGroup,
  MenuItem,
  TableCell,
  TextField,
  Checkbox,
} from "@mui/material";
import Typography from "@mui/joy/Typography";
import Button from "@mui/material/Button";
import React from "react";
import UserRole from "../../../jsonfile/Role.json";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  StyledTableCellTableView,
  StyledTableRow,
  formatDate,
} from "../../../commonStyle";
import axios from "axios";
import { addSalePurchase } from "../../../redux/Action";

const PaymentOutCreate = ({ onBooleanChange }) => {
  const theme = useTheme();
  const { partyUser } = useSelector((state) => state.partyReducerValue);
  const loginData = useSelector((state) => state.loginReducerValue);
  const [partyId, setPartyId] = useState("");
  const [totalTableAmount, setTotalTableAmount] = useState(0);
  const [paymentMode, setPaymentMode] = useState("");
  const [addNote, setAddNote] = useState("");
  const [paymentDate, setPaymentDate] = React.useState(dayjs("2024-01-01"));
  const [selectParty, setSelectParty] = useState("");
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const { salePurchaseUser } = useSelector(
    (state) => state.salePurchaseReducerValue
  );
  const dispatch = useDispatch();
  const handleSubmitPaymentCreate = async (e) => {
    e.preventDefault();
    let salePurchaseObject = {};
    const salePurchaseObjectResponse = filteredEmployees.filter((paymentIn) => {
      return paymentIn.amountSettled > 0;
    });
    console.log("Before Submit  ", salePurchaseObject);
    const totalSelectedPartyAmount = salePurchaseObjectResponse.reduce(
      (acc, emp) => {
        const parsedValue = parseFloat(emp.totalAmount);
        if (isNaN(parsedValue)) {
          return acc;
        }
        return acc + parsedValue;
      },
      0
    );
    salePurchaseObject["paymentDate"] = paymentDate;
    salePurchaseObject["paymentMode"] = paymentMode;
    salePurchaseObject["gson"] = JSON.stringify(salePurchaseObjectResponse);
    salePurchaseObject["amountSettled"] = paymentAmount;
    salePurchaseObject["invoiceAmount"] = totalSelectedPartyAmount;
    salePurchaseObject["billType"] = "PAYMENT_IN";

    salePurchaseObject["addNote"] = addNote;
    salePurchaseObject["primary_user_id"] = loginData.primary_user_id;
    salePurchaseObject["secondary_user_id"] = loginData.secondary_user_id;

    const partyDetails = partyUser.filter((part) => {
      return part.id === partyId;
    });

    //Party Information
    salePurchaseObject["partyId"] = partyId;
    salePurchaseObject["partyName"] = partyDetails[0].pname;
    salePurchaseObject["partyPhone"] = partyDetails[0].mobileNumber;
    salePurchaseObject["partyBillingAddress"] = partyDetails[0].billingAddress;
    salePurchaseObject["partyShippingAddress"] =
      partyDetails[0].shippingAddress;
    salePurchaseObject["partyGst"] = partyDetails[0].gstNumber;

    console.log("Sale Purchase Object ", salePurchaseObject);
    const response = await axios.post(
      "http://localhost:8700/hesabbook/sale/purchase/save",
      salePurchaseObject
    );
    console.log("Response   ", response);
    addObjectOnTopSalePurchase(response.data.response);
    onBooleanChange();
  };
  const addObjectOnTopSalePurchase = (newObject) => {
    const existingIndex = salePurchaseUser.findIndex(
      (item) => item.id === newObject.id
    );
    if (existingIndex === -1) {
      dispatch(addSalePurchase([newObject, ...salePurchaseUser]));
    } else {
      const updatedArray = [...salePurchaseUser];
      updatedArray[existingIndex] = newObject;
      dispatch(addSalePurchase(updatedArray));
    }
  };
  const onSelectAutoComplete = (event, value) => {
    setSelectParty(value);
    if (!value || value.id == null) {
      console.log("Invalid Party selected");
      setFilteredEmployees([]);
      setPartyId("");
      setPaymentAmount(0);
      return;
    }
    const partyIds = value.id;
    console.log("Party Id ", partyIds);
    setPartyId(partyIds);
    const filteredSalesBasedOnPartyId = salePurchaseUser.filter((sales) => {
      return (
        parseInt(sales.partyId) === partyIds &&
        parseFloat(sales.balanceAmount) > 0
      );
    });
    setFilteredEmployees(filteredSalesBasedOnPartyId);

    const totalSelectedPartyAmount = filteredSalesBasedOnPartyId.reduce(
      (acc, emp) => {
        const parsedValue = parseFloat(emp.totalAmount);
        if (isNaN(parsedValue)) {
          return acc;
        }
        return acc + parsedValue;
      },
      0
    );
    setTotalTableAmount(totalSelectedPartyAmount);

    console.log(
      "Filtered Sales Based on Party Id",
      filteredSalesBasedOnPartyId
    );

    console.log("Party response ", filteredSalesBasedOnPartyId);
  };
  useEffect(() => {
    const filtered = salePurchaseUser.filter((obj) =>
      selectedRows.includes(obj.id)
    );
    const addAdditionalCharge = filtered.reduce((acc, emp) => {
      const parsedValue = parseFloat(emp.balanceAmount);
      if (isNaN(parsedValue)) {
        return acc;
      }
      return acc + parsedValue;
    }, 0);
    setPaymentAmount(addAdditionalCharge);
    console.log("Filtered Value  ", filtered);
  }, [selectedRows]);

  const handlePaymentAmount = (event) => {
    let paymentAmount = parseFloat(event.target.value);
    let copyPaymentAmount = parseFloat(event.target.value);
    if (isNaN(paymentAmount)) {
      paymentAmount = 0;
      copyPaymentAmount = 0;
    }
    setPaymentAmount(paymentAmount);
    if (!partyId) {
      return;
    }
    const filteredSalesBasedOnPartyId = salePurchaseUser.filter((sales) => {
      return (
        parseInt(sales.partyId) === partyId &&
        parseFloat(sales.balanceAmount) > 0
      );
    });
    console.log(filteredSalesBasedOnPartyId);
    const updatedEmployees = filteredSalesBasedOnPartyId.map((employee) => {
      let updatedBalance = employee.balanceAmount;
      if (paymentAmount > 0) {
        const amountToAdd = Math.min(paymentAmount, employee.balanceAmount);
        paymentAmount -= amountToAdd;
        updatedBalance = employee.balanceAmount - amountToAdd;
      }
      return {
        ...employee,
        balanceAmount: updatedBalance,
        amountSettled: employee.balanceAmount - updatedBalance,
        updatedInvoice: "Y",
      };
    });
    if (copyPaymentAmount > 0) {
      setFilteredEmployees(updatedEmployees);
    } else {
      setFilteredEmployees(filteredSalesBasedOnPartyId);
    }
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
  return (
    <>
      <Box>
        <Box>
          <Button variant="contained">Payment Out</Button>
          <Box
            sx={{
              right: "0",
              float: "right",
              justifyContent: "space-around",
            }}
          >
            <ButtonGroup
              variant="contained"
              aria-label="Basic button group"
              sx={{ justifyContent: "space-around" }}
            >
              <Button onClick={onBooleanChange}>Cancel</Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={handleSubmitPaymentCreate}
              >
                Save
              </Button>
            </ButtonGroup>
          </Box>
        </Box>
      </Box>
      <Grid
        container
        spacing={3}
        sx={{
          backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        }}
      >
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <Box sx={{ display: "flex", margin: "20px" }}>
            <Box
              sx={{
                width: "50%",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            >
              <Box sx={{ margin: "7px" }}>
                <Autocomplete
                  disablePortal
                  onChange={onSelectAutoComplete}
                  id="combo-box-demo"
                  fullWidth={true}
                  options={partyUser}
                  getOptionLabel={(option) =>
                    `${option.pname} (${option.mobileNumber}) (${option.gstNumber})`
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Party Name /Mobile /GST Number"
                    />
                  )}
                />
              </Box>
              <Box sx={{ margin: "5px" }}>
                <TextField
                  id="outlined-basic"
                  label="Enter Payment Amount"
                  variant="outlined"
                  fullWidth={true}
                  value={paymentAmount}
                  onChange={(event) => handlePaymentAmount(event)}
                />
              </Box>
            </Box>
            <Box
              sx={{
                width: "50%",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            >
              <Box sx={{ display: "flex" }}>
                <Box sx={{ width: "50%", marginLeft: "5px" }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker", "DatePicker"]}>
                      <DatePicker
                        label="Payment  Date:"
                        value={paymentDate}
                        fullWidth={true}
                        onChange={(newValue) => setPaymentDate(newValue)}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Box>
                <Box sx={{ width: "50%", margin: "7px" }}>
                  <TextField
                    select
                    label="Payment Mode"
                    variant="outlined"
                    fullWidth={true}
                    value={paymentMode}
                    onChange={(event) => setPaymentMode(event.target.value)}
                  >
                    {UserRole.paymentMode.map((indi) => (
                      <MenuItem key={indi.name} value={indi.name}>
                        {indi.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              </Box>
              <Box sx={{ marginLeft: "5px", marginRight: "5px" }}>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  label="Notes"
                  value={addNote}
                  onChange={(e) => setAddNote(e.target.value)}
                  multiline
                  fullWidth={true}
                />
              </Box>
            </Box>
          </Box>
          <Box>
            <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
              <Table
                sx={{ minWidth: 120 }}
                aria-label="customized table"
                stickyHeader
              >
                <TableHead>
                  <TableRow>
                    <StyledTableCellTableView padding="checkbox">
                      <Checkbox
                        indeterminate={
                          selectedRows.length > 0 &&
                          selectedRows.length < filteredEmployees.length
                        }
                        checked={
                          selectedRows.length === filteredEmployees.length
                        }
                        onChange={() =>
                          setSelectedRows(
                            selectedRows.length === filteredEmployees.length
                              ? []
                              : filteredEmployees.map((row) => row.id)
                          )
                        }
                      />
                    </StyledTableCellTableView>
                    <StyledTableCellTableView align="center" width="10%">
                      Date
                    </StyledTableCellTableView>
                    <StyledTableCellTableView align="center" width="20%">
                      Due Date
                    </StyledTableCellTableView>
                    <StyledTableCellTableView align="center" width="20%">
                      Invoice Number
                    </StyledTableCellTableView>
                    <StyledTableCellTableView align="center" width="20%">
                      Invoice Amount
                    </StyledTableCellTableView>
                    <StyledTableCellTableView align="center" width="20%">
                      Amount Settled
                    </StyledTableCellTableView>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredEmployees.map((row) => (
                    <StyledTableRow key={row.id}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedRows.indexOf(row.id) !== -1}
                          onClick={() => handleCheckboxClick(row.id)}
                        />
                      </TableCell>
                      <TableCell align="center">
                        {formatDate(row.salesInvoiceDate)}
                      </TableCell>
                      <TableCell align="center">
                        {" "}
                        {formatDate(row.salesDueDate)}
                      </TableCell>
                      <TableCell align="center">{row.id}</TableCell>
                      <TableCell align="center">
                        {row.totalAmount} ({row.balanceAmount} Pending )
                      </TableCell>
                      <TableCell align="center">{row.amountSettled}</TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TableContainer component={Paper}>
              <Table aria-label="customized table" stickyHeader>
                <TableHead>
                  <TableRow>
                    <StyledTableCellTableView align="center" width="10%">
                      {"     "}
                    </StyledTableCellTableView>
                    <StyledTableCellTableView align="center" width="20%">
                      TOTAL
                    </StyledTableCellTableView>
                    <StyledTableCellTableView
                      align="center"
                      width="20%"
                    ></StyledTableCellTableView>
                    <StyledTableCellTableView align="center" width="20%">
                      {"    "} (₹) {totalTableAmount}
                    </StyledTableCellTableView>
                    <StyledTableCellTableView align="center" width="20%">
                      (₹) {paymentAmount}
                    </StyledTableCellTableView>
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </>
  );
};

export default PaymentOutCreate;
