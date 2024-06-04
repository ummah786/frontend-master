import React from 'react';
import { Box, Button, Card, CardContent, Typography, Grid,Divider  } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const plans = [
    {
        title: "Diamond Plan",
        subtitle: "For online use only",
        price: "₹217",
        yearlyPrice: "₹2,599/year",
        originalPrice: "₹357",
        buttonColor: "warning",
        buttonText: "Buy Diamond Plan",
        manageBusiness: "1 Business",
        manageUser: "1 User + 1 CA",
        features: [
            "Android, iOS & Web",
            "Custom Invoice Themes",
            "Add your CA"
        ],
        excludedFeatures: [
            "Access to Offline Desktop App",
            "50 E-way Bills",
            "E-Invoicing",
            "POS Billing on Desktop App",
            "Staff Attendance & Payroll",
            "Create Unlimited Godowns",
            "Generate and print Barcode",
            "User Activity Tracker",
            "Automated Billing",
            "Create your Online Store",
            "WhatsApp & SMS Marketing",
            "Loyalty Program",
            "Bulk Download & Bulk Print Invoices",
            "Data Export to Tally"
        ]
    },
    {
        title: "Platinum Plan",
        subtitle: "Works with and without internet",
        price: "₹250",
        yearlyPrice: "₹2,999/year",
        originalPrice: "₹417",
        buttonColor: "primary",
        buttonText: "Buy Platinum Plan",
        manageBusiness: "2 Business",
        manageUser: "3 User + 1 CA",
        features: [
            "Android, iOS, Web & Desktop",
            "Access to Offline Desktop App",
            "Custom Invoice Themes",
            "50 E-way Bills (Per year)",
            "Staff Attendance & Payroll",
            "Create Unlimited Godowns",
            "WhatsApp & SMS Marketing (Per year)",
            "Add your CA"
        ],
        excludedFeatures: [
            "E-Invoicing",
            "POS Billing on Desktop App",
            "Generate and print Barcode",
            "User Activity Tracker",
            "Automated Billing",
            "Create your Online Store",
            "Loyalty Program",
            "Bulk Download & Bulk Print Invoices",
            "Data Export to Tally"
        ]
    },
    {
        title: "Enterprise Plan",
        subtitle: "Add features with customisable plans",
        price: "₹417",
        yearlyPrice: "₹4,999/year",
        originalPrice: "₹667",
        buttonColor: "success",
        buttonText: "Buy Enterprise Plan",
        manageBusiness: "Unlimited Business",
        manageUser: "Unlimited User",
        features: [
            "Android, iOS, Web & Desktop",
            "Access to Offline Desktop App",
            "Custom Invoice Themes",
            "Unlimited E-way Bills (Per year)",
            "E-Invoicing",
            "POS Billing on Desktop App",
            "Staff Attendance & Payroll",
            "Create Unlimited Godowns",
            "Generate and print Barcode (A4 only)",
            "Data Export to Tally",
            "User Activity Tracker",
            "Automated Billing",
            "Create your Online Store (Available on request)",
            "WhatsApp & SMS Marketing (Per year)",
            "Loyalty Program",
            "Add your CA"
        ],
        excludedFeatures: [
            "Bulk Download & Bulk Print Invoices"
        ]
    }
];

export const Pricing = ()=> {
    return (
        <Box sx={{ flexGrow: 1, padding: 4 }}>
            <Grid container spacing={4} justifyContent="center">
                {plans.map((plan, index) => (
                    <Grid item key={index} xs={12} md={4}>
                        <Card variant="outlined" sx={{ borderRadius: 2, borderColor: '#ddd' }}>
                            {plan.popular && (
                                <Typography
                                    sx={{ position: 'absolute', top: 0, right: 0, backgroundColor: 'gold', padding: '0.5em', borderRadius: '0 0 0 10px' }}
                                >
                                    Most Popular
                                </Typography>
                            )}
                            <CardContent>
                                <Typography variant="h5" component="div" gutterBottom>
                                    {plan.title}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                                    {plan.subtitle}
                                </Typography>
                                <Typography variant="h4" component="div" color="text.primary" gutterBottom>
                                    {plan.price} <Typography variant="caption" color="text.secondary">({plan.yearlyPrice})</Typography>
                                </Typography>
                                {plan.originalPrice && (
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                        <s>{plan.originalPrice}</s>
                                    </Typography>
                                )}
                                <Button variant="contained" color={plan.buttonColor} fullWidth sx={{ marginBottom: 2 }}>
                                    {plan.buttonText}
                                </Button>
                                <Divider />
                                <Typography variant="body1" color="text.primary" gutterBottom>
                                    Manage up to {plan.manageBusiness}
                                </Typography>
                                <Typography variant="body1" color="text.primary" gutterBottom>
                                    Manage up to {plan.manageUser}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    Features Exclusive to {plan.title}
                                </Typography>
                                <Box sx={{ backgroundColor: '#f9f9f9', padding: 2, borderRadius: 2, marginBottom: 2 }}>
                                    {plan.features.map((feature, i) => (
                                        <Typography key={i} variant="body2">
                                            {feature}
                                        </Typography>
                                    ))}
                                </Box>
                                {plan.excludedFeatures.length > 0 && (
                                    <>
                                        {plan.excludedFeatures.map((feature, i) => (
                                            <Typography key={i} variant="body2" color="text.secondary">
                                                <s>{feature}</s>
                                            </Typography>
                                        ))}
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};