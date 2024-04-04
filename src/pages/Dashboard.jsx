import React, {useEffect, useState} from 'react'
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {addKeyBusiness, addKeyCategory, addKeyCompany, addKeyRack, addKeyWarehouse} from "../redux/Action";

function Dashboard({onBooleanChange}) {
    const loginData = useSelector(state => state.loginReducerValue);
    const dispatch = useDispatch();
    const [fetchBusiness, setFetchBusiness] = useState([]);
    const handleClick = () => {
        // Trigger the function passed from the parent with the new boolean value
        onBooleanChange();
    };

    const getProductKeyValuePair = async () => {
        const response = await axios.get(`http://localhost:8700/hesabbook/product/key/value/get/primary/${loginData.primary_user_id}`);
        console.log('Submit delete Response :--    ', response.data.response);
        let responseData = [];
        let companyData = [];
        let businessData = [];
        let rackData = [];
        let warehouseData = [];
        let categoryData = [];
        responseData = response.data.response;
        responseData.forEach(obj => {
            if (obj.kes === 'businessName') {
                businessData.push(obj);
            } else if (obj.kes === 'warehouse') {
                warehouseData.push(obj);
            } else if (obj.kes === 'company') {
                companyData.push(obj);
            } else if (obj.kes === 'category') {
                categoryData.push(obj);
            } else if (obj.kes === 'rack') {
                rackData.push(obj);
            }
        });
        setFetchBusiness(responseData);
        dispatch(addKeyCompany(companyData));
        dispatch(addKeyCategory(categoryData));
        dispatch(addKeyWarehouse(warehouseData));
        dispatch(addKeyRack(rackData));
        dispatch(addKeyBusiness(businessData));
    }

    useEffect(() => {
        getProductKeyValuePair();
    }, [setFetchBusiness])
    return (
        <>
            <div>Dashboard Value</div>
            <div>
                <button onClick={handleClick}>Set Boolean Value</button>
            </div>
        </>

    )
}

export default Dashboard
