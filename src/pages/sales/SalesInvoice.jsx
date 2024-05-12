import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/joy/Typography";
import { SalesInvoiceCreate } from "./SalesInvoiceCreate";

export const SalesInvoice = () => {
  const [flag, setFlag] = useState(true);
  const handleBooleanChange = () => {
    setFlag((prevState) => !prevState);
  };
  return (
    <>
      {flag ? (
        <Typography>
          Text to display when flag is true
          <Button onClick={handleBooleanChange}>Button</Button>
        </Typography>
      ) : (
        <SalesInvoiceCreate onBooleanChange={handleBooleanChange} />
      )}
    </>
  );
};
