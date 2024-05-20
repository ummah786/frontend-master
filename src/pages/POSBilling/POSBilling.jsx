import React from "react";

import {Autocomplete, Box, Button, Grid, TextField, Typography} from "@mui/material";
import {useSelector} from "react-redux";

const POSBilling = () => {
    const {partyUser} = useSelector((state) => state.partyReducerValue);
    const {inventoryUser} = useSelector((state) => state.inventoryReducerValue);
    const {salePurchaseUser} = useSelector(
        (state) => state.salePurchaseReducerValue
    );
    const loginData = useSelector((state) => state.loginReducerValue);
    const handleAutoComplete = (event, newValue) => {
        console.log("Auto Complete ", newValue);
    };
    return (
        <>
            <Box sx={{p: 2}}>
                <Box sx={{mb: 2}}>
                    <Button variant="contained">POS BILLING</Button>
                </Box>
                <Box sx={{display: "flex", width: "100%"}}>
                    <Box
                        sx={{
                            width: "70%",
                            border: "1px solid",
                            boxShadow: 3,
                            p: 2,
                            mr: 1,
                        }}
                    >
                        <Box>
                            <Autocomplete
                                disablePortal
                                onChange={handleAutoComplete}
                                id="combo-box-demo"
                                fullWidth
                                options={inventoryUser}
                                getOptionLabel={(option) =>
                                    `${option.item} (${option.totalStock}) (${option.salePrice})`
                                }
                                renderOption={(props, option) => (
                                    <Box component="li" {...props} sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        borderBottom: '1px solid #ccc'
                                    }}>
                                        <Grid container spacing={2} sx={{width: '100%', alignItems: 'center'}}>
                                            <Grid item xs={4}>
                                                <Box sx={{padding: '8px'}}>{option.item}</Box>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Box sx={{padding: '8px'}}>{option.totalStock}</Box>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Box sx={{padding: '8px'}}>{option.salePrice}</Box>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                )}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Party Name / Mobile / GST Number"
                                    />
                                )}
                                ListboxProps={{
                                    style: {
                                        maxHeight: '200px',
                                        overflow: 'auto',
                                    },
                                }}
                                PaperComponent={({children}) => (
                                    <Box sx={{position: 'relative', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)'}}>
                                        <Box sx={{
                                            top: 0,
                                            backgroundColor: 'white',
                                            zIndex: 1,
                                            borderBottom: '1px solid #ccc',
                                            padding: '8px 16px',
                                        }}>
                                            <Grid container spacing={2} >
                                                <Grid item xs={4}>
                                                    <Typography variant="body2"
                                                                sx={{fontWeight: 'bold',marginLeft:'10px'}}>Item</Typography>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Typography variant="body2" sx={{fontWeight: 'bold'}}>Total
                                                        Stock</Typography>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Typography variant="body2" sx={{fontWeight: 'bold'}}>Sale
                                                        Price</Typography>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                        {children}
                                    </Box>
                                )}
                            />
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            width: "30%",
                            border: "1px solid",
                            boxShadow: 5,
                            p: 2,
                            ml: 1,
                        }}
                    >
                        second half
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default POSBilling;
