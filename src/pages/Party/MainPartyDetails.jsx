import React, {useEffect, useState} from 'react';
import {Box, Button, CssBaseline, Grid, Paper, Tab, Tabs, Typography} from '@mui/material';
import Sidebar from './Sidebar';
import PartyDetails from './PartyDetails';
import PartyLedger from './PartyLedger';
import PartyTransactions from './PartyTransactions';


export const MainPartyDetails = ({detailFlagId, onBooleanChange}) => {
    useEffect(() => {
        console.log("Details Flag Id ", detailFlagId);
        console.log("On Booolean CHange", onBooleanChange);
    }, []);
    const [selectedParty, setSelectedParty] = useState('Cash Sale');
    const [tabIndex, setTabIndex] = useState(0);
    const parties = [
        {name: 'Cash Sale', amount: 200},
        {name: 'Raju', amount: 50},
        {name: 'Sandeep', amount: 200},
    ];

    const handlePartySelect = (party) => {
        setSelectedParty(party);
    };

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    return (<>
            <Box>
                <Button onClick={onBooleanChange}>Back To View</Button>
            </Box>
            <CssBaseline/>
            <Grid container spacing={2}>
                <Grid item xs={3}> <Paper elevation={3}>
                    <Sidebar parties={parties} onPartySelect={handlePartySelect} selectedParty={selectedParty}/>
                </Paper>
                </Grid>
                <Grid item xs={9}>
                    <Paper style={{padding: 16}}>
                        <Typography variant="h5">{selectedParty}</Typography>
                        <Tabs value={tabIndex} onChange={handleTabChange} aria-label="party tabs">
                            <Tab label="Transactions"/>
                            <Tab label="Profile"/>
                            <Tab label="Ledger"/>
                            <Tab label="Item Wise ReportReport"/>
                        </Tabs>
                        <TabPanel value={tabIndex} index={0}>
                            <PartyTransactions partyName={selectedParty}/>
                        </TabPanel>
                        <TabPanel value={tabIndex} index={1}>
                            <PartyDetails partyName={selectedParty}/>
                        </TabPanel>
                        <TabPanel value={tabIndex} index={2}>
                            <PartyLedger partyName={selectedParty}/>
                        </TabPanel>
                        <TabPanel value={tabIndex} index={3}>
                            <Typography>Item Wise ReportReport</Typography>
                        </TabPanel>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
};

const TabPanel = (props) => {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
};