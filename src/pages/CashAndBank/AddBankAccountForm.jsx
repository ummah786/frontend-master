import React, { useState } from 'react';
import { Container, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Grid, Switch, FormControlLabel } from '@mui/material';

import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";

export const AddBankAccountForm = ({ open, handleClose }) => {
    const [formValues, setFormValues] = useState({
        accountName: '',
        openingBalance: '',
        asOfDate: new Date(),
        bankAccountNumber: '',
        reEnterBankAccountNumber: '',
        ifscCode: '',
        bankBranchName: '',
        accountHoldersName: '',
        upiId: '',
        addBankDetails: true,
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleDateChange = (date) => {
        setFormValues({ ...formValues, asOfDate: date });
    };

    const handleSubmit = () => {
        // Handle form submission
        console.log(formValues);
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
            <DialogTitle>Add Bank Account</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Account Name"
                            name="accountName"
                            value={formValues.accountName}
                            onChange={handleInputChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Opening Balance"
                            name="openingBalance"
                            value={formValues.openingBalance}
                            onChange={handleInputChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="As of Date"
                              //  value={formValues.asOfDate}
                              //  onChange={handleDateChange}
                                renderInput={(params) => <TextField {...params} fullWidth />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={formValues.addBankDetails}
                                    onChange={() => setFormValues({ ...formValues, addBankDetails: !formValues.addBankDetails })}
                                    color="primary"
                                />
                            }
                            label="Add Bank Details"
                        />
                    </Grid>
                    {formValues.addBankDetails && (
                        <>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Bank Account Number"
                                    name="bankAccountNumber"
                                    value={formValues.bankAccountNumber}
                                    onChange={handleInputChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Re-Enter Bank Account Number"
                                    name="reEnterBankAccountNumber"
                                    value={formValues.reEnterBankAccountNumber}
                                    onChange={handleInputChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="IFSC Code"
                                    name="ifscCode"
                                    value={formValues.ifscCode}
                                    onChange={handleInputChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Bank & Branch Name"
                                    name="bankBranchName"
                                    value={formValues.bankBranchName}
                                    onChange={handleInputChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Account Holders Name"
                                    name="accountHoldersName"
                                    value={formValues.accountHoldersName}
                                    onChange={handleInputChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="UPI ID"
                                    name="upiId"
                                    value={formValues.upiId}
                                    onChange={handleInputChange}
                                    fullWidth
                                />
                            </Grid>
                        </>
                    )}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">Cancel</Button>
                <Button onClick={handleSubmit} color="primary" variant="contained">Submit</Button>
            </DialogActions>
        </Dialog>
    );
};