import React, {useState} from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Card,
    CardContent,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    MenuItem,
    Paper,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));
const Invoice = () => {
    const classes = useStyles();
    const [selectedTheme, setSelectedTheme] = useState('');

    const handleThemeChange = (event) => {
        setSelectedTheme(event.target.value);
    };

    const themes = [
        'Advanced GST',
        'Stylish',
        'Advanced GST (Tally)',
        'Billbook',
        'Advanced GST (A5)',
        'Billbook (A5)',
        'Modern',
        'Simple',
    ];
    const themeImages = {
        'Advanced GST': 'advance-gst.svg',
        'Stylish': 'style.svg',
        'Advanced GST (Tally)': 'advance-gst-tally.svg',
        'Billbook': 'billbook.svg',
        'Advanced GST (A5)': 'advance-gst-a5.svg',
        'Billbook (A5)': 'billbook-a5.svg',
        'Modern': 'modern.svg',
        'Simple': 'simple.svg'
    };
    const [theme, setTheme] = useState('');
    const [settings, setSettings] = useState({
        showPartyBalance: true,
        enableFreeItemQuantity: true,
        showItemDescription: true,
        showPhoneNumber: true,
    });
    const [industryType, setIndustryType] = useState('Medicine(Pharma)');
    const [itemTableColumns, setItemTableColumns] = useState({
        price: true,
        quantity: true,
        batchNo: true,
        expDate: true,
        mfgDate: true,
    });


    const handleSettingsChange = (event) => {
        setSettings({
            ...settings,
            [event.target.name]: event.target.checked,
        });
    };

    const handleIndustryTypeChange = (event) => {
        setIndustryType(event.target.value);
    };

    const handleItemTableColumnsChange = (event) => {
        setItemTableColumns({
            ...itemTableColumns,
            [event.target.name]: event.target.checked,
        });
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={8}>
                <Paper className={classes.paper}>
                    <Box>
                        <Typography component="div" variant="h5">hu</Typography>
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={4}>
                <Paper className={classes.paper}>
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Themes
                        </Typography>
                        <FormControl component="fieldset">
                            <RadioGroup
                                aria-label="themes"
                                name="themes"
                                value={selectedTheme}
                                onChange={handleThemeChange}
                            >
                                <Grid container spacing={2}>
                                    {themes.map((theme) => (
                                        <Grid item xs={6} sm={3} key={theme}>
                                            <Card variant="outlined">
                                                <CardContent>
                                                    <img
                                                        src={`../../images/invoice/${themeImages[theme]}`}
                                                        alt={theme}
                                                        style={{width: '100%'}}
                                                    />
                                                    <FormControlLabel
                                                        value={theme}
                                                        control={<Radio/>}
                                                        label={theme}
                                                    />
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                            </RadioGroup>
                        </FormControl>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                <Typography>Theme Settings</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <FormGroup>
                                    <FormControlLabel
                                        control={<Checkbox checked={settings.showPartyBalance}
                                                           onChange={handleSettingsChange}
                                                           name="showPartyBalance"/>}
                                        label="Show party balance in invoice"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={settings.enableFreeItemQuantity}
                                                           onChange={handleSettingsChange}
                                                           name="enableFreeItemQuantity"/>}
                                        label="Enable free item quantity"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={settings.showItemDescription}
                                                           onChange={handleSettingsChange}
                                                           name="showItemDescription"/>}
                                        label="Show item description in invoice"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={settings.showPhoneNumber}
                                                           onChange={handleSettingsChange}
                                                           name="showPhoneNumber"/>}
                                        label="Show phone number on invoice"
                                    />
                                </FormGroup>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                <Typography>Invoice Details</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <TextField
                                    select
                                    label="Industry Type"
                                    value={industryType}
                                    onChange={handleIndustryTypeChange}
                                    fullWidth
                                >
                                    <MenuItem value="Medicine(Pharma)">Medicine(Pharma)</MenuItem>
                                    <MenuItem value="Electronics">Electronics</MenuItem>
                                    <MenuItem value="Grocery">Grocery</MenuItem>
                                </TextField>
                                <FormControlLabel
                                    control={<Checkbox name="drugLicenceNo"/>}
                                    label="Drug Licence No."
                                />
                                <FormControlLabel
                                    control={<Checkbox name="referredByDr"/>}
                                    label="Referred by Dr."
                                />
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                <Typography>Item Table Columns</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <FormGroup>
                                    <FormControlLabel
                                        control={<Checkbox checked={itemTableColumns.price}
                                                           onChange={handleItemTableColumnsChange}
                                                           name="price"/>}
                                        label="Price/Item (₹)"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={itemTableColumns.quantity}
                                                           onChange={handleItemTableColumnsChange} name="quantity"/>}
                                        label="Quantity"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={itemTableColumns.batchNo}
                                                           onChange={handleItemTableColumnsChange} name="batchNo"/>}
                                        label="Batch No."
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={itemTableColumns.expDate}
                                                           onChange={handleItemTableColumnsChange} name="expDate"/>}
                                        label="Exp. Date"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={itemTableColumns.mfgDate}
                                                           onChange={handleItemTableColumnsChange} name="mfgDate"/>}
                                        label="Mfg Date"
                                    />
                                    <Button variant="outlined">+ Add Custom Column</Button>
                                </FormGroup>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Invoice;
