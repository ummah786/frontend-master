import React from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup, Grid, Button } from '@mui/material';

const BillingInfo = ({ formData, setFormData, nextStep, prevStep }) => {
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <h2>Select your billing requirement</h2>
                    <FormControl component="fieldset" margin="normal">
                        <RadioGroup
                            name="billingRequirement"
                            value={formData.billingRequirement}
                            onChange={handleChange}
                        >
                            <FormControlLabel value="Basic Billing" control={<Radio />} label="Basic Billing" />
                            <FormControlLabel value="Advance Billing" control={<Radio />} label="Advance Billing" />
                            <FormControlLabel value="Enterprise Billing" control={<Radio />} label="Enterprise Billing" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <h2>Size of your business?</h2>
                    <FormControl component="fieldset" margin="normal">
                        <RadioGroup
                            name="businessSize"
                            value={formData.businessSize}
                            onChange={handleChange}
                        >
                            <FormControlLabel value="Less than 40 lakhs" control={<Radio />} label="Less than 40 lakhs" />
                            <FormControlLabel value="40 lakhs to 1 crore" control={<Radio />} label="40 lakhs to 1 crore" />
                            <FormControlLabel value="More than 1 crore" control={<Radio />} label="More than 1 crore" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>
        </div>
    );
};

export default BillingInfo;
