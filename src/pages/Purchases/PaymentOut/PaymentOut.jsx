import {Box, ButtonGroup, Checkbox, TableCell, TextField, Typography,} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import * as React from "react";
import {useEffect, useState} from "react";
import {Search, SearchIconWrapper, StyledInputBase, StyledTableCell, StyledTableRow,} from "../../../commonStyle";
import ArticleIcon from "@mui/icons-material/Article";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {useDispatch, useSelector} from "react-redux";
import {addSalePurchase} from "../../../redux/Action";
import PaymentOutCreate from "./PaymentOutCreate";
import {PaymentOutView} from "./PaymentOutView";

export const PaymentOut = () => {
    const loginData = useSelector((state) => state.loginReducerValue);
    const {salePurchaseUser} = useSelector(
        (state) => state.salePurchaseReducerValue
    );
    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleStartDateChange = (newStartDate) => {
        setStartDate(newStartDate);
    };

    const handleEndDateChange = (newEndDate) => {
        setEndDate(newEndDate);
    };
    const [selectedRows, setSelectedRows] = useState([]);
    const [filterSalePurchase, setFilterSalePurchase] = useState([]);
    const [filter, setFilter] = useState("");
    const [flag, setFlag] = useState(false);
    const [flagView, setFlagView] = useState(false);
    const [idFlagView, setIdFlagView] = useState("");
    const handleBooleanChange = () => {
        setFlag((prevState) => !prevState);
    };
    const handleBooleanChangeView = (id) => {
        setFlagView((prevState) => !prevState);
        setIdFlagView(id);
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    useEffect(() => {
        if (Array.isArray(salePurchaseUser)) {
            let filteredData = salePurchaseUser;

            // Filter for billType 'PAYMENT_OUT'
            filteredData = filteredData.filter((employee) => employee.billType === 'PAYMENT_OUT');

            if (startDate && endDate) {
                // Filter based on the date range
                filteredData = filteredData.filter((employee) => {
                    return (
                        formatDate(employee.salesInvoiceDate) >= formatDate(startDate) &&
                        formatDate(employee.salesInvoiceDate) <= formatDate(endDate)
                    );
                });
            } else if (startDate) {
                filteredData = filteredData.filter((employee) => {
                    return formatDate(employee.salesInvoiceDate) >= formatDate(startDate);
                });
            } else if (endDate) {
                // Filter based on the date range
                filteredData = filteredData.filter((employee) => {
                    return formatDate(employee.salesInvoiceDate) <= formatDate(endDate);
                });
            }

            if (filter && filter.trim() !== "") {
                filteredData = filteredData.filter((employee) => {
                    return String(employee.id).includes(filter);
                });
            }

            setFilterSalePurchase(filteredData);
        }
    }, [filter, salePurchaseUser, startDate, endDate]);


    const handleCheckboxClick = (id) => {
        const selectedIndex = selectedRows.indexOf(id);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selectedRows, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selectedRows.slice(1));
        } else if (selectedIndex === selectedRows.length - 1) {
            newSelected = newSelected.concat(selectedRows.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selectedRows.slice(0, selectedIndex),
                selectedRows.slice(selectedIndex + 1)
            );
        }
        setSelectedRows(newSelected);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://api.hesabbook.in/hesabbook/sale/purchase/all/${loginData.primary_user_id}`
                );
                console.log("Party Response ", response.data.response);
                if (response.data.code === 200) {
                    dispatch(addSalePurchase(response.data.response));
                    setFilterSalePurchase(response.data.response);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    function formatDate(datetimeString) {
        const date = new Date(datetimeString);

        // Extract year, month, and day
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() returns 0-11
        const day = String(date.getDate()).padStart(2, "0");

        // Combine them into the desired format
        return `${year}-${month}-${day}`;
    }

    return (
        <>
            {flag ? (
                <Box>
                    <PaymentOutCreate onBooleanChange={handleBooleanChange}/>
                </Box>
            ) : flagView ? (
                <Box>
                    <PaymentOutView
                        onBooleanChange={handleBooleanChangeView}
                        idFlagView={idFlagView}
                    />
                </Box>
            ) : (
                <Box>
                    <Box>
                        <Box>
                            <Button variant="contained">Payment Out</Button>
                            <Box sx={{right: "0", float: "right"}}>
                                <ButtonGroup
                                    variant="contained"
                                    aria-label="Basic button group"
                                >
                                    <Button onClick={handleBooleanChange}>
                                        Create Payment Out
                                    </Button>
                                </ButtonGroup>
                            </Box>
                        </Box>
                        <Box>
                            <Box sx={{display: "flex", width: "100%", margin: "5px"}}>
                                <Box sx={{width: "50%"}}>
                                    <Search>
                                        <SearchIconWrapper>
                                            <SearchIcon/>
                                        </SearchIconWrapper>
                                        <StyledInputBase
                                            value={filter}
                                            onChange={handleFilterChange}
                                            placeholder="Search Payment Out No"
                                            inputProps={{"aria-label": "search"}}
                                        />
                                    </Search>
                                </Box>
                                <Box>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={["DatePicker", "DatePicker"]}>
                                            <DatePicker
                                                label="Start Date:"
                                                value={startDate}
                                                onChange={handleStartDateChange}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                            <DatePicker
                                                label="End Date:"
                                                value={endDate}
                                                onChange={handleEndDateChange}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </Box>
                            </Box>
                            <Box>
                                <TableContainer component={Paper} sx={{maxHeight: 500}}>
                                    <Table
                                        sx={{minWidth: 1250}}
                                        aria-label="customized table"
                                        stickyHeader
                                    >
                                        <TableHead>
                                            <TableRow>
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        indeterminate={
                                                            selectedRows.length > 0 &&
                                                            selectedRows.length < salePurchaseUser.length
                                                        }
                                                        checked={
                                                            selectedRows.length === salePurchaseUser.length
                                                        }
                                                        onChange={() =>
                                                            setSelectedRows(
                                                                selectedRows.length === salePurchaseUser.length
                                                                    ? []
                                                                    : salePurchaseUser.map((row) => row.id)
                                                            )
                                                        }
                                                    />
                                                </TableCell>
                                                <StyledTableCell align="center">Date</StyledTableCell>
                                                <StyledTableCell align="center">
                                                    Payment Number
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    Party Name
                                                </StyledTableCell>
                                                <StyledTableCell align="center">Amount</StyledTableCell>
                                                <StyledTableCell align="center">View</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {filterSalePurchase.map((row) => (
                                                <StyledTableRow key={row.id}>
                                                    <TableCell padding="checkbox">
                                                        <Checkbox
                                                            checked={selectedRows.indexOf(row.id) !== -1}
                                                            onClick={() => handleCheckboxClick(row.id)}
                                                        />
                                                    </TableCell>
                                                    <StyledTableCell align="center">
                                                        {formatDate(row.paymentDate)}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        {row.paymentNumberOut}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        {row.partyName}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        <Box>
                                                            <Typography> (₹) {row.amountSettled}</Typography>
                                                        </Box>
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        <IconButton
                                                            aria-label="edit"
                                                            onClick={() => handleBooleanChangeView(row.id)}
                                                        >
                                                            <ArticleIcon/>
                                                        </IconButton>
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            )}
        </>
    );
};
