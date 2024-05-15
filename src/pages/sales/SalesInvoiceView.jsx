import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Tooltip, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import EditIcon from "@mui/icons-material/Edit";
import { Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import UserRole from "../../jsonfile/Role";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import * as React from "react";
import { StyledTableCell, StyledTableRow } from "../../commonStyle";
import { useEffect, useState } from "react";
import ArticleIcon from "@mui/icons-material/Article";
import { useTheme } from "@mui/material/styles";
const Boxx = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  padding: theme.spacing(6),
  textAlign: "center",
}));

const SalesInvoiceView = ({ onBooleanChange, idFlagView }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [filterSalePurchase, setFilterSalePurchase] = useState([]);
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
    console.log("ID Flag View  ", idFlagView);
  }, [idFlagView]);

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
            flexGrow: 1,
            backgroundColor: theme.palette.grey[300],
            padding: 2,
            borderRadius: 1,
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={2}></Grid>
            <Grid item xs={8}>
              <Boxx>
                <Box>
                  <Box>
                    <Box>
                      <Box>LOGO</Box>
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
                          <Box sx={{ color: "#000000", display: "flex",margin:'10px' }}>
                            <Typography>Due Date</Typography>
                            <Typography>:</Typography>
                            <Typography>12/12/2023</Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>

                    <Box></Box>
                  </Box>
                  <Box>
                    <Box
                      sx={{
                        color: "#000000",
                        alignItems: "end",
                        display: "flex",
                      }}
                    >
                      <Box>
                        <Typography>BILL TO</Typography>
                        <Typography>Asif</Typography>
                      </Box>
                    </Box>
                  </Box>

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
              </Boxx>
            </Grid>
            <Grid item xs={2}></Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default SalesInvoiceView;
