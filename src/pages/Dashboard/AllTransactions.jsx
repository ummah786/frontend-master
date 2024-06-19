import React, { useEffect, useState } from 'react';
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {StyledTableCell} from "../../commonStyle";
import IconButton from "@mui/material/IconButton";
import ArticleIcon from "@mui/icons-material/Article";

const AllTransactions = () => {
    const navigate = useNavigate();
    const { salePurchaseUser } = useSelector(
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

    useEffect(() => {
        if (Array.isArray(salePurchaseUser)) {
            let filteredData = salePurchaseUser;
            setFilterSalePurchase(filteredData);
        }
    }, [salePurchaseUser]);

    const handleBackClick = () => {
        navigate('/');
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

    return (
        <>
            <Button
                variant="contained"
                color="primary"
                onClick={handleBackClick}
                style={{ marginBottom: '10px' }}
            >
                Back to Dashboard
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell sx={{ fontWeight: 'bold' }}>Date</StyledTableCell>
                            <StyledTableCell sx={{ fontWeight: 'bold' }}>Type</StyledTableCell>
                            <StyledTableCell sx={{ fontWeight: 'bold' }}>Transaction No</StyledTableCell>
                            <StyledTableCell sx={{ fontWeight: 'bold' }}>Party Name</StyledTableCell>
                            <StyledTableCell sx={{ fontWeight: 'bold' }}>Amount</StyledTableCell>
                            <StyledTableCell sx={{ fontWeight: 'bold' }}>View</StyledTableCell>
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
                <TablePagination
                    rowsPerPageOptions={[6, 10, 25]}
                    component="div"
                    count={filterSalePurchase.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </>
    );
};

export default AllTransactions;
