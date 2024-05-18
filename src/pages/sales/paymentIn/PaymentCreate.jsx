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
import { useState } from "react";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { StyledTableCellTableView, StyledTableRow } from "../../../commonStyle";

const PaymentCreate = ({ onBooleanChange }) => {
  const theme = useTheme();
  const { partyUser } = useSelector((state) => state.partyReducerValue);
  const [paymentDate, setPaymentDate] = React.useState(dayjs("2024-01-01"));
  const [selectParty, setSelectParty] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const { salePurchaseUser } = useSelector(
    (state) => state.salePurchaseReducerValue
  );

  const handleSubmitPaymentCreate = async (e) => {
    e.preventDefault();
  };
  const onSelectAutoComplete = (event, value) => {
    setSelectParty(value);
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
          <Button variant="contained">Payment In</Button>
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
                  //  value={manageUserObj.pname}
                  //  onChange={(event) => handleTextFieldChangeParty(event, "pname")}
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
                        label="Sales Invoice Date:"
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
                    // value={billTo.pname}
                    //   onChange={(event) => handleBilltoSHipToo(event)}
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
                  multiline
                  fullWidth={true}
                />
              </Box>
            </Box>
          </Box>
          <Box>
            <TableContainer
              component={Paper}
              sx={{ maxHeight: 300, minHeight: 300 }}
            >
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
                          selectedRows.length < salePurchaseUser.length
                        }
                        checked={
                          selectedRows.length === salePurchaseUser.length
                        }
                        onChange={() =>
                          setSelectedRows(
                            selectedRows.length === salePurchaseUser.length
                              ? []
                              : salePurchaseUser.map((row) => row.id)
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
                      <TableCell align="center">{row.id}</TableCell>
                      <TableCell align="center">{row.item}</TableCell>
                      <TableCell align="center">{row.quantity}</TableCell>
                      <TableCell align="center">{row.salePrice}</TableCell>
                      <TableCell align="center">{row.gst}</TableCell>
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
                      {"    "}
                    </StyledTableCellTableView>
                    <StyledTableCellTableView align="center" width="20%">
                      (₹)
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

export default PaymentCreate;
