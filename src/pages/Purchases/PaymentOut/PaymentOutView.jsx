import {PaymentOutEdit} from "./PaymentOutEdit";
import {Box, Button, ButtonGroup, IconButton, MenuItem, TextField, Tooltip,} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import EditIcon from "@mui/icons-material/Edit";
import UserRole from "../../../jsonfile/Role";
import {useTheme} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import React, {useEffect, useState} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {formatDate, StyledTableCell, StyledTableRow,} from "../../../commonStyle";
import axios from "axios";
import dayjs from "dayjs";
import {useDispatch, useSelector} from "react-redux";
import {removeSalePurchase} from "../../../redux/Action";

export const PaymentOutView = ({onBooleanChange, idFlagView}) => {
  const [editFlag, setEditFlag] = useState(true);

  const [paymentDate, setPaymentDate] = React.useState(dayjs("2024-01-01"));
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [note, setNote] = useState("");

  const [openPaymentRecord, setOpenPaymentRecord] = React.useState(false);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [filterSalePurchase, setFilterSalePurchase] = useState([]);
  const [tableQty, setTableQty] = useState("");
  const [tableAmount, setTableAmount] = useState("");
  const [tableTax, setTableTax] = useState("");

  const loginData = useSelector((state) => state.loginReducerValue);
  const {salePurchaseUser} = useSelector(
      (state) => state.salePurchaseReducerValue
  );
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("idFlagView >>> " + idFlagView);
    const values = salePurchaseUser.filter((flag) => {
      return flag.id === idFlagView;
    });

    setFilteredEmployees(values[0]);
    setFilterSalePurchase(
        values[0]
    )
    console.log("Filtered EMployee   ", values[0]);
  }, [idFlagView]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 1,
  };

  const handleSubmitForPayment = (e) => {
    e.prevetDefault();
  };
  const handleDelete = async (event) => {
    event.preventDefault();
    const response = await axios.post(
        `http://localhost:8700/hesabbook/sale/purchase/delete/${filterSalePurchase.id}`
    );
    dispatch(removeSalePurchase(filterSalePurchase.id));
    console.log("Submit Response :--    ", response.data);
    handleMainView();
    //  TODO handle to remove data from Redux
  };
  const theme = useTheme();
  const handleMainView = () => {
    onBooleanChange();
  };
  const editFlagValue = () => {
    setEditFlag((prevState) => !prevState);
  };
  return (
      <>
        {editFlag ? (
            <Box>
              <Box>
                <Box>
                  <Button variant="contained" onClick={handleMainView}>
                    Payment Out View
                  </Button>
                  <Box sx={{right: "0", float: "right"}}>
                    <ButtonGroup
                        variant="contained"
                        aria-label="Basic button group"
                    >
                      <Tooltip title="Duplicate this invoice">
                        <IconButton aria-label="edit">
                          <ContentCopyRoundedIcon/>
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton aria-label="edit" onClick={editFlagValue}>
                          <EditIcon/>
                        </IconButton>{" "}
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton aria-label="edit" onClick={handleDelete}>
                          <DeleteIcon/>
                        </IconButton>
                      </Tooltip>
                    </ButtonGroup>
                  </Box>
                </Box>
                <Box>
                  <TextField
                      select
                      sx={{margin: "10px", width: "150px"}}
                      label="Download PDF"
                      variant="outlined"
                      margin="normal"
                      // value={billTo.pname}
                      //  onChange={(event) => handleBilltoSHipToo(event)}
                  >
                    {UserRole.downloadOption.map((indi) => (
                        <MenuItem key={indi.name} value={indi.name}>
                          {indi.name}
                        </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                      select
                      sx={{margin: "10px", width: "150px"}}
                      label="Print PDF"
                      variant="outlined"
                      margin="normal"
                      // value={billTo.pname}
                      //  onChange={(event) => handleBilltoSHipToo(event)}
                  >
                    {UserRole.printPDF.map((indi) => (
                        <MenuItem key={indi.name} value={indi.name}>
                          {indi.name}
                        </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                      select
                      sx={{margin: "10px", width: "150px"}}
                      label="Share"
                      variant="outlined"
                      margin="normal"
                      // value={billTo.pname}
                      //  onChange={(event) => handleBilltoSHipToo(event)}
                  >
                    {UserRole.shareType.map((indi) => (
                        <MenuItem key={indi.name} value={indi.name}>
                          {indi.name}
                        </MenuItem>
                    ))}
                  </TextField>
                </Box>
              </Box>
              <Box sx={{display: "flex"}}></Box>
              <Box
                  sx={{
                    padding: 2,
                    borderRadius: 1,
                  }}
              >
                <Box sx={{display: "flex"}}>
                  <Box
                      sx={{
                        width: "50%",
                        border: "1px solid #ccc",
                        boxShadow: 3,
                        padding: 2,
                        margin: 2,
                        display: "flex",
                        justifyContent: "space-between",
                        borderRadius: 1,
                      }}
                  >
                    <TextField
                        label="Party Name"
                        disabled={true}
                        value={filteredEmployees.partyName}
                    />
                    <TextField
                        label="Payment Date"
                        disabled={true}
                        value={formatDate(filteredEmployees.paymentDate)}
                    />
                  </Box>
                  <Box
                      sx={{
                        width: "50%",
                        border: "1px solid #ccc",
                        boxShadow: 3,
                        display: "flex",
                        justifyContent: "space-between",
                        padding: 2,
                        alignItems: "center",
                        margin: 2,
                        borderRadius: 1,
                      }}
                  >
                    <TextField
                        disabled={true}
                        label="Payment Amount"
                        value={filteredEmployees.amountSettled}
                    />
                    <TextField
                        disabled={true}
                        label="Payment Type"
                        value={filteredEmployees.paymentMode}
                    />
                  </Box>
                </Box>
                <Box
                    sx={{
                      border: "1px solid #ccc",
                      boxShadow: 3,
                      padding: 2,
                      margin: 2,
                      borderRadius: 1,
                    }}
                >
                  <TextField
                      disabled={true}
                      label="Notes"
                      fullWidth={true}
                      value={filteredEmployees.addNote}
                  />
                </Box>
              </Box>
              <Box
                  sx={{
                    border: "1px solid #ccc",
                    boxShadow: 3,
                    padding: 2,
                    margin: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    borderRadius: 1,
                  }}
              >
                <TableContainer component={Paper} sx={{maxHeight: 500}}>
                  <Table
                      sx={{minWidth: 1250}}
                      aria-label="customized table"
                      stickyHeader
                  >
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="center">Date</StyledTableCell>
                        <StyledTableCell align="center">
                          Invoice Number
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Invoice Amount
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Invoice Amount Settled
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <StyledTableRow>
                        <StyledTableCell align="center">
                          {formatDate(filteredEmployees.paymentDate)}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {filteredEmployees.id}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          (₹) {filteredEmployees.invoiceAmount}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {" "}
                          (₹) {filteredEmployees.amountSettled}
                        </StyledTableCell>
                      </StyledTableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
        ) : (
            <>
              <PaymentOutEdit
                  onBooleanChange={onBooleanChange}
                  idFlagView={idFlagView}
                  editFlag={editFlag}
                  filterSalePurchase={filterSalePurchase}
              />
            </>
        )}
      </>
  );
};
