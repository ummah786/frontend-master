import {Box, ButtonGroup, TextField} from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import Button from "@mui/material/Button";
import * as React from "react";
import {useEffect, useState} from "react";
import {partnerDataModel} from "../../datamodel/ManageUserDataModel";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import UserRole from '../../jsonfile/Role';
import MenuItem from "@mui/material/MenuItem";
import {useDispatch, useSelector} from 'react-redux';
import {addKeyCompany, addManageUser, addParty, removeParty} from "../../redux/Action";
import ArticleIcon from '@mui/icons-material/Article';
import * as XLSX from 'xlsx';
import {DataGrid} from "@mui/x-data-grid";
import {Search, SearchIconWrapper, StyledInputBase, StyledTableCell, StyledTableRow} from "../../commonStyle";
import Modal from "@mui/joy/Modal";
import Sheet from "@mui/joy/Sheet";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";


export const Party = () => {
    const [enable, setEnable] = useState(true);
    const [enableBulk, setEnableBulk] = useState(true);
    const [manageUserObj, setManageUserObj] = useState(partnerDataModel);
    const [mangUser, setMangUser] = useState([]);
    const [excelData, setExcelData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [files, setFiles] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [openCategory, setOpenCategory] = React.useState(false);
    const [openCompany, setOpenCompany] = React.useState(false);
    const [filter, setFilter] = useState('');
    const dispatch = useDispatch();
    const loginData = useSelector(state => state.loginReducerValue);
    const {partyUser} = useSelector(state => state.partyReducerValue);
    const keyCompanyData = useSelector(state => state.keyCompanyReducerValue);
    const handleBooleanChange = () => {
        setManageUserObj(partnerDataModel);
        setEnable(false);
        setEnableBulk(true);
    };
    const handleFilterChange = event => {
        setFilter(event.target.value);
    };
    useEffect(() => {
        if (mangUser.length > 0) {
            const filteredData = mangUser.filter(employee => {
                return (
                    employee.pname.toLowerCase().includes(filter.toLowerCase()) ||
                    employee.company.includes(filter.toLowerCase()) ||
                    employee.gstNumber.includes(filter.toLowerCase()) ||
                    employee.mobileNumber.includes(filter));
            });
            setFilteredEmployees(filteredData);
        }
    }, [filter, mangUser]);

    function handleBooleanCancelChange() {
        setEnableBulk(true);
        setEnable(true);
        setExcelData([]);
        setColumns([]);
        setFiles([]);
    }

    const handleBulkChange = () => {
        setEnableBulk(false);
        setEnable(true);
    }

    const handleTextFieldChange = (event, field) => {
        setManageUserObj({
            ...manageUserObj,
            [field]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        manageUserObj['primary_user_id'] = loginData.primary_user_id;
        manageUserObj['secondary_user_id'] = loginData.secondary_user_id;
        const response = await axios.post('http://localhost:8700/hesabbook/partner/save', manageUserObj);
        console.log('Submit Response :--    ', response.data);
        console.log('on Submit :-->', manageUserObj);
        addObjectOnTop(response.data.response);
        addBusinessName(response.data.response.company);
        setManageUserObj(partnerDataModel);
        setEnable(prevState => !prevState);
    };

    const addBusinessName = (newObject) => {
        dispatch(addKeyCompany([newObject, ...keyCompanyData]))
    }

    const addObjectOnTop = (newObject) => {
        const existingIndex = partyUser.findIndex(item => item.id === newObject.id);
        if (existingIndex === -1) {
            setFilteredEmployees([newObject, ...partyUser]);
            setMangUser([newObject, ...partyUser]);
            dispatch(addParty([newObject, ...partyUser]));
        } else {
            const updatedArray = [...partyUser];
            updatedArray[existingIndex] = newObject;
            setFilteredEmployees(updatedArray);
            setMangUser(updatedArray);
            dispatch(addParty(updatedArray));
        }
    };

    async function handleDelete(id, event) {
        console.log("DELETE ID " + id)
        const response = await axios.post(`http://localhost:8700/hesabbook/partner/delete/${id}`);
        console.log('Submit delete Response :--    ', response.data);
        dispatch(removeParty(id));
        // fetchAllManageUserData();

        setFilteredEmployees(partyUser);
    }

    useEffect(() => {
        if (partyUser.length > 1 && !(partyUser[0].id === '')) {
            console.log("done your job")
            setFilteredEmployees(partyUser);
        }
    }, [partyUser]);


    useEffect(() => {
        if (partyUser.length > 1 && !(partyUser[0].id === '')) {
            console.log("done your job")
            setFilteredEmployees(partyUser);
        } else {
            // fetchData();
        }
    }, [partyUser]);

    /*    const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8700/hesabbook/manageuser/all/${loginData.primary_user_id}`);
                setMangUser(response.data.response);
                dispatch(a(response.data.response));
                setFilteredEmployees(response.data.response);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };*/

    function handleEdit(id, data) {
        handleBooleanChange();
        findObjectById(id);
        fetchAllManageUserData();
        //    dispatch(updateManageUser(data));
    }

    const findObjectById = (id) => {
        const foundItem = mangUser.find(item => item.id === id);
        if (foundItem) {
            setManageUserObj(foundItem);
        } else {
            console.log('Object with ID', id, 'not found');
        }

    };

    function fetchAllManageUserData() {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8700/hesabbook/partner/all');
                console.log(response.data);
                setMangUser(response.data);
                localStorage.setItem('mangeUser', mangUser);
                dispatch(addManageUser(response.data));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        return fetchData;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8700/hesabbook/partner/all/${loginData.primary_user_id}`);
                console.log('Party Response ', response.data.response);
                if (response.data.code === 200) {
                    setMangUser(response.data.response);
                    localStorage.setItem('Party-details', response.data.response);
                    dispatch(addParty(response.data.response));
                    setFilteredEmployees(response.data.response);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [setMangUser]);

    function handleView(id, row) {

    }


    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        setFiles(e.target.files[0])
        const reader = new FileReader();

        reader.onload = (event) => {
            const binaryString = event.target.result;
            const workbook = XLSX.read(binaryString, {type: 'binary'});

            // Assuming you want the first sheet
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            const data = XLSX.utils.sheet_to_json(sheet, {header: 1});

            // Assuming the first row contains column headers
            const headers = data.shift();
            const columns = headers.map((header, index) => ({
                field: 'col' + index,
                headerName: header,
                width: 150,
            }));

            // Creating rows with columns
            const rows = data.map((row, rowIndex) => {
                const rowData = {};
                row.forEach((cell, cellIndex) => {
                    rowData['col' + cellIndex] = cell;
                });
                rowData.id = rowIndex + 1; // Assigning unique id to each row
                return rowData;
            });

            setColumns(columns);
            setExcelData(rows);
        };

        reader.readAsBinaryString(file);
    };


    function FileUpload({onFileChange}) {
        const handleFileChange = (e) => {
            const file = e.target.files[0];
            onFileChange(file);
        };

        return (
            <div>
                <input type="file" accept=".xls, .xlsx" onChange={handleFileChange}/>
            </div>
        );
    }


    const handleSave = async () => {
        console.log("excel sheet  ", excelData);
        console.log("data sheet ", columns);
        const formData = new FormData();
        formData.append('file', files);
        const response = await axios.post('http://localhost:8700/hesabbook/partner/upload', excelData);
        console.log("response from handleSave ", response.data)

    };
    return (
        <>
            {(enable && enableBulk) && (
                <Box>
                    <Box>
                        <Button variant="contained">Party</Button>
                        <Box sx={{right: '0', float: 'right'}}>
                            <ButtonGroup variant="contained" aria-label="Basic button group">
                                <Button onClick={handleBooleanChange}>Create Party</Button>
                                <Button onClick={handleBulkChange}>Create Bulk Party</Button>
                            </ButtonGroup>
                        </Box>
                    </Box>
                    <Box>
                        <Box sx={{display: 'flex', width: '100%'}}>
                            <Box sx={{width: '50%'}}>
                                <Search>
                                    <SearchIconWrapper>
                                        <SearchIcon/>
                                    </SearchIconWrapper>
                                    <StyledInputBase
                                        value={filter}
                                        onChange={handleFilterChange}
                                        placeholder="Search by Business Name,Company,Gst And Mobile Number"
                                        inputProps={{'aria-label': 'search'}}
                                    />
                                </Search>
                            </Box>

                        </Box>
                        <Box>
                            <TableContainer component={Paper} sx={{maxHeight: 500}}>
                                <Table sx={{minWidth: 1250}} aria-label="customized table" stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center">Name</StyledTableCell>
                                            <StyledTableCell align="center">Company</StyledTableCell>
                                            <StyledTableCell align="center">Party Type</StyledTableCell>
                                            <StyledTableCell align="center">GST</StyledTableCell>
                                            <StyledTableCell align="center">Phone</StyledTableCell>
                                            <StyledTableCell align="center">Actions</StyledTableCell>
                                            <StyledTableCell align="center">View</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {filteredEmployees.map((row) => (
                                            <StyledTableRow key={row.id}>
                                                <StyledTableCell align="center">{row.pname}</StyledTableCell>
                                                <StyledTableCell
                                                    align="center">{row.company}</StyledTableCell>
                                                <StyledTableCell align="center">{row.partyType}</StyledTableCell>
                                                <StyledTableCell align="center">{row.gstNumber}</StyledTableCell>
                                                <StyledTableCell align="center">{row.mobileNumber}</StyledTableCell>
                                                <StyledTableCell align="center">
                                                    <IconButton aria-label="edit"
                                                                onClick={() => handleEdit(row.id, row)}>
                                                        <EditIcon/>
                                                    </IconButton>
                                                    <IconButton aria-label="delete"
                                                                onClick={() => handleDelete(row.id)}>
                                                        <DeleteIcon/>
                                                    </IconButton>
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    <IconButton aria-label="edit"
                                                                onClick={() => handleView(row.id, row)}>
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
            )}
            {
                !enable && (
                    <Box>
                        <Box sx={{display: 'flex'}}>
                            <Box>
                                <Button size="small" variant="contained">Create Partner</Button>
                            </Box>
                            <Box sx={{float: 'right', alignItems: 'center', marginLeft: "50px"}}>
                                <Button size="small" variant="contained" onClick={handleBooleanCancelChange}>Cancel</Button>
                                <Button size="small" variant="contained" onClick={handleBooleanCancelChange}>Save</Button>
                            </Box>
                        </Box>
                        <form onSubmit={handleSubmit}>
                            <Box sx={{width: '100%', display: 'flex'}}>
                                <Box sx={{
                                    width: '50%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    margin: "10px",
                                    marginLeft: '200px'
                                }}>
                                    <TextField id="outlined-basic" label="Name" variant="outlined" sx={{margin: '10px'}}
                                               value={manageUserObj.pname}
                                               onChange={(event) => handleTextFieldChange(event, 'pname')}/>

                                    <TextField id="outlined-basic" label="Phone Number" variant="outlined"
                                               sx={{margin: '10px'}} value={manageUserObj.mobileNumber}
                                               onChange={(event) => handleTextFieldChange(event, 'mobileNumber')}/>
                                    <TextField id="outlined-basic" label="Email Address" variant="outlined"
                                               sx={{margin: '10px'}} value={manageUserObj.email}
                                               onChange={(event) => handleTextFieldChange(event, 'email')}/>
                                    <TextField id="outlined-basic" label="Billing Address" variant="outlined"
                                               sx={{margin: '10px'}}
                                               value={manageUserObj.billingAddress}
                                               onChange={(event) => handleTextFieldChange(event, 'billingAddress')}/>
                                    <TextField id="outlined-basic" label="Shipping Address" variant="outlined"
                                               sx={{margin: '10px'}}
                                               value={manageUserObj.shippingAddress}
                                               onChange={(event) => handleTextFieldChange(event, 'shippingAddress')}/>
                                    <TextField id="outlined-basic" label="Company Name" variant="outlined"
                                               sx={{margin: '10px'}}
                                               value={manageUserObj.company}
                                               onChange={(event) => handleTextFieldChange(event, 'company')}/>
                                </Box>
                                <Box sx={{display: 'flex', flexDirection: 'column', margin: "10px", paddingRight: '50px'}}>
                                    <TextField
                                        fullWidth
                                        select
                                        value={manageUserObj.partyType}
                                        onChange={(event) => handleTextFieldChange(event, 'partyType')}
                                        label="Party Type"
                                        variant="outlined"
                                        margin="normal"
                                    >
                                        {
                                            UserRole.PartyType.map(userrole => (
                                                <MenuItem key={userrole.name}
                                                          value={userrole.name}>{userrole.name}</MenuItem>
                                            ))
                                        }
                                    </TextField>
                                    <TextField id="outlined-basic" label="GST Number" variant="outlined"
                                               sx={{margin: '10px'}} value={manageUserObj.gstNumber}
                                               onChange={(event) => handleTextFieldChange(event, 'gstNumber')}/>

                                    <TextField
                                        fullWidth
                                        select
                                        value={manageUserObj.partyCategory}
                                        onChange={(event) => handleTextFieldChange(event, 'partyCategory')}
                                        label="Category"
                                        variant="outlined"
                                        margin="normal"
                                    >
                                        <MenuItem onClick={() => setOpenCategory(true)}>Create a New Category</MenuItem>
                                        {
                                            UserRole.GST.map(userrole => (
                                                <MenuItem key={userrole.name}
                                                          value={userrole.name}>{userrole.name}</MenuItem>
                                            ))
                                        }

                                    </TextField>
                                    <Modal
                                        aria-labelledby="modal-title"
                                        aria-describedby="modal-desc"
                                        open={openCategory}
                                        onClose={() => setOpenCategory(false)}
                                        sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                                    >
                                        <Sheet
                                            variant="outlined"
                                            sx={{
                                                maxWidth: 500,
                                                borderRadius: 'md',
                                                p: 3,
                                                boxShadow: 'lg',
                                            }}
                                        >
                                            <ModalClose variant="plain" sx={{m: 1}}/>
                                            <Typography
                                                component="h2"
                                                id="modal-title"
                                                level="h4"
                                                textColor="inherit"
                                                fontWeight="lg"
                                                mb={1}
                                            >
                                                Category
                                            </Typography>
                                            <Typography id="modal-desc" textColor="text.tertiary">
                                                Make sure to use <code>aria-labelledby</code> on the modal dialog with an
                                                optional <code>aria-describedby</code> attribute.
                                            </Typography>
                                        </Sheet>
                                    </Modal>
                                    <TextField id="outlined-basic" label="Credit Limit" variant="outlined"
                                               sx={{margin: '10px'}} value={manageUserObj.creditLimit}
                                               onChange={(event) => handleTextFieldChange(event, 'creditLimit')}/>

                                    <Box sx={{display: 'flex'}}>
                                        <TextField id="outlined-basic" label="Credit Period" variant="outlined"
                                                   sx={{margin: '10px'}} value={manageUserObj.creditPeriod}
                                                   onChange={(event) => handleTextFieldChange(event, 'creditPeriod')}/>

                                        <TextField
                                            fullWidth
                                            select
                                            value={manageUserObj.creditPeriodType}
                                            onChange={(event) => handleTextFieldChange(event, 'creditPeriodType')}
                                            label="Credit Period Type"
                                            variant="outlined"
                                            margin="normal"
                                        >
                                            {
                                                UserRole.creditPeriod.map(userrole => (
                                                    <MenuItem key={userrole.name}
                                                              value={userrole.name}>{userrole.name}</MenuItem>
                                                ))
                                            }
                                        </TextField>
                                    </Box>

                                    <Box sx={{display: 'flex'}}>
                                        <TextField id="outlined-basic" label="Opening Balance" variant="outlined"
                                                   sx={{margin: '10px'}} value={manageUserObj.openingBalance}
                                                   onChange={(event) => handleTextFieldChange(event, 'openingBalance')}/>

                                        <TextField
                                            fullWidth
                                            select
                                            value={manageUserObj.openingBalanceType}
                                            onChange={(event) => handleTextFieldChange(event, 'openingBalanceType')}
                                            label="Opening Balance Type"
                                            variant="outlined"
                                            margin="normal"
                                        >
                                            {
                                                UserRole.openingBalance.map(userrole => (
                                                    <MenuItem key={userrole.name}
                                                              value={userrole.name}>{userrole.name}</MenuItem>
                                                ))
                                            }
                                        </TextField>
                                    </Box>
                                    <Box>
                                        <Button type="submit">SUBMIT</Button>
                                    </Box>
                                </Box>
                            </Box>
                        </form>
                    </Box>
                )
            }
            {
                !enableBulk && (
                    <Box>
                        <Box sx={{display: 'flex'}}>
                            <Box>
                                <Button size="small" variant="contained">Create Bulk Partner</Button>
                            </Box>
                            <Box sx={{float: 'right', alignItems: 'center', marginLeft: "50px", display: 'flex'}}>
                                <Box>
                                    <a
                                        href={require('../../file/PartySample.xlsx')}
                                        download="PartySample.xlsx"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            /// onClick={handleClick}
                                            sx={{mt: 3, mb: 2, color: "whitesmoke", background: '#212121'}}
                                        >
                                            Download the sample file
                                        </Button>
                                    </a>
                                </Box>
                                <Button size="small" variant="contained" onClick={handleBooleanCancelChange}>Cancel</Button>
                                <Button size="small" variant="contained" onClick={handleBooleanCancelChange}>Save</Button>
                            </Box>
                        </Box>
                        <input type="file" onChange={handleFileUpload}/>
                        {
                            excelData.length > 0 && (
                                <Box
                                    sx={{
                                        height: 550,
                                        width: 1300,
                                        '& .actions': {
                                            color: 'text.secondary',
                                        },
                                        '& .textPrimary': {
                                            color: 'text.primary',
                                        },
                                    }}
                                >
                                    <DataGrid
                                        rows={excelData}
                                        columns={columns}
                                        pageSize={5}
                                        rowsPerPageOptions={[5, 10, 20]}
                                        checkboxSelection
                                        disableSelectionOnClick
                                    />
                                    <button onClick={handleSave}>Save</button>
                                </Box>
                            )
                        }
                    </Box>
                )}
        </>
    )
}