import React from 'react';
import {
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    Grid,
    Button,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';

const BillingInfo = ({ manageUserObj, setManageUserObj, nextStep, prevStep }) => {
    const handleChange = (event) => {
        const { name, value } = event.target;
        setManageUserObj({ ...manageUserObj, [name]: value });
    };

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <h2>Select your billing requirement</h2>
                    <FormControl component="fieldset" margin="normal">
                        <RadioGroup
                            name="billingRequirement"
                            value={manageUserObj.billingRequirement}
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
                            value={manageUserObj.businessSize}
                            onChange={handleChange}
                        >
                            <FormControlLabel value="Less than 40 lakhs" control={<Radio />} label="Less than 40 lakhs" />
                            <FormControlLabel value="40 lakhs to 1 crore" control={<Radio />} label="40 lakhs to 1 crore" />
                            <FormControlLabel value="More than 1 crore" control={<Radio />} label="More than 1 crore" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <h2>How did you find out about myBillBook?</h2>
                    <FormControl fullWidth margin="normal" required>
                        <InputLabel>Source</InputLabel>
                        <Select
                            name="foundBy"
                            value={manageUserObj.foundBy}
                            onChange={handleChange}
                        >
                            <MenuItem value="Google or other search engine">Google or other search engine</MenuItem>
                            <MenuItem value="Ad on YouTube, Instagram, Facebook etc">Ad on YouTube, Instagram, Facebook etc</MenuItem>
                            <MenuItem value="Recommended by someone">Recommended by someone</MenuItem>
                            <MenuItem value="Blog or news or other websites">Blog or news or other websites</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth margin="normal" required>
                        <InputLabel>Language</InputLabel>
                        <Select
                            name="language"
                            value={manageUserObj.language}
                            onChange={handleChange}
                        >
                            <MenuItem value="English">English</MenuItem>
                            <MenuItem value="Hindi">Hindi</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </div>
    );
};

export default BillingInfo;
