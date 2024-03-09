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
import Typography from "@mui/material/Typography";
import {useEffect, useState} from "react";
import {manageUserDataModel} from "../../datamodel/ManageUserDataModel";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import UserRole from '../../jsonfile/Role';
import MenuItem from "@mui/material/MenuItem";
import {useDispatch} from 'react-redux';
import {addExistingMangeUser, addManageUser, removeEmployee, updateManageUser} from "../../redux/Action";

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

export const MyBussinessAccount = () => {
    const [enable, setEnable] = useState(true);
    const [manageUserObj, setManageUserObj] = useState(manageUserDataModel);
    const [mangUser, setMangUser] = useState([]);
    const dispatch = useDispatch();
    const handleBooleanChange = () => {
        setManageUserObj(manageUserDataModel);
        setEnable(prevState => !prevState);
    };

    const handleTextFieldChange = (event, field) => {
        setManageUserObj({
            ...manageUserObj,
            [field]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await axios.post('http://localhost:8700/hesabbook/manageuser/save', manageUserObj);
        console.log('Submit Response :--    ', response.data);
        console.log('on Submit :-->', manageUserObj);
        dispatch(addExistingMangeUser(response.data));
        setManageUserObj(manageUserDataModel);
        setEnable(prevState => !prevState);
    };

    async function handleDelete(id, event) {
        console.log("DELETE ID " + id)
        const response = await axios.post(`http://localhost:8700/hesabbook/manageuser/delete/${id}`);
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
                const response = await axios.get('http://localhost:8700/hesabbook/manageuser/all');
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
                const response = await axios.get('http://localhost:8700/hesabbook/manageuser/all');
                setMangUser(response.data);
                localStorage.setItem('mangeUser', mangUser);
                dispatch(addManageUser(response.data));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [setMangUser]);

    return (
        <>
            {enable && (
                <Box>
                    <Box>
                        <h6>My Business Account</h6>
                    </Box>
                    <Box>
                        <Box sx={{display: 'flex', width: '100%'}}>
                            <Box sx={{width: '50%'}}>
                                <Search>
                                    <SearchIconWrapper>
                                        <SearchIcon/>
                                    </SearchIconWrapper>
                                    <StyledInputBase
                                        placeholder="Enter By Business Name"
                                        inputProps={{'aria-label': 'search'}}
                                    />
                                </Search>
                            </Box>
                            <Box sx={{width: '50%', right: '0', float: 'right'}}>
                                <ButtonGroup variant="contained" aria-label="Basic button group">
                                    <Button onClick={handleBooleanChange}>Add New Business Details</Button>
                                </ButtonGroup>
                            </Box>
                        </Box>
                        <Box>
                            <TableContainer component={Paper} sx={{maxHeight: 500}}>
                                <Table sx={{minWidth: 1250}} aria-label="customized table" stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center">Business Name</StyledTableCell>
                                            <StyledTableCell align="center">Phone</StyledTableCell>
                                            <StyledTableCell align="center">Email</StyledTableCell>
                                            <StyledTableCell align="center">GST</StyledTableCell>
                                            <StyledTableCell align="center">PAN Number</StyledTableCell>
                                            <StyledTableCell>Actions</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {mangUser.map((row) => (
                                            <StyledTableRow key={row.id}>
                                                <StyledTableCell align="center">{row.id}</StyledTableCell>
                                                <StyledTableCell
                                                    align="center">{row.accountBusinessName}</StyledTableCell>
                                                <StyledTableCell align="center">{row.name}</StyledTableCell>
                                                <StyledTableCell align="center">{row.mobileNumber}</StyledTableCell>
                                                <StyledTableCell align="center">{row.role}</StyledTableCell>
                                                <StyledTableCell>
                                                    <IconButton aria-label="edit"
                                                                onClick={() => handleEdit(row.id, row)}>
                                                        <EditIcon/>
                                                    </IconButton>
                                                    <IconButton aria-label="delete"
                                                                onClick={() => handleDelete(row.id)}>
                                                        <DeleteIcon/>
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
            {!enable && (
                <Box>
                    <Box sx={{display: 'flex'}}>
                        <Box>
                            <Button size="small" variant="contained">Create Manage User</Button>
                        </Box>
                        <Box sx={{float: 'right', alignItems: 'center', marginLeft: "50px"}}>
                            <Button size="small" variant="contained" onClick={handleBooleanChange}>Cancel</Button>
                            <Button size="small" variant="contained" onClick={handleBooleanChange}>Save</Button>
                        </Box>
                    </Box>
                    <form onSubmit={handleSubmit}>
                        <Box sx={{width: '100%', display: 'flex'}}>
                            <Box sx={{
                                width: '50%',
                                display: 'flex',
                                flexDirection: 'column',
                                margin: "100px",
                                marginLeft: '200px'
                            }}>
                                <TextField id="outlined-basic" label="Name" variant="outlined" sx={{margin: '10px'}}
                                           value={manageUserObj.name}
                                           onChange={(event) => handleTextFieldChange(event, 'name')}/>
                                <TextField
                                    fullWidth
                                    select
                                    value={manageUserObj.accountBusinessName}
                                    onChange={(event) => handleTextFieldChange(event, 'accountBusinessName')}
                                    label="Bussiness Name"
                                    variant="outlined"
                                    margin="normal"
                                >
                                    {
                                        UserRole.businessName.map(business => (
                                            <MenuItem key={business.name}
                                                      value={business.name}>{business.name}</MenuItem>))
                                    }
                                </TextField>
                                <TextField id="outlined-basic" label="Email Address" variant="outlined"
                                           sx={{margin: '10px'}} value={manageUserObj.emailAddress}
                                           onChange={(event) => handleTextFieldChange(event, 'emailAddress')}/>
                                <TextField id="outlined-basic" label="Address" variant="outlined" sx={{margin: '10px'}}
                                           value={manageUserObj.address}
                                           onChange={(event) => handleTextFieldChange(event, 'address')}/>
                            </Box>
                            <Box sx={{width: '50%', display: 'flex', flexDirection: 'column', margin: "100px"}}>
                                <TextField
                                    fullWidth
                                    select
                                    value={manageUserObj.role}
                                    onChange={(event) => handleTextFieldChange(event, 'role')}
                                    label="Role"
                                    variant="outlined"
                                    margin="normal"
                                >
                                    {
                                        UserRole.role.map(userrole => (
                                            <MenuItem key={userrole.name}
                                                      value={userrole.name}>{userrole.name}</MenuItem>
                                        ))
                                    }
                                </TextField>
                                <TextField id="outlined-basic" label="Phone Number" variant="outlined"
                                           sx={{margin: '10px'}} value={manageUserObj.mobileNumber}
                                           onChange={(event) => handleTextFieldChange(event, 'mobileNumber')}/>
                                <TextField id="outlined-basic" label="Temp Password" variant="outlined"
                                           sx={{margin: '10px'}} value={manageUserObj.tempPassword}
                                           onChange={(event) => handleTextFieldChange(event, 'tempPassword')}/>

                                <TextField id="outlined-basic" label="User Id" variant="outlined" disabled={true}
                                           sx={{margin: '10px'}} value={manageUserObj.secondary_user_id}
                                           onChange={(event) => handleTextFieldChange(event, 'secondary_user_id')}/>
                                <Box>
                                    <Button type="submit">SUBMIT</Button>
                                </Box>
                            </Box>
                        </Box>
                    </form>
                </Box>
            )}
        </>
    )
}