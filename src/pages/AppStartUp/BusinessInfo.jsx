import React from 'react';
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormLabel,
    InputLabel,
    ListItemText,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField,
    Grid,
    Button
} from '@mui/material';

const businessTypes = ['Manufacturer', 'Services'];
const industryTypes = ['Medicine(Pharma)', 'Technology', 'Finance'];

const BusinessInfo = ({ formData, setFormData, nextStep }) => {
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div>
            <h3>Welcome 🙏, Let’s set up HesabBook for your business</h3>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        label="Your business name"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth margin="normal" required>
                        <InputLabel>Business registration type</InputLabel>
                        <Select
                            name="registrationType"
                            value={formData.registrationType}
                            onChange={handleChange}
                        >
                            <MenuItem value="Private Limited Company">Private Limited Company</MenuItem>
                            <MenuItem value="Public Limited Company">Public Limited Company</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth margin="normal" required>
                        <InputLabel>Business type</InputLabel>
                        <Select
                            name="businessType"
                            multiple
                            value={formData.businessType}
                            onChange={handleChange}
                            renderValue={(selected) => selected.join(', ')}
                        >
                            {businessTypes.map((type) => (
                                <MenuItem key={type} value={type}>
                                    <Checkbox checked={formData.businessType.indexOf(type) > -1} />
                                    <ListItemText primary={type} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth margin="normal" required>
                        <InputLabel>Industry type</InputLabel>
                        <Select
                            name="industryType"
                            value={formData.industryType}
                            onChange={handleChange}
                        >
                            {industryTypes.map((type) => (
                                <MenuItem key={type} value={type}>{type}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl component="fieldset" margin="normal">
                        <FormLabel component="legend">Is your business GST registered?</FormLabel>
                        <RadioGroup
                            name="gstRegistered"
                            value={formData.gstRegistered}
                            onChange={handleChange}
                            row
                        >
                            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                            <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="GSTIN No (Optional)"
                        name="gstNumber"
                        value={formData.gstNumber}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="whatsappUpdates"
                                checked={formData.whatsappUpdates}
                                onChange={(e) => setFormData({ ...formData, whatsappUpdates: e.target.checked })}
                            />
                        }
                        label="Receive account updates and reminders on WhatsApp"
                    />
                </Grid>
            </Grid>
        </div>
    );
};

export default BusinessInfo;
