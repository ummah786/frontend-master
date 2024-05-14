import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  TableCell,
  TextField,
  Typography,
} from "@mui/material";
import { Tooltip, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState } from "react";
import { Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import PrintIcon from "@mui/icons-material/Print";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const SalesInvoiceView = ({ onBooleanChange }) => {

    const [selectedOption, setSelectedOption] = useState('');
    const handleChange = (event) => {
        setSelectedOption(event.target.value);
        handleMenuItemClick(event.target.value);
      };
    
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
        <Box>
          <TextField
            select
            sx={{ marginLeft: "100px",width:"150px" }}
            variant="outlined"
            margin="normal"
            value={selectedOption}
            onChange={handleChange}
            label="Download Pdf"
          >
            <MenuItem onClick={() => handleMenuItemClick("Download Duplicate")}>
              <ListItemIcon>
                <FileCopyIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Download Duplicate" />
            </MenuItem>
            <MenuItem
              onClick={() => handleMenuItemClick("Download Triplicate")}
            >
              <ListItemIcon>
                <PrintIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Download Triplicate" />
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick("Download Pdf")}>
              <ListItemIcon>
                <PictureAsPdfIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Download Pdf" />
            </MenuItem>
          </TextField>
        </Box>
      </Box>
    </>
  );
};

export default SalesInvoiceView;
