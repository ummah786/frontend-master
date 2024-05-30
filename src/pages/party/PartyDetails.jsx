import React from 'react';
import { Typography, Grid, Paper } from '@mui/material';

const PartyDetails = ({ partyName }) => {
    // Here you would fetch and display the party details based on the selected party
    const partyDetails = {
        'Cash Sale': {
            mobile: '6299669816',
            type: 'Customer',
            category: '',
            openingBalance: 0,
            creditPeriod: '0 Days',
            creditLimit: 0,
            gstin: '-',
            pan: '-',
            billingAddress: '-',
            shippingAddress: '-',
        },
        Raju: {
            // details for Raju
        },
        Sandeep: {
            // details for Sandeep
        },
    }[partyName];

    return (
        <div>
            <Typography variant="h5">{partyName}</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Paper style={{ padding: 16 }}>
                        <Typography variant="subtitle1">General Details</Typography>
                        <Typography variant="body2">Party Name: {partyName}</Typography>
                        <Typography variant="body2">Mobile Number: {partyDetails.mobile}</Typography>
                        <Typography variant="body2">Party Type: {partyDetails.type}</Typography>
                        <Typography variant="body2">Party Category: {partyDetails.category}</Typography>
                        <Typography variant="body2">Opening Balance: ₹{partyDetails.openingBalance}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper style={{ padding: 16 }}>
                        <Typography variant="subtitle1">Business Details</Typography>
                        <Typography variant="body2">GSTIN: {partyDetails.gstin}</Typography>
                        <Typography variant="body2">PAN Number: {partyDetails.pan}</Typography>
                        <Typography variant="body2">Billing Address: {partyDetails.billingAddress}</Typography>
                        <Typography variant="body2">Shipping Address: {partyDetails.shippingAddress}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper style={{ padding: 16 }}>
                        <Typography variant="subtitle1">Credit Details</Typography>
                        <Typography variant="body2">Credit Period: {partyDetails.creditPeriod}</Typography>
                        <Typography variant="body2">Credit Limit: ₹{partyDetails.creditLimit}</Typography>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default PartyDetails;
