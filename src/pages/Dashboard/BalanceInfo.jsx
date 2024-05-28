import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

function BalanceInfo({ title, amount, color }) {
    return (
        <Paper style={{ padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" color={color}>
                {title}
            </Typography>
            <Typography variant="h6">
                {amount}
            </Typography>
        </Paper>
    );
}

export default BalanceInfo;
