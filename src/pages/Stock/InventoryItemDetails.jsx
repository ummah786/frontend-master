import React from 'react';
import {Button, Divider, Grid, Typography} from '@mui/material';

export const InventoryItemDetails = ({item}) => {
    return (
        <div>
            <Typography variant="h4" component="div" gutterBottom>
                {item.name} <Button variant="contained" color="success" sx={{ml: 2}}>In Stock</Button>
            </Typography>
            <Button variant="outlined" color="primary" sx={{mr: 1}}>Adjust Stock</Button>
            <Button variant="outlined" color="secondary">Edit</Button>
            <Divider sx={{my: 2}}/>

            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography variant="h6" gutterBottom>General Details</Typography>
                    <Typography><strong>Item Name:</strong> {item.name}</Typography>
                    <Typography><strong>Current Stock:</strong> {item.stock} PCS</Typography>
                    <Typography><strong>Low Stock Warning:</strong> Disabled</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" gutterBottom>Pricing Details</Typography>
                    <Typography><strong>Sales Price:</strong> ₹50 With Tax</Typography>
                    <Typography><strong>Purchase Price:</strong> ₹0 With Tax</Typography>
                    <Typography><strong>GST Tax Rate:</strong> 5%</Typography>
                </Grid>
            </Grid>
        </div>
    );
};