import React from 'react';
import {Checkbox, FormControlLabel, FormLabel, Grid, MenuItem, Radio, RadioGroup, TextField} from '@mui/material';
import UserRole from "../../jsonfile/Role";
import FormControl from "@mui/material/FormControl";

const businessTypes = ['Manufacturer', 'Services'];
const industryTypes = ['Medicine(Pharma)', 'Technology', 'Finance'];

const BusinessInfo = ({manageUserObj, setManageUserObj, nextStep}) => {


    const handleChange = (event) => {
        const {name, value} = event.target;
        setManageUserObj({...manageUserObj, [name]: value});
    };

    const handleTextFieldChange = (event, field) => {
        setManageUserObj({
            ...manageUserObj,
            [field]: event.target.value,
        });
    };

    return (
        <div>
            <h3>Welcome 🙏, Let’s set up HesabBook for your business</h3>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        id="outlined-basic"
                        label="Business Name"
                        variant="outlined"
                        sx={{width: "100%", margin: "10px"}}
                        value={manageUserObj.businessName}
                        onChange={(event) =>
                            handleTextFieldChange(event, "businessName")
                        }
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        sx={{width: "100%", margin: "10px"}}
                        select
                        value={manageUserObj.businessRegistrationType}
                        onChange={(event) =>
                            handleTextFieldChange(event, "businessRegistrationType")
                        }
                        label="Business Registration Type"
                        variant="outlined"
                        margin="normal"
                    >
                        {UserRole.businessRegistrationType.map((brt) => (
                            <MenuItem key={brt.name} value={brt.name}>
                                {brt.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        sx={{width: "100%", margin: "10px"}}
                        select
                        value={manageUserObj.businessType}
                        onChange={(event) =>
                            handleTextFieldChange(event, "businessType")
                        }
                        label="Business Type"
                        variant="outlined"
                        margin="normal"
                    >
                        {UserRole.businessType.map((bt) => (
                            <MenuItem key={bt.name} value={bt.name}>
                                {bt.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        sx={{width: "100%", margin: "10px"}}
                        select
                        value={manageUserObj.industryType}
                        onChange={(event) =>
                            handleTextFieldChange(event, "industryType")
                        }
                        label="Industry Type"
                        variant="outlined"
                        margin="normal"
                    >
                        {UserRole.industryType.map((userrole) => (
                            <MenuItem key={userrole.name} value={userrole.name}>
                                {userrole.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <FormControl>
                        <FormLabel id="demo-controlled-radio-buttons-group">
                            Are you GST Registered?
                        </FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={manageUserObj.gstUser}
                            onChange={(event) =>
                                handleTextFieldChange(event, "gstUser")
                            }
                        >
                            <FormControlLabel
                                value="Yes"
                                control={<Radio/>}
                                label="Yes"
                            />
                            <FormControlLabel
                                value="No"
                                control={<Radio/>}
                                label="No"
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="outlined-basic"
                        label="GST Number"
                        variant="outlined"
                        sx={{width: "100%", margin: "10px"}}
                        value={manageUserObj.gstNumber}
                        onChange={(event) =>
                            handleTextFieldChange(event, "gstNumber")
                        }
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="whatsappUpdates"
                                checked={manageUserObj.whatsappUpdates}
                                onChange={(e) => setManageUserObj({
                                    ...manageUserObj,
                                    whatsappUpdates: e.target.checked
                                })}
                            />
                        }
                        label="Receive account updates and reminders on WhatsApp"
                    />
                </Grid>
            </Grid>
        </div>
    )
        ;
};

export default BusinessInfo;
