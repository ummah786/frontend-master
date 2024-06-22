import React, {useEffect, useState} from 'react';
import {Box, Card, CardContent, Grid, Paper, Typography} from '@mui/material';
import LatestTransactions from "./LatestTransactions";
import SalesReport from "./SalesReport";
import BalanceInfo from "./BalanceInfo";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {
    addBusinessUser,
    addInventory,
    addKeyBusiness,
    addKeyCategory,
    addKeyCompany,
    addKeyRack,
    addKeyWarehouse,
    addParty,
    addSalePurchase
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
        fetchSalesPurchase();
        getBusinessDetails();
    }, [setFetchBusiness]);
    const getBusinessDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8700/hesabbook/business/account/all/${loginData.primary_user_id}`);
            console.log("Party Response ", response.data.response);
            if (response.data.code === 200) {
                dispatch(addBusinessUser(response.data.response));
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

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
    const fetchSalesPurchase = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8700/hesabbook/sale/purchase/all/${loginData.primary_user_id}`
            );
            console.log("Party Response ", response.data.response);
            if (response.data.code === 200) {
                dispatch(addSalePurchase(response.data.response));
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    return (
        <Box style={{marginTop: '10px'}}>
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <BalanceInfo title="To Collect" amount="₹300" color="primary"/>
                </Grid>
                <Grid item xs={6}>
                    <BalanceInfo title="To Pay" amount="₹200" color="secondary"/>
                </Grid>
                <Grid item xs={9} style={{marginTop: '10px'}}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" align="center"
                                        style={{textDecoration: 'underline', fontWeight: 'bold'}}>Latest
                                Transactions</Typography>
                        </CardContent>
                    </Card>
                    <LatestTransactions/>
                </Grid>
                <Grid item xs={3} style={{marginTop: '10px'}}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" align="center"
                                        style={{textDecoration: 'underline', fontWeight: 'bold'}}>Total Cash + Bank
                                Balance</Typography>
                            <Typography variant="h4" align="center">₹99,500</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Paper style={{padding: '20px'}}>
                        <Typography variant="h6">Sales Report</Typography>
                        <SalesReport/>
                    </Paper>
                </Grid>

            </Grid>
        </Box>
    );
}
