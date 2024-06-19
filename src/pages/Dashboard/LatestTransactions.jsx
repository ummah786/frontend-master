import React, {useEffect, useState} from 'react';
import {Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import {Link as RouterLink} from 'react-router-dom';
import {useSelector} from "react-redux";
import {formatDate} from "../../commonStyle";
import IconButton from "@mui/material/IconButton";
import ArticleIcon from "@mui/icons-material/Article";


function LatestTransactions() {
    const {salePurchaseUser} = useSelector(
        (state) => state.salePurchaseReducerValue
    );
    const [filterSalePurchase, setFilterSalePurchase] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [flagView, setFlagView] = useState(false);
    const [idFlagView, setIdFlagView] = useState('');
    const handleBooleanChangeView = (id) => {
        setFlagView((prevState) => !prevState);
        setIdFlagView(id);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            // Invalid date
            return '';
        }
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Intl.DateTimeFormat('en-CA', options).format(date);
    };
    useEffect(() => {
        if (Array.isArray(salePurchaseUser)) {
            let filteredData = salePurchaseUser;
            setFilterSalePurchase(filteredData);
        }
    }, [salePurchaseUser]);
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{fontWeight: 'bold'}}>Date</TableCell>
                        <TableCell sx={{fontWeight: 'bold'}}>Type</TableCell>
                        <TableCell sx={{fontWeight: 'bold'}}>Transaction No</TableCell>
                        <TableCell sx={{fontWeight: 'bold'}}>Party Name</TableCell>
                        <TableCell sx={{fontWeight: 'bold'}}>Amount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filterSalePurchase
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((txn) => (
                            <TableRow key={txn.id}>
                                <TableCell>{formatDate(txn.creationDateTime)}</TableCell>
                                <TableCell>{txn.billType}</TableCell>
                                <TableCell>
                                    {txn.salesInvoiceNo} {txn.purchaseInvNo}
                                    {txn.purchaseReturnNo} {txn.purchaseNo}
                                    {txn.quotationNo} {txn.salesReturnNo}
                                    {txn.deliveryNo} {txn.proformaNo}
                                    {txn.debitNoteNo} {txn.creditNoteNo}
                                    {txn.paymentNumberIn} {txn.paymentNumberOut}
                                </TableCell>
                                <TableCell>{txn.partyName}</TableCell>
                                <TableCell>{txn.totalAmount}</TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        aria-label="edit"
                                        onClick={() => handleBooleanChangeView(txn.id)}
                                    >
                                        <ArticleIcon/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            <Link component={RouterLink} to="/transactions" style={{margin: '10px'}}>
                See All Transactions
            </Link>
        </TableContainer>
    );
}

export default LatestTransactions;
