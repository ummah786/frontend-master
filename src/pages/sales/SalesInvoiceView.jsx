import {
  Box,
  Button,
  ButtonGroup,
  TableCell,
  TextField,
  Typography,
} from "@mui/material";
import { Tooltip, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import EditIcon from "@mui/icons-material/Edit";
import { MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import UserRole from "../../jsonfile/Role";
import Paper from "@mui/material/Paper";
import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
  StyledTableCellTableView,
  StyledTableCell,
  StyledTableRow,
} from "../../commonStyle";

import { numberToWords } from "number-to-words";
import { useDispatch, useSelector } from "react-redux";
const SalesInvoiceView = ({ onBooleanChange, idFlagView }) => {
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [filterSalePurchase, setFilterSalePurchase] = useState([]);
  const [tableQty, setTableQty] = useState("");
  const [tableAmount, setTableAmount] = useState("");
  const [tableTax, setTableTax] = useState("");

  const loginData = useSelector((state) => state.loginReducerValue);
  const { salePurchaseUser } = useSelector(
    (state) => state.salePurchaseReducerValue
  );
  const dispatch = useDispatch();
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    handleMenuItemClick(event.target.value);
  };
  const theme = useTheme();
  const handleMenuItemClick = (action) => {
    console.log(action);
    // Add your logic for handling the selected option here
  };
  const handleMainView = () => {
    onBooleanChange();
  };
  useEffect(() => {
    if (!idFlagView) {
      return;
    }
    const filteredData = salePurchaseUser.filter((employee) => {
      return employee.id === idFlagView;
    });
    if (filteredData.length === 0) {
      return;
    }
    const jsonArray = JSON.parse(filteredData[0].items);
    setFilterSalePurchase(filteredData[0]);
    setFilteredEmployees(jsonArray);
    const quantityTable = jsonArray.reduce((total, item) => {
      const quantity = parseFloat(item.quantity);
      return isNaN(quantity) ? total : total + quantity;
    }, 0);
    setTableQty(quantityTable);
    const amountTable = jsonArray.reduce((total, item) => {
      const amount = parseFloat(item.total);
      return isNaN(amount) ? total : total + amount;
    }, 0);

    setTableAmount(amountTable);
    const taxTable = jsonArray.reduce((total, item) => {
      const gst = parseFloat(item.gst);
      const amount = parseFloat(item.total);
      if (!isNaN(gst) && !isNaN(amount)) {
        return total + (gst * amount) / 100;
      } else {
        return total;
      }
    }, 0);
    setTableTax(taxTable);
  }, [idFlagView, salePurchaseUser]);

  return (
    <>
      <Box>
        <Box>
          <Button variant="contained" onClick={handleMainView}>
            Sales Invoice
          </Button>
          <Box sx={{ right: "0", float: "right" }}>
            <ButtonGroup variant="contained" aria-label="Basic button group">
              <Tooltip title="Duplicate this invoice">
                <IconButton aria-label="edit">
                  <ContentCopyRoundedIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit">
                <IconButton
                  aria-label="edit"
                  //onClick={() => handleEdit(shipIn.id, shipIn, shipTo.id)}
                >
                  <EditIcon />
                </IconButton>{" "}
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton
                  aria-label="edit"
                  //onClick={() => handleEdit(shipIn.id, shipIn, shipTo.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </ButtonGroup>
          </Box>
        </Box>
        <Box sx={{ display: "flex" }}>
          <TextField
            select
            sx={{ margin: "10px", width: "150px" }}
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
            sx={{ margin: "10px", width: "150px" }}
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
            sx={{ margin: "10px", width: "150px" }}
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

          <Box sx={{ right: "0", float: "right" }}>
            <Button variant="outlined" sx={{ margin: "10px", width: "150px" }}>
              Record Payment In
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            backgroundColor: theme.palette.grey[300],
            padding: 2,
            borderRadius: 1,
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={2}></Grid>
            <Grid item xs={8}>
              <Box
                sx={{
                  backgroundColor:
                    theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                  padding: theme.spacing(5),
                }}
              >
                <Box>
                  <Box>
                    <Box>LOGO</Box>
                    <Box sx={{ margin: "5px" }}>
                      <Box sx={{ display: "flex" }}>
                        <Box sx={{ width: "50%" }}>
                          <Box sx={{ color: "#000000", display: "flex" }}>
                            <Typography>Cosmetice Name</Typography>
                          </Box>
                          <Box sx={{ color: "#000000", display: "flex" }}>
                            <Typography>Mobile :</Typography>
                            <Typography>8340719781</Typography>
                          </Box>
                        </Box>
                        <Box sx={{ width: "50%" }}>
                          <Box sx={{ color: "#000000", display: "flex" }}>
                            <Typography>BILL OF SUPPLY</Typography>
                            <Typography>Original for Recipient</Typography>
                          </Box>
                          <Box sx={{ color: "#000000", display: "flex" }}>
                            <Typography>Invoice No.</Typography>
                            <Typography>:</Typography>
                            <Typography>
                              {salePurchaseUser.salesInvoiceNo}
                            </Typography>
                          </Box>
                          <Box sx={{ color: "#000000", display: "flex" }}>
                            <Typography>Invoice Date</Typography>
                            <Typography>:</Typography>
                            <Typography>
                              {salePurchaseUser.salesInvoiceDate}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              color: "#000000",
                              display: "flex",
                            }}
                          >
                            <Typography>Due Date</Typography>
                            <Typography>:</Typography>
                            <Typography>
                              {salePurchaseUser.salesDueDate}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                    <Box>
                      <Typography>BILL TO</Typography>
                      <Typography>{salePurchaseUser.partyName}</Typography>
                    </Box>
                    <Box>
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
                                <StyledTableCellTableView
                                  align="center"
                                  width="10%"
                                >
                                  S.NO.
                                </StyledTableCellTableView>
                                <StyledTableCellTableView
                                  align="center"
                                  width="20%"
                                >
                                  ITEMS
                                </StyledTableCellTableView>
                                <StyledTableCellTableView
                                  align="center"
                                  width="20%"
                                >
                                  QTY.
                                </StyledTableCellTableView>
                                <StyledTableCellTableView
                                  align="center"
                                  width="20%"
                                >
                                  RATE
                                </StyledTableCellTableView>
                                <StyledTableCellTableView
                                  align="center"
                                  width="20%"
                                >
                                  TAX
                                </StyledTableCellTableView>
                                <StyledTableCellTableView
                                  align="center"
                                  width="20%"
                                >
                                  AMOUNT
                                </StyledTableCellTableView>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {filteredEmployees.map((row) => (
                                <StyledTableRow key={row.id}>
                                  <TableCell align="center">{row.id}</TableCell>
                                  <TableCell align="center">
                                    {row.item}
                                  </TableCell>
                                  <TableCell align="center">
                                    {row.quantity}
                                  </TableCell>
                                  <TableCell align="center">
                                    {row.salePrice}
                                  </TableCell>
                                  <TableCell align="center">
                                    {row.gst}
                                  </TableCell>
                                  <TableCell align="center">
                                    {row.total}
                                  </TableCell>
                                </StyledTableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                        <TableContainer component={Paper}>
                          <Table aria-label="customized table" stickyHeader>
                            <TableHead>
                              <TableRow>
                                <StyledTableCellTableView
                                  align="center"
                                  width="10%"
                                >
                                  {"     "}
                                </StyledTableCellTableView>
                                <StyledTableCellTableView
                                  align="center"
                                  width="20%"
                                >
                                  TOTAL
                                </StyledTableCellTableView>
                                <StyledTableCellTableView
                                  align="center"
                                  width="20%"
                                >
                                  {tableQty}
                                </StyledTableCellTableView>
                                <StyledTableCellTableView
                                  align="center"
                                  width="20%"
                                >
                                  {"    "}
                                </StyledTableCellTableView>
                                <StyledTableCellTableView
                                  align="center"
                                  width="20%"
                                >
                                  (₹) {parseFloat(tableTax).toFixed(2)}
                                </StyledTableCellTableView>
                                <StyledTableCellTableView
                                  align="center"
                                  width="20%"
                                >
                                  (₹){parseFloat(tableAmount).toFixed(2)}
                                </StyledTableCellTableView>
                              </TableRow>
                            </TableHead>
                          </Table>
                        </TableContainer>
                      </Box>
                    </Box>
                    <Box></Box>
                    <Box display="flex">
                      <Box
                        sx={{
                          width: "50%",
                          margin: "5px",
                          alignItems: "center",
                        }}
                      >
                        <Typography variant="h6">
                          TERMS AND CONDITIONS
                        </Typography>
                        <Box>
                          <Typography variant="body2">
                            {filterSalePurchase.addNote
                              ? filterSalePurchase.addNote
                              : "1. Goods once sold will not be taken back or exchanged"}
                          </Typography>{" "}
                          addTermsAndCondition
                          <Typography variant="body2">
                            {filterSalePurchase.addTermsAndCondition
                              ? filterSalePurchase.addTermsAndCondition
                              : "2. All disputes are subject to[ENTER_YOUR_CITY_NAME] jurisdiction only"}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ width: "50%" }}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            margin: "5px",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              borderBottom: "1px solid black",
                              paddingBottom: "5px",
                              marginBottom: "5px",
                              margin: "2px",
                            }}
                          >
                            <Typography variant="body2">
                              TAXABLE AMOUNT
                            </Typography>
                            <Typography variant="body2">
                              ₹ {filterSalePurchase.totalAmount}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              borderBottom: "1px solid black",
                              paddingBottom: "5px",
                              marginBottom: "5px",
                              margin: "2px",
                            }}
                          >
                            <Typography variant="body2">
                              TOTAL AMOUNT
                            </Typography>
                            <Typography variant="body2">
                              ₹ {filterSalePurchase.totalAmount}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              borderBottom: "1px solid black",
                              paddingBottom: "5px",
                              marginBottom: "5px",
                              margin: "2px",
                            }}
                          >
                            <Typography variant="body2">
                              Received Amount
                            </Typography>
                            <Typography variant="body2">
                              ₹ {filterSalePurchase.amountReceived}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              textDecoration: "underline",
                              margin: "2px",
                            }}
                          >
                            <Typography variant="body2">
                              Balance Amount
                            </Typography>
                            <Typography variant="body2">
                              ₹ {filterSalePurchase.balanceAmount}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              marginTop: "15px",
                              margin: "2px",
                              display: "inline-block",
                            }}
                          >
                            <Typography
                              variant="h6"
                              sx={{ textDecoration: "underline" }}
                            >
                              Total Amount (in words)
                            </Typography>
                            <Typography
                              variant="body1"
                              sx={{
                                position: "absolute",
                                right: 300,
                                bottom: "calc(-1 * 0.2em)",
                                borderBottom: "1px solid black",
                              }}
                            >
                              {filterSalePurchase.totalAmount
                                ? numberToWords.toWords(
                                    filterSalePurchase.totalAmount
                                  )
                                : "Not available"}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={2}></Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default SalesInvoiceView;
