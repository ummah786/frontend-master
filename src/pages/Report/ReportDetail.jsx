import {Container, Typography} from "@mui/material";
import React from "react";

export const ReportDetail = ({ report }) => {
    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                {report}
            </Typography>
            <Typography variant="body1">
                Details about {report}.
            </Typography>
        </Container>
    );
};