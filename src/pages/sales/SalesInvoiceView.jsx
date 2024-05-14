import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  TableCell,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const SalesInvoiceView = ({ onBooleanChange }) => {
  const handleMainView = () => {
    onBooleanChange();
  };
  return (
    <>
      <div>SalesInvoiceView</div>
      <Button onClick={handleMainView}>Change to Original</Button>
    </>
  );
};

export default SalesInvoiceView;
