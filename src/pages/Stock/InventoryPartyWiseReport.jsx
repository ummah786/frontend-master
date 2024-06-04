import React from 'react';
import {
    Button,
    Grid,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';


export const InventoryPartyWiseReport = ({item}) => {
    const reports = [
        {name: 'Raju', salesQuantity: 2, salesAmount: '₹95.24', purchaseQuantity: 0, purchaseAmount: '-'},
    ];

    return (
        <div>
            <Grid container justifyContent="space-between" alignItems="center" sx={{mb: 2}}>
                <Select defaultValue="Last 365 Days">
                    <MenuItem value="Last 30 Days">Last 30 Days</MenuItem>
                    <MenuItem value="Last 90 Days">Last 90 Days</MenuItem>
                    <MenuItem value="Last 365 Days">Last 365 Days</MenuItem>
                </Select>
                <div>
                    <Button variant="outlined" sx={{mr: 1}}>Download</Button>
                    <Button variant="outlined">Print PDF</Button>
                </div>
            </Grid>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Party Name</TableCell>
                            <TableCell>Sales Quantity</TableCell>
                            <TableCell>Sales Amount</TableCell>
                            <TableCell>Purchase Quantity</TableCell>
                            <TableCell>Purchase Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reports.map((report, index) => (
                            <TableRow key={index}>
                                <TableCell>{report.name}</TableCell>
                                <TableCell>{report.salesQuantity}</TableCell>
                                <TableCell>{report.salesAmount}</TableCell>
                                <TableCell>{report.purchaseQuantity}</TableCell>
                                <TableCell>{report.purchaseAmount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

