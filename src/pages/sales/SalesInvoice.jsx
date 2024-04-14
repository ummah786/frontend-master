import {Box} from "@mui/material";
import Typography from "@mui/joy/Typography";
import {SalesInvoiceCreate} from "./SalesInvoiceCreate";

export const SalesInvoice = () => {
    return (
        <>
            <Box>
                <Typography>Sales Invoice</Typography>
                <SalesInvoiceCreate/>
            </Box>
        </>
    )
}