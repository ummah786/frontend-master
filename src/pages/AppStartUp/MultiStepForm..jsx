import React, {useState} from 'react';
import BusinessInfo from './BusinessInfo';
import BillingInfo from './BillingInfo';
import {Box, Button, Grid, Paper, Step, StepLabel, Stepper} from '@mui/material';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import {businessAccountDataModel} from "../../datamodel/ManageUserDataModel";
import {addLogin, addPrimaryBusinessUser} from "../../redux/Action";
import {useDispatch, useSelector} from "react-redux";

const MultiStepForm = ({onBooleanChange}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loginData = useSelector((state) => state.loginReducerValue);
    const [step, setStep] = useState(0);
    const [manageUserObj, setManageUserObj] = useState(businessAccountDataModel);


    const steps = ['Business Info', 'Billing/Other Info'];

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);


    const handleSubmit = async () => {
        manageUserObj['primary_user_id'] = loginData.primary_user_id;
        manageUserObj['secondary_user_id'] = loginData.secondary_user_id;
        manageUserObj['primaryWithBusiness'] = "Y";
        const response = await axios.post('http://localhost:8700/hesabbook/business/account/save', manageUserObj);
        if (response.data.code === 200) {
            dispatch(addPrimaryBusinessUser(response.data.response));
            localStorage.setItem("BusinessName", response.data.response.businessName);
            const updateLoginValue = await axios.get(`http://localhost:8700/hesabbook/user/update/first/time/${loginData.id}/${response.data.response.id}/Y`);
            if (updateLoginValue.status === 200) {
                console.log("return updateLogin value", updateLoginValue);
                dispatch(addLogin(updateLoginValue.data.response));
                onBooleanChange();
                navigate("/")
            }
        }
    };

    const getStepContent = (stepIndex) => {
        switch (stepIndex) {
            case 0:
                return <BusinessInfo manageUserObj={manageUserObj} setManageUserObj={setManageUserObj}
                                     nextStep={nextStep}/>;
            case 1:
                return <BillingInfo manageUserObj={manageUserObj} setManageUserObj={setManageUserObj}
                                    nextStep={nextStep}
                                    prevStep={prevStep}/>;
            /*    case 2:
                    return <OtherInfo manageUserObj={manageUserObj} setManageUserObj={setManageUserObj} prevStep={prevStep}
                                      handleSubmit={handleSubmit}/>;*/
        }
    };

    return (
        <Box sx={{width: '100%'}}>
            <Stepper activeStep={step} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Grid container justifyContent="center">
                <Grid item xs={12} sm={8} md={6}>
                    <Paper elevation={3} sx={{padding: 3, mt: 3}}>
                        {getStepContent(step)}
                        <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                            <Button
                                color="inherit"
                                disabled={step === 0}
                                onClick={prevStep}
                                sx={{mr: 1}}
                            >
                                Back
                            </Button>
                            <Box sx={{flex: '1 1 auto'}}/>
                            {step === steps.length - 1 ? (
                                <Button variant="contained" color="primary" onClick={handleSubmit}>
                                    Submit
                                </Button>
                            ) : (
                                <Button variant="contained" color="primary" onClick={nextStep}>
                                    Next
                                </Button>
                            )}
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default MultiStepForm;
