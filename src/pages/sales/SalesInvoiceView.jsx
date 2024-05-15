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
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const SalesInvoiceView = ({ onBooleanChange }) => {
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
                <Typography>How</Typography>
                <Typography>How</Typography> <Typography>How</Typography>
                <Typography>How</Typography>
                <Typography>How</Typography>
                <Typography>How</Typography>
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
