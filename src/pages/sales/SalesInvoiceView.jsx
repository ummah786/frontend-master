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
import { useDispatch, useSelector } from "react-redux";
const SalesInvoiceView = ({ onBooleanChange, idFlagView }) => {
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [filterSalePurchase, setFilterSalePurchase] = useState([]);

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
    setFilterSalePurchase(filteredData);
    console.log("JSON ARRAY ", jsonArray);
    setFilteredEmployees(jsonArray);
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
                              <Typography>10</Typography>
                            </Box>
                            <Box sx={{ color: "#000000", display: "flex" }}>
                              <Typography>Invoice Date</Typography>
                              <Typography>:</Typography>
                              <Typography>12/11/2023</Typography>
                            </Box>
                            <Box
                              sx={{
                                color: "#000000",
                                display: "flex",
                              }}
                            >
                              <Typography>Due Date</Typography>
                              <Typography>:</Typography>
                              <Typography>12/12/2023</Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                      <Box>
                        <Typography>BILL TO</Typography>
                        <Typography>Asif</Typography>
                      </Box>
                      <Box>
                        <Box>
                          <TableContainer
                            component={Paper}
                            sx={{ maxHeight: 500 }}
                          >
                            <Table
                              sx={{ minWidth: 120 }}
                              aria-label="customized table"
                              stickyHeader
                            >
                              <TableHead>
                                <TableRow>
                                  <StyledTableCellTableView align="center">
                                    S.NO.
                                  </StyledTableCellTableView>
                                  <StyledTableCellTableView align="center">
                                    ITEMS
                                  </StyledTableCellTableView>
                                  <StyledTableCellTableView align="center">
                                    QTY.
                                  </StyledTableCellTableView>
                                  <StyledTableCellTableView align="center">
                                    RATE
                                  </StyledTableCellTableView>
                                  <StyledTableCellTableView align="center">
                                    TAX
                                  </StyledTableCellTableView>
                                  <StyledTableCellTableView align="center">
                                    AMOUNT
                                  </StyledTableCellTableView>
                                </TableRow>
                              </TableHead>
                              <TableBody> 
                                {filteredEmployees.map((row) => (
                                  <StyledTableRow key={row.id}>
                                    <TableCell align="center">
                                      {row.id}
                                    </TableCell>
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
                        </Box>
                      </Box>
                      <Box>
                        <table
                          id="items-table"
                          class="item_table"
                          data-subsection-id="3"
                        >
                          <thead>
                            <tr>
                              <th
                                scope="col"
                                class="items-table-header items-serial-number-header"
                                sx={{ backgroundColor: "#E2E2E2" }}
                              >
                                S.NO.
                              </th>
                              <th
                                scope="col"
                                class="items-table-header items-type-header"
                                sx={{ backgroundColor: "#E2E2E2" }}
                              >
                                ITEMS
                              </th>

                              <th
                                scope="col"
                                class="items-table-header items-qty-column"
                                sx={{ backgroundColor: "#E2E2E2" }}
                              >
                                QTY.
                              </th>

                              <th
                                scope="col"
                                class="items-table-header items-rate-header items-rate-column"
                                sx={{ backgroundColor: "#E2E2E2" }}
                              >
                                RATE
                              </th>

                              <th
                                scope="col"
                                class="items-table-header"
                                sx={{ backgroundColor: "#E2E2E2" }}
                              >
                                AMOUNT
                              </th>
                            </tr>
                          </thead>
                          <tbody id="items-table-content">
                            <tr>
                              <td
                                class="items-table-info item-serial-number"
                                data-row="0"
                              >
                                1
                              </td>
                              <td
                                class="items-table-info item-name-desc"
                                data-row="0"
                              >
                                <Box class="item-name">Meat Masala</Box>
                              </td>
                              <td
                                class="items-table-info item-quantity items-qty-column"
                                data-row="0"
                              >
                                1 PCS
                              </td>
                              <td
                                class="items-table-info item-rate items-rate-column"
                                data-row="0"
                              >
                                57
                              </td>
                              <td
                                class="items-table-info item-total nowrap"
                                data-row="0"
                              >
                                57
                              </td>
                            </tr>
                            <tr>
                              <td
                                class="items-table-info item-serial-number"
                                data-row="1"
                              >
                                2
                              </td>
                              <td
                                class="items-table-info item-name-desc"
                                data-row="1"
                              >
                                <Box class="item-name">Mirch</Box>
                              </td>
                              <td
                                class="items-table-info item-quantity items-qty-column"
                                data-row="1"
                              >
                                1 PCS
                              </td>
                              <td
                                class="items-table-info item-rate items-rate-column"
                                data-row="1"
                              >
                                21
                              </td>
                              <td
                                class="items-table-info item-total nowrap"
                                data-row="1"
                              >
                                21
                              </td>
                            </tr>
                            <tr class="empty-row" sx="height: 30mm">
                              <td
                                class="items-table-info item-serial-number"
                                sx=""
                                data-row="-1"
                              ></td>
                              <td
                                class="items-table-info item-name-desc"
                                sx=""
                                data-row="-1"
                              >
                                <Box class="item-name"></Box>
                                <Box class="item-imei"></Box>
                                <Box class="item-serial-no"></Box>
                              </td>
                              <td
                                class="items-table-info item-quantity items-qty-column"
                                sx=""
                                data-row="-1"
                              ></td>
                              <td
                                class="items-table-info item-rate items-rate-column"
                                sx=""
                                data-row="-1"
                              ></td>
                              <td
                                class="items-table-info item-total nowrap"
                                sx=""
                                data-row="-1"
                              ></td>
                            </tr>
                            <tr>
                              <td
                                class="items-table-total"
                                sx="background-color: #E2E2E2;"
                              ></td>
                              <td
                                id="items-table-total-label"
                                class="bold items-table-total"
                                sx="background-color: #E2E2E2;"
                              >
                                SUBTOTAL
                              </td>
                              <td
                                id="items-table-total-qty"
                                class="bold items-table-total items-qty-column"
                                sx="background-color: #E2E2E2;"
                              >
                                2
                              </td>
                              <td
                                class="items-table-total items-rate-column"
                                sx="background-color: #E2E2E2;"
                              ></td>
                              <td
                                id="items-table-total-amount"
                                class="bold items-table-total nowrap"
                                sx={{ backgroundColor: "#E2E2E2" }}
                              >
                                ₹ 78
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </Box>
                    </Box>
                  </Box>

                  <Box id="after-table-container">
                    <Box id="invoice-bottom-content-left">
                      <Box id="tnc" class="tnc" data-subsection-id="7">
                        <Box id="tnc-label">TERMS AND CONDITIONS</Box>
                        <Box id="tnc-value">
                          1. Goods once sold will not be taken back or exchanged
                          2. All disputes are subject to [ENTER_YOUR_CITY_NAME]
                          jurisdiction only
                        </Box>
                      </Box>
                    </Box>
                    <Box id="invoice-bottom-content-right">
                      <table id="invoice-total-table">
                        <tr class="invoice-total-section-row">
                          <td class="invoice-total-section-data">
                            TAXABLE AMOUNT
                          </td>
                          <td class="invoice-total-section-data">₹ 78</td>
                        </tr>
                        <tr>
                          <td colspan="2">
                            <Box class="hr-Boxider"></Box>
                          </td>
                        </tr>
                        <tr class="invoice-total-section-row bold">
                          <td class="invoice-total-section-data">
                            TOTAL AMOUNT
                          </td>
                          <td class="invoice-total-section-data">₹ 78</td>
                        </tr>
                        <tr>
                          <td colspan="2">
                            <Box class="hr-Boxider"></Box>
                          </td>
                        </tr>
                        <tr class="invoice-total-section-row">
                          <td class="invoice-total-section-data">
                            Received Amount
                          </td>
                          <td class="invoice-total-section-data">₹ 0</td>
                        </tr>
                      </table>

                      <Box
                        id="amount-words-container"
                        class="amount_in_words"
                        data-subsection-id="4"
                      >
                        <Box id="amount-words">
                          <Box id="amount-words-label">
                            Total Amount (in words)
                          </Box>
                          <Box id="amount-words-value">
                            Seventy Eight Rupees
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
