import React, {useEffect, useState} from 'react';
import {Button, FormControl, FormControlLabel, MenuItem, Switch, TextField, Typography} from '@mui/material';
import {makeStyles} from '@mui/styles';
import UserRole from "../../jsonfile/Role.json";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import {businessAccountDataModel} from "../../datamodel/ManageUserDataModel";
import {useSelector} from "react-redux";

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '16px',
    },
    row: {
        display: 'flex',
        gap: '16px',
    },
    fullWidth: {
        width: '100%',
    },
    halfWidth: {
        width: '48%',
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
    toggle: {
        display: 'flex',
        justifyContent: 'space-between',
    },
});

const BusinessSettingsForm = () => {
    const classes = useStyles();
    const [manageUserObj, setManageUserObj] = useState(businessAccountDataModel);
    const {businessUser} = useSelector(
        (state) => state.manageBusinessReducerValue
    );

    const {businessPrimaryUser} = useSelector(
        (state) => state.primaryBusinessReducerValue
    );
    const handleTextFieldChange = (event, field) => {
        setManageUserObj({
            ...manageUserObj,
            [field]: event.target.value,
        });
    };

    useEffect(() => {
        const findPrimaryUser = (userArray) => {
            if (!Array.isArray(userArray)) return null;
            console.log('User Array :-', userArray);
            return userArray.filter((item) => item.id !== '').find((item) => item.primaryWithBusiness === 'Y');
        };

        const primaryUser = findPrimaryUser(businessPrimaryUser) || findPrimaryUser(businessUser);
        console.log("primaryUser ", primaryUser);
        if (primaryUser !== undefined) {
            setManageUserObj(primaryUser);
        }
    }, [businessPrimaryUser, businessUser]);

    return (
        <div className={classes.container}>
            <TextField
                id="outlined-basic"
                label="Business Name"
                variant="outlined"
                sx={{margin: "10px"}}
                value={manageUserObj.businessName}
                onChange={(event) =>
                    handleTextFieldChange(event, "businessName")
                }
            />
            <TextField
                id="outlined-basic"
                label="Phone Number"
                variant="outlined"
                sx={{margin: "10px"}}
                value={manageUserObj.phoneNumber}
                onChange={(event) =>
                    handleTextFieldChange(event, "phoneNumber")
                }
            />
            <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                sx={{margin: "10px"}}
                value={manageUserObj.email}
                onChange={(event) => handleTextFieldChange(event, "email")}
            />
            <TextField
                id="outlined-basic"
                label="Billing Address"
                variant="outlined"
                sx={{margin: "10px"}}
                value={manageUserObj.billingAddress}
                onChange={(event) =>
                    handleTextFieldChange(event, "billingAddress")
                }
            />
            <TextField
                id="outlined-basic"
                label="City"
                variant="outlined"
                sx={{margin: "10px"}}
                value={manageUserObj.city}
                onChange={(event) => handleTextFieldChange(event, "city")}
            />
            <TextField
                id="outlined-basic"
                label="District"
                variant="outlined"
                sx={{margin: "10px"}}
                value={manageUserObj.district}
                onChange={(event) => handleTextFieldChange(event, "district")}
            />
            <TextField
                sx={{width: "94%", marginLeft: "10px"}}
                select
                value={manageUserObj.state}
                onChange={(event) => handleTextFieldChange(event, "state")}
                label="State"
                variant="outlined"
                margin="normal"
            >
                {UserRole.india.map((indi) => (
                    <MenuItem key={indi.name} value={indi.name}>
                        {indi.name}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                id="outlined-basic"
                label="Pin Code"
                variant="outlined"
                sx={{margin: "10px"}}
                value={manageUserObj.pinCode}
                onChange={(event) => handleTextFieldChange(event, "pinCode")}
            />
            <TextField
                id="outlined-basic"
                label="PAN Number"
                variant="outlined"
                sx={{width: "100%", margin: "10px"}}
                value={manageUserObj.panNumber}
                onChange={(event) =>
                    handleTextFieldChange(event, "panNumber")
                }
            />
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
            <Typography variant="body2" className={classes.terms}>
                Terms and Conditions
                <ol>
                    <li>Goods once sold will not be taken back or exchanged</li>
                    <li>All disputes are subject to [ENTER_YOUR_CITY_NAME] jurisdiction only</li>
                </ol>
            </Typography>
            <div className={classes.signature}>
                <Typography variant="body2">+ Add Signature</Typography>
            </div>
            <div className={classes.toggle}>
                <FormControlLabel control={<Switch/>} label="Enable TDS"/>
                <FormControlLabel control={<Switch/>} label="Enable TCS"/>
            </div>
            <Button variant="contained" color="primary" className={classes.fullWidth}>
                Save Changes
            </Button>
        </div>
    );
};

export default BusinessSettingsForm;
