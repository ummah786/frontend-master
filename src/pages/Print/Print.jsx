import React from 'react';
import { Container, Paper, Box, Button, Typography, Tabs, Tab, TextField, Grid } from '@mui/material';

export const Print = () => {
    const [tabIndex, setTabIndex] = React.useState(0);

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    return (
        <Container maxWidth="md">
            <Paper elevation={3}>
                <Box p={2}>
                    <Typography variant="h6">Printing</Typography>
                    <Tabs value={tabIndex} onChange={handleTabChange} indicatorColor="primary" textColor="primary">
                        <Tab label="Thermal Printer" />
                        <Tab label="Barcode Printer" />
                    </Tabs>

                    <Box mt={2}>
                        {tabIndex === 0 && (
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={2}>
                                    <Button variant="outlined" fullWidth>2 inch</Button>
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <Button variant="outlined" fullWidth>3 inch</Button>
                                </Grid>
                            </Grid>
                        )}
                        {tabIndex === 1 && (
                            <Typography variant="body1">Barcode Printer settings go here...</Typography>
                        )}
                    </Box>

                    <Box mt={2} p={2} border={1} borderColor="grey.300" borderRadius={4} bgcolor="grey.100">
                        <Typography variant="h6" gutterBottom>My BillBook</Typography>
                        <Typography variant="body2" component="p">#56, 2nd Floor, 12th Main Road, Sector 6, HSR Layout Land Mark; next to Rasaganga Veg Restaurant, HSR BDA, Bengaluru, Karnataka 560102</Typography>
                        <Typography variant="body2" component="p">Mobile: 0387434123</Typography>
                        <Typography variant="body2" component="p">Date: 23-09-2020</Typography>
                        <Typography variant="body2" component="p">Invoice Number: 2</Typography>
                        <Typography variant="body2" component="p">Bill To: Cash sale</Typography>

                        <table style={{ width: '100%', marginTop: '1rem' }}>
                            <thead>
                            <tr>
                                <th>No</th>
                                <th>Item Description</th>
                                <th>Qty</th>
                                <th>Units</th>
                                <th>Rate</th>
                                <th>Amount</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>1</td>
                                <td>Bisk Farm Tidbit 200 Gm</td>
                                <td>1.0</td>
                                <td>PCS</td>
                                <td>20.0</td>
                                <td>20.0</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Cadbury Celebrations Premium Assorted Chocolate Gift Pack, 286.3 Gm</td>
                                <td>1.0</td>
                                <td>PCS</td>
                                <td>259.0</td>
                                <td>259.0</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Gowdas Coffee Premium 250 Gm</td>
                                <td>1.0</td>
                                <td>PCS</td>
                                <td>105.0</td>
                                <td>105.0</td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>Heritage Vanilla Agarbatti 1 Pcs</td>
                                <td>1.0</td>
                                <td>PCS</td>
                                <td>50.0</td>
                                <td>50.0</td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>Leo Top Blend Coffee 500 Gm</td>
                                <td>1.0</td>
                                <td>PCS</td>
                                <td>250.0</td>
                                <td>250.0</td>
                            </tr>
                            </tbody>
                        </table>

                        <Typography variant="body2" component="p">Shipping charges: 40.0</Typography>
                        <Typography variant="body2" component="p">Discount: 14.48</Typography>
                        <Typography variant="h6" component="p">Total Amount: Rs 709.52</Typography>
                        <Typography variant="body2" component="p">Paid Amount: Rs 0.0</Typography>
                        <Typography variant="body2" component="p">Balance Amount: Rs 709.52</Typography>
                    </Box>

                    <Box mt={2} display="flex" justifyContent="space-between">
                        <Button variant="contained" color="primary">Chat Support</Button>
                        <Box>
                            <Button variant="outlined" color="secondary">Cancel</Button>
                            <Button variant="contained" color="primary" style={{ marginLeft: '1rem' }}>Save Changes</Button>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};
