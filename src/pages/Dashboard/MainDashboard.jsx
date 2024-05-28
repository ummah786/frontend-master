import React from 'react';
import {Container, Grid, Paper, Typography} from '@mui/material';
import LatestTransactions from "./LatestTransactions";
import SalesReport from "./SalesReport";
import BalanceInfo from "./BalanceInfo";


export const MainDashboard = () => {
    return (
        <Container maxWidth="lg" style={{marginTop: '20px'}}>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <BalanceInfo title="To Collect" amount="₹300" color="primary"/>
                </Grid>
                <Grid item xs={6}>
                    <BalanceInfo title="To Pay" amount="₹200" color="secondary"/>
                </Grid>
                <Grid item xs={12}>
                    <Paper style={{padding: '20px'}}>
                        <Typography variant="h6">Latest Transactions</Typography>
                        <LatestTransactions/>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Paper style={{padding: '20px'}}>
                        <Typography variant="h6">Sales Report</Typography>
                        <SalesReport/>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Paper style={{padding: '20px'}}>
                        <Typography variant="h6">Total Cash + Bank Balance</Typography>
                        <Typography variant="h4">₹99,500</Typography>
                    </Paper>
                    <Paper style={{padding: '20px', marginTop: '20px'}}>
                        <img src="https://via.placeholder.com/150" alt="Ad 1" style={{width: '100%'}}/>
                    </Paper>
                    <Paper style={{padding: '20px', marginTop: '20px'}}>
                        <img src="https://via.placeholder.com/150" alt="Ad 2" style={{width: '100%'}}/>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}