import React, {useState} from 'react';
import {
    Box,
    Button,
    Collapse,
    Container,
    Divider,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Paper,
    Typography
} from '@mui/material';
import {ExpandLess, ExpandMore} from '@mui/icons-material';
import {useNavigate} from 'react-router-dom';

const reportsData = {
    GST: [
        'Balance Sheet', 'GSTR-1 (Sales)', 'GSTR-2 (Purchase)', 'GSTR-3b',
        'GST Purchase (With HSN)', 'GST Sales (With HSN)', 'HSN Wise Sale Summary',
        'TDS Payable', 'TDS Receivable', 'TCS Payable', 'TCS Receivable'
    ],
    Transaction: [
        'Audit Trail', 'Bill Wise Profit', 'Cash and Bank ReportReport (All Payments)',
        'Daybook - Staff Wise', 'Expense Category ReportReport', 'Expense Transaction ReportReport',
        'Profit And Loss ReportReport', 'Purchase Summary', 'Sales Summary - Staff Wise'
    ],
    Item: [
        'Item Batch ReportReport', 'Item ReportReport By Party', 'Item Sales and Purchase Summary',
        'Low Stock Summary', 'Rate List', 'Stock Detail ReportReport', 'Stock Summary'
    ],
    Party: [
        'Receivable Ageing ReportReport', 'Party ReportReport By Item', 'Party Statement (Ledger)',
        'Party Wise Outstanding', 'Sales Summary - Category Wise'
    ]
};

export const MainReport = () => {
    const [openCategories, setOpenCategories] = useState({
        GST: false,
        Transaction: false,
        Item: false,
        Party: false
    });
    const navigate = useNavigate();

    const handleToggle = (category) => {
        setOpenCategories((prevOpen) => ({
            ...prevOpen,
            [category]: !prevOpen[category]
        }));
    };

    const handleReportClick = (report) => {
        // Navigate to the report page
        navigate(`/reports/${report}`);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Reports
            </Typography>
            <Box sx={{display: 'flex', gap: 2, mb: 2}}>
                <Button variant="outlined">Filter By</Button>
                <Button variant="outlined">Party</Button>
                <Button variant="outlined">Category</Button>
                <Button variant="outlined">Payment Collection</Button>
                <Button variant="outlined">Item</Button>
                <Button variant="outlined">Invoice Details</Button>
                <Button variant="outlined">Summary</Button>
            </Box>
            <Paper>
                <Grid container spacing={2}>
                    {Object.keys(reportsData).map((category) => (
                        <Grid item xs={12} md={6} key={category}>
                            <Box>
                                <ListItem button onClick={() => handleToggle(category)}>
                                    <ListItemText primary={category}/>
                                    <IconButton size="small">
                                        {openCategories[category] ? <ExpandLess/> : <ExpandMore/>}
                                    </IconButton>
                                </ListItem>
                                <Collapse in={openCategories[category]} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {reportsData[category].map((report) => (
                                            <ListItem
                                                key={report}
                                                button
                                                onClick={() => handleReportClick(report)}
                                                sx={{pl: 4}}
                                            >
                                                <ListItemText primary={report}/>
                                            </ListItem>
                                        ))}
                                    </List>
                                </Collapse>
                                <Divider/>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </Container>
    );
};


