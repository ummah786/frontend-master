import {Box, ButtonGroup, TextField} from "@mui/material";
import {alpha, styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import {manageUserDataModel, PartnerDataModel} from "../../datamodel/ManageUserDataModel";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import UserRole from '../../jsonfile/Role';
import MenuItem from "@mui/material/MenuItem";
import {useDispatch} from 'react-redux';
import {addExistingMangeUser, addManageUser, removeEmployee, updateManageUser} from "../../redux/Action";
import ArticleIcon from '@mui/icons-material/Article';
import * as XLSX from 'xlsx';
import {DataGrid} from "@mui/x-data-grid";

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '150%',
        [theme.breakpoints.up('md')]: {
            width: '40ch',
        },
    },
}));

function createData(name: string, calories: number, fat: number, carbs: number, protein: number,) {
    return {name, calories, fat, carbs, protein};
}

export const Party = () => {
    const [enable, setEnable] = useState(true);
    const [enableBulk, setEnableBulk] = useState(true);
    const [manageUserObj, setManageUserObj] = useState(PartnerDataModel);
    const [mangUser, setMangUser] = useState([]);
    const dispatch = useDispatch();
    const handleBooleanChange = () => {
        setManageUserObj(PartnerDataModel);
        setEnable(false);
        setEnableBulk(true);
    };

    function handleBooleanCancelChange() {
        setEnableBulk(true);
        setEnable(true);
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
        const response = await axios.post('http://localhost:8700/hesabbook/partner/save', manageUserObj);
        console.log('Submit Response :--    ', response.data);
        console.log('on Submit :-->', manageUserObj);
        dispatch(addExistingMangeUser(response.data));
        setManageUserObj(manageUserDataModel);
        setEnable(prevState => !prevState);
    };

    async function handleDelete(id, event) {
        console.log("DELETE ID " + id)
        const response = await axios.post(`http://localhost:8700/hesabbook/partner/delete/${id}`);
        console.log('Submit delete Response :--    ', response.data);
        fetchAllManageUserData();
        dispatch(removeEmployee(id));
    }

    function handleEdit(id, data) {
        handleBooleanChange();
        findObjectById(id);
        fetchAllManageUserData();
        dispatch(updateManageUser(data));


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
                const response = await axios.get('http://localhost:8700/hesabbook/partner/all');
                console.log('Party Response ', response.data.response);
                if (response.data.code === 200) {
                    setMangUser(response.data.response);
                    localStorage.setItem('Party-details', response.data.response);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [setMangUser]);

    function handleView(id, row) {

    }

    const [excelData, setExcelData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [files, setFiles] = useState([]);

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
                                        {mangUser.map((row) => (
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

                                    <TextField id="outlined-basic" label="Company" variant="outlined" sx={{margin: '10px'}}
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
                                    <TextField id="outlined-basic" label="Party Category" variant="outlined"
                                               sx={{margin: '10px'}} value={manageUserObj.partyCategory}
                                               onChange={(event) => handleTextFieldChange(event, 'partyCategory')}/>
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
                            <Box sx={{float: 'right', alignItems: 'center', marginLeft: "50px"}}>
                                <Button size="small" variant="contained" onClick={handleBooleanCancelChange}>Cancel</Button>
                                <Button size="small" variant="contained" onClick={handleBooleanCancelChange}>Save</Button>
                            </Box>
                        </Box>
                        <input type="file" onChange={handleFileUpload}/>
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
                    </Box>
                )}
        </>
    )
}