import React from 'react';
import {
    Container, Box, Typography, Button, TextField, Grid, FormControl,
    Select, MenuItem, InputLabel, Checkbox, FormControlLabel, Paper
} from '@mui/material';

const BusinessSettings = () => {
    const [businessType, setBusinessType] = React.useState('');
    const [industryType, setIndustryType] = React.useState('');
    const [state, setState] = React.useState('');
    const [gstRegistered, setGstRegistered] = React.useState('No');
    const [eInvoicing, setEInvoicing] = React.useState(false);
    const [enableTds, setEnableTds] = React.useState(false);
    const [enableTcs, setEnableTcs] = React.useState(false);

    const handleSelectChange = (event, setter) => {
        setter(event.target.value);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Business Settings
            </Typography>
            <Button variant="contained" color="warning" sx={{ mb: 2 }}>
                Create new business
            </Button>
            <Paper sx={{ p: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Business Name"
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Button variant="contained" component="label">
                            Upload Image
                            <input type="file" hidden />
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Company Phone Number"
                            defaultValue="8340719781"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Company E-Mail"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Billing Address"
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                            <InputLabel>State</InputLabel>
                            <Select
                                value={state}
                                onChange={(e) => handleSelectChange(e, setState)}
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                <MenuItem value="State1">State 1</MenuItem>
                                <MenuItem value="State2">State 2</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            label="Pincode"
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            label="City"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <InputLabel>Business Type</InputLabel>
                            <Select
                                value={businessType}
                                onChange={(e) => handleSelectChange(e, setBusinessType)}
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                <MenuItem value="Wholesaler">Wholesaler</MenuItem>
                                <MenuItem value="Retailer">Retailer</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <InputLabel>Industry Type</InputLabel>
                            <Select
                                value={industryType}
                                onChange={(e) => handleSelectChange(e, setIndustryType)}
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                <MenuItem value="Electronics">Electronics</MenuItem>
                                <MenuItem value="Clothing">Clothing</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={gstRegistered === 'Yes'}
                                    onChange={(e) => setGstRegistered(e.target.checked ? 'Yes' : 'No')}
                                />
                            }
                            label="Are you GST Registered?"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={eInvoicing}
                                    onChange={(e) => setEInvoicing(e.target.checked)}
                                />
                            }
                            label="Enable e-Invoicing"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="PAN Number"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={enableTds}
                                    onChange={(e) => setEnableTds(e.target.checked)}
                                />
                            }
                            label="Enable TDS"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={enableTcs}
                                    onChange={(e) => setEnableTcs(e.target.checked)}
                                />
                            }
                            label="Enable TCS"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="outlined" color="primary" sx={{ mb: 2 }}>
                            Data Export to Tally
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" sx={{ mb: 2 }}>
                            Save Changes
                        </Button>
                        <Button variant="outlined" color="secondary" sx={{ mb: 2, ml: 2 }}>
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" sx={{ mb: 2 }}>
                            Create New Business
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default BusinessSettings;
