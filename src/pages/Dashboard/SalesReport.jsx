import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Typography, Box, FormControl, Select, MenuItem } from '@mui/material';

const data = [
    { name: 'Wed', Sales: 0 },
    { name: 'Thu', Sales: 200 },
    { name: 'Fri', Sales: 0 },
    { name: 'Sat', Sales: 0 },
    { name: 'Sun', Sales: 0 },
    { name: 'Mon', Sales: 0 },
    { name: 'Tue', Sales: 500 },
];

function SalesReport() {
    const [timeframe, setTimeframe] = React.useState('Daily');

    const handleChange = (event) => {
        setTimeframe(event.target.value);
    };

    return (
        <>
            <FormControl variant="outlined" size="small" style={{ marginBottom: '10px' }}>
                <Select value={timeframe} onChange={handleChange}>
                    <MenuItem value="Daily">Daily</MenuItem>
                    <MenuItem value="Weekly">Weekly</MenuItem>
                    <MenuItem value="Monthly">Monthly</MenuItem>
                </Select>
            </FormControl>
            <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Sales" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
            <Box mt={2}>
                <Typography>Last 7 days sales: ₹500</Typography>
                <Typography>Invoices Made: 3</Typography>
            </Box>
        </>
    );
}

export default SalesReport;
