import {InventoryItemDetails} from "./InventoryItemDetails";
import {InventoryStockDetails} from "./InventoryStockDetails"
import {InventoryPartyWiseReport} from "./InventoryPartyWiseReport"
import React, {useEffect} from 'react';
import {Box, Button, Container, Divider, Grid, List, ListItem, ListItemText, Paper, Typography} from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export const MainItemDetails = ({detailFlagId, onBooleanChange}) => {
    useEffect(() => {
        console.log("Details Items Flag Id ", detailFlagId);
        console.log("On Booolean CHange", onBooleanChange);
    }, []);
    const items = [
        {name: 'Comb', stock: 8},
        {name: 'Cup', stock: 10},
        {name: 'Glass', stock: 8},
        {name: 'Mobile', stock: 1},
        {name: 'Steel Bottle', stock: 25},
    ];

    const [selectedItem, setSelectedItem] = React.useState(items[0]);
    const [selectedTab, setSelectedTab] = React.useState(0);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (<>
            <Box>
                <Button onClick={onBooleanChange}>Back To View</Button>
            </Box>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Paper elevation={3}>
                            <Typography variant="h6" component="div" sx={{p: 2}}>
                                Items
                            </Typography>
                            <List component="nav">
                                {items.map((item, index) => (
                                    <div key={index}>
                                        <ListItem button onClick={() => setSelectedItem(item)}>
                                            <ListItemText primary={item.name} secondary={`${item.stock} PCS`}/>
                                        </ListItem>
                                        <Divider/>
                                    </div>
                                ))}
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item xs={9}>
                        <Paper elevation={3} sx={{p: 2}}>
                            <Typography variant="h4" component="div" gutterBottom>
                                {selectedItem.name} <Button variant="contained" color="success" sx={{ml: 2}}>In
                                Stock</Button>
                            </Typography>
                            <Tabs value={selectedTab} onChange={handleTabChange}>
                                <Tab label="Item Details"/>
                                <Tab label="Stock Details"/>
                                <Tab label="Party Wise Report"/>
                            </Tabs>
                            {selectedTab === 0 && <InventoryItemDetails item={selectedItem}/>}
                            {selectedTab === 1 && <InventoryStockDetails item={selectedItem}/>}
                            {selectedTab === 2 && <InventoryPartyWiseReport item={selectedItem}/>}
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}