import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, Grid, Button } from '@mui/material';

const OtherInfo = ({ manageUserObj, setManageUserObj, prevStep, handleSubmit }) => {
    const handleChange = (event) => {
        const { name, value } = event.target;
        setManageUserObj({ ...manageUserObj, [name]: value });
    };

    return (
        <div>
            <Grid container spacing={3}>
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

export default OtherInfo;
