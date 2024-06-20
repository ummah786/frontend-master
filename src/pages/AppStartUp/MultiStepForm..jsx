import React, { useState } from 'react';
import BusinessInfo from './BusinessInfo';
import BillingInfo from './BillingInfo';
import OtherInfo from './OtherInfo';
import { Box, Button, Step, StepLabel, Stepper, Grid, Paper } from '@mui/material';
import axios from 'axios';

const MultiStepForm = ({ onBooleanChange }) => {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        businessName: '',
        registrationType: '',
        businessType: [],
        industryType: '',
        gstRegistered: '',
        gstNumber: '',
        whatsappUpdates: false,
        billingRequirement: '',
        businessSize: '',
        foundBy: '',
        language: ''
    });

    const steps = ['Business Info', 'Billing Info', 'Other Info'];

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handleSubmit = () => {
        axios.post('http://your-spring-boot-api-endpoint/api/saveFormData', formData)
            .then(response => {
                console.log('Form submitted successfully:', response.data);
                alert('Form submitted successfully');
                onBooleanChange();
            })
            .catch(error => {
                console.error('There was an error submitting the form:', error);
                alert('Error submitting form');
            });
    };

    const getStepContent = (stepIndex) => {
        switch (stepIndex) {
            case 0:
                return <BusinessInfo formData={formData} setFormData={setFormData} nextStep={nextStep} />;
            case 1:
                return <BillingInfo formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />;
            case 2:
                return <OtherInfo formData={formData} setFormData={setFormData} prevStep={prevStep} handleSubmit={handleSubmit} />;
            default:
                return 'Unknown stepIndex';
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={step} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Grid container justifyContent="center">
                <Grid item xs={12} sm={8} md={6}>
                    <Paper elevation={3} sx={{ padding: 3, mt: 3 }}>
                        {getStepContent(step)}
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                color="inherit"
                                disabled={step === 0}
                                onClick={prevStep}
                                sx={{ mr: 1 }}
                            >
                                Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
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
