import React, { useState, useEffect } from 'react';
import { TextField, Typography, MenuItem, FormControl, FormControlLabel, RadioGroup, Radio, Button, Switch, Grid } from '@mui/material';
import UserRole from "../../jsonfile/Role.json"; // Ensure this JSON file exists and is properly formatted
import { useSelector } from "react-redux";
import {makeStyles} from '@mui/styles';
const useStyles = makeStyles((theme) => ({
    container: {
        padding: '16px',
    },
    terms: {
        border: '1px solid #ccc',
        padding: '8px',
        borderRadius: '4px',
    },
    signature: {
        border: '1px dashed #ccc',
        padding: '16px',
        textAlign: 'center',
        cursor: 'pointer',
    },
    uploadImage: {
        textAlign: 'center',
        border: '1px dashed #ccc',
        padding: '16px',
        cursor: 'pointer',
    },
}));

const BusinessSettingsForm = () => {
    const classes = useStyles();
    const [manageUserObj, setManageUserObj] = useState({});
    const { businessUser } = useSelector((state) => state.manageBusinessReducerValue);
    const { businessPrimaryUser } = useSelector((state) => state.primaryBusinessReducerValue);

    const handleTextFieldChange = (event, field) => {
        setManageUserObj({
            ...manageUserObj,
            [field]: event.target.value,
        });
    };

    useEffect(() => {
        const findPrimaryUser = (userArray) => {
            if (!Array.isArray(userArray)) return null;
            return userArray.filter((item) => item.id !== '').find((item) => item.primaryWithBusiness === 'Y');
        };

        const primaryUser = findPrimaryUser(businessPrimaryUser) || findPrimaryUser(businessUser);
        if (primaryUser !== undefined) {
            setManageUserObj(primaryUser);
        }
    }, [businessPrimaryUser, businessUser]);

    const primaryBusiness = manageUserObj;

    return (
        <div className={classes.container}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                    <div className={classes.uploadImage}>
                        <Typography variant="body2">Upload Image</Typography>
                    </div>
                </Grid>
                <Grid item xs={12} sm={9}>
                    <TextField
                        id="businessName"
                        label="Business Name"
                        variant="outlined"
                        value={manageUserObj.businessName || ''}
                        onChange={(event) => handleTextFieldChange(event, "businessName")}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="phoneNumber"
                        label="Company Phone Number"
                        variant="outlined"
                        value={manageUserObj.phoneNumber || ''}
                        onChange={(event) => handleTextFieldChange(event, "phoneNumber")}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="email"
                        label="Company E-Mail"
                        variant="outlined"
                        value={manageUserObj.email || ''}
                        onChange={(event) => handleTextFieldChange(event, "email")}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="billingAddress"
                        label="Billing Address"
                        variant="outlined"
                        value={manageUserObj.billingAddress || ''}
                        onChange={(event) => handleTextFieldChange(event, "billingAddress")}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="state"
                        label="State"
                        variant="outlined"
                        select
                        value={manageUserObj.state || ''}
                        onChange={(event) => handleTextFieldChange(event, "state")}
                        fullWidth
                    >
                        {UserRole.india.map((indi) => (
                            <MenuItem key={indi.name} value={indi.name}>
                                {indi.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="pinCode"
                        label="Pincode"
                        variant="outlined"
                        value={manageUserObj.pinCode || ''}
                        onChange={(event) => handleTextFieldChange(event, "pinCode")}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="city"
                        label="City"
                        variant="outlined"
                        value={manageUserObj.city || ''}
                        onChange={(event) => handleTextFieldChange(event, "city")}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl component="fieldset">
                        <Typography component="legend">Are you GST Registered?</Typography>
                        <RadioGroup
                            aria-label="gstUser"
                            name="gstUser"
                            value={manageUserObj.gstUser || ''}
                            onChange={(event) => handleTextFieldChange(event, "gstUser")}
                        >
                            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                            <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="panNumber"
                        label="PAN Number"
                        variant="outlined"
                        value={manageUserObj.panNumber || ''}
                        onChange={(event) => handleTextFieldChange(event, "panNumber")}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="gstNumber"
                        label="GST Number"
                        variant="outlined"
                        value={manageUserObj.gstNumber || ''}
                        onChange={(event) => handleTextFieldChange(event, "gstNumber")}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="businessType"
                        label="Business Type"
                        variant="outlined"
                        select
                        value={manageUserObj.businessType || ''}
                        onChange={(event) => handleTextFieldChange(event, "businessType")}
                        fullWidth
                    >
                        {UserRole.businessType.map((bt) => (
                            <MenuItem key={bt.name} value={bt.name}>
                                {bt.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="industryType"
                        label="Industry Type"
                        variant="outlined"
                        select
                        value={manageUserObj.industryType || ''}
                        onChange={(event) => handleTextFieldChange(event, "industryType")}
                        fullWidth
                    >
                        {UserRole.industryType.map((it) => (
                            <MenuItem key={it.name} value={it.name}>
                                {it.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="businessRegistrationType"
                        label="Business Registration Type"
                        variant="outlined"
                        select
                        value={manageUserObj.businessRegistrationType || ''}
                        onChange={(event) => handleTextFieldChange(event, "businessRegistrationType")}
                        fullWidth
                    >
                        {UserRole.businessRegistrationType.map((brt) => (
                            <MenuItem key={brt.name} value={brt.name}>
                                {brt.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2" className={classes.terms}>
                        Terms and Conditions
                        <ol>
                            <li>Goods once sold will not be taken back or exchanged</li>
                            <li>All disputes are subject to [ENTER_YOUR_CITY_NAME] jurisdiction only</li>
                        </ol>
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <div className={classes.signature}>
                        <Typography variant="body2">+ Add Signature</Typography>
                    </div>
                </Grid>
                <Grid item xs={12} className={classes.toggle}>
                    <FormControlLabel control={<Switch />} label="Enable TDS" />
                    <FormControlLabel control={<Switch />} label="Enable TCS" />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" fullWidth>
                        Save
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default BusinessSettingsForm;
