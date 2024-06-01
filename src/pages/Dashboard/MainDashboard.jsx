import React, {useEffect, useState} from 'react';
import {Container, Grid, Paper, Typography} from '@mui/material';
import LatestTransactions from "./LatestTransactions";
import SalesReport from "./SalesReport";
import BalanceInfo from "./BalanceInfo";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {
    addInventory,
    addKeyBusiness,
    addKeyCategory,
    addKeyCompany,
    addKeyRack,
    addKeyWarehouse,
    addParty
} from "../../redux/Action";


export const MainDashboard = () => {
    const loginData = useSelector((state) => state.loginReducerValue);
    const dispatch = useDispatch();
    const [fetchBusiness, setFetchBusiness] = useState([]);
    const getProductKeyValuePair = async () => {
        const response = await axios.get(
            `http://localhost:8700/hesabbook/product/key/value/get/primary/${loginData.primary_user_id}`
        );
        console.log("Submit delete Response :--    ", response.data.response);
        let responseData = [];
        let companyData = [];
        let businessData = [];
        let rackData = [];
        let warehouseData = [];
        let categoryData = [];
        responseData = response.data.response;
        responseData.forEach((obj) => {
            if (obj.kes === "businessName") {
                businessData.push(obj.value);
            } else if (obj.kes === "warehouse") {
                warehouseData.push(obj.value);
            } else if (obj.kes === "company") {
                companyData.push(obj.value);
            } else if (obj.kes === "category") {
                categoryData.push(obj.value);
            } else if (obj.kes === "rack") {
                rackData.push(obj.value);
            }
        });
        setFetchBusiness(responseData);
        dispatch(addKeyCompany(companyData));
        dispatch(addKeyCategory(categoryData));
        dispatch(addKeyWarehouse(warehouseData));
        dispatch(addKeyRack(rackData));
        dispatch(addKeyBusiness(businessData));
    };

    useEffect(() => {
        getProductKeyValuePair();
        getPartyDetails();
        getInventoryDetails();
    }, [setFetchBusiness]);

    const getPartyDetails = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8700/hesabbook/partner/all/${loginData.primary_user_id}`
            );
            console.log("Party Response ", response.data.response);
            if (response.data.code === 200) {
                dispatch(addParty(response.data.response));
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const getInventoryDetails = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8700/hesabbook/inventory/all/${loginData.primary_user_id}`
            );
            if (response.data.code === 200) {
                dispatch(addInventory(response.data.response));
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
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