import {Autocomplete, Box, Button, ButtonGroup, Modal, TextField} from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import Typography from "@mui/material/Typography";
import {useEffect, useState} from "react";
import {manageUserDataModel} from "../../datamodel/ManageUserDataModel";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import UserRole from '../../jsonfile/Role';
import MenuItem from "@mui/material/MenuItem";
import {useDispatch, useSelector} from 'react-redux';
import {addManageUser, removeManageUser, updateManageUser} from "../../redux/Action";
import {Search, SearchIconWrapper, StyledInputBase, StyledTableCell, StyledTableRow} from "../../commonStyle";

export const AccountManagementUsers = () => {
    const [enable, setEnable] = useState(true);
    const [manageUserObj, setManageUserObj] = useState(manageUserDataModel);
    const [mangUser, setMangUser] = useState([]);
    const dispatch = useDispatch();
    const [filter, setFilter] = useState('');
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const {manageUsers} = useSelector(state => state.manageUserReducerValue);

    const options = ['Asif 1', 'Raja 2', 'Create a business'];

    const [openModal, setOpenModal] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionClick = (option) => {
        if (option === 'Create a business') {
            console.log("option a ", option)
            setOpenModal(true);
        } else {
            console.log("option ab ", option)
            setSelectedOption(option);
            setManageUserObj({
                ...manageUserObj,
                ['accountBusinessName']: option,
            });
        }
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleFilterChange = event => {
        setFilter(event.target.value);
    };


    useEffect(() => {
        if (mangUser.length > 0) {
            const filteredData = mangUser.filter(employee => {
                return (employee.name.toLowerCase().includes(filter.toLowerCase()) ||
                    employee.accountBusinessName.toLowerCase().includes(filter.toLowerCase()) ||
                    employee.mobileNumber.includes(filter));
            });
            setFilteredEmployees(filteredData);
        }
    }, [filter, mangUser]);

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

        addObjectOnTop(response.data)
        setManageUserObj(manageUserDataModel);
        setEnable(prevState => !prevState);
    };

    const addObjectOnTop = (newObject) => {
        const existingIndex = manageUsers.findIndex(item => item.id === newObject.id);
        if (existingIndex === -1) {
            setFilteredEmployees([newObject, ...manageUsers]);
            setMangUser([newObject, ...manageUsers]);
            dispatch(addManageUser([newObject, ...manageUsers]));
        } else {
            const updatedArray = [...manageUsers];
            updatedArray[existingIndex] = newObject;
            setFilteredEmployees(updatedArray);
            setMangUser(updatedArray);
            dispatch(addManageUser(updatedArray));
        }
    };

    async function handleDelete(id, event) {
        const response = await axios.post(`http://localhost:8700/hesabbook/manageuser/delete/${id}`);
        console.log('Submit delete Response :--    ', response.data);
        dispatch(removeManageUser(id));
        //   fetchAllManageUserData();
        setFilteredEmployees(manageUsers);
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
                dispatch(addManageUser(mangUser))
                {
                    mangUser.map((mangus) => (
                        dispatch(addManageUser({mangus}))
                    ))
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        return fetchData;
    }

    useEffect(() => {
        if (manageUsers.length > 1 && !(manageUsers[0].id === '')) {
            console.log("done your job")
            setFilteredEmployees(manageUsers);
        }
    }, [manageUsers]);


    useEffect(() => {
        if (manageUsers.length > 1 && !(manageUsers[0].id === '')) {
            console.log("done your job")
            setFilteredEmployees(manageUsers);
        } else {
            fetchData();
        }
    }, [setMangUser]);


    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8700/hesabbook/manageuser/all');
            setMangUser(response.data);
            localStorage.setItem('mangeUser', mangUser);
            dispatch(addManageUser(response.data));
            setFilteredEmployees(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <>
            {enable && (
                <Box>
                    <Box>
                        <h6>Manage Users</h6>
                    </Box>
                    <Box>
                        <Box sx={{display: "flex"}}>
                            <Box sx={{border: '1px solid #000'}}>
                                <Typography variant="caption" display="block" gutterBottom>Number of Users</Typography>
                                <Box>
                                    <Typography variant="h5">5</Typography>
                                </Box>
                            </Box>
                            <Box sx={{border: '1px solid #000'}}>
                                <Typography variant="caption" display="block" gutterBottom>Activites
                                    Performed</Typography>
                                <Box>
                                    <Typography variant="h5">2</Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{display: 'flex', width: '100%'}}>
                            <Box sx={{width: '50%'}}>
                                <Search>
                                    <SearchIconWrapper>
                                        <SearchIcon/>
                                    </SearchIconWrapper>
                                    <StyledInputBase
                                        type="text"
                                        value={filter}
                                        onChange={handleFilterChange}
                                        placeholder="Search by User Name or Mobile Number"
                                        inputProps={{'aria-label': 'search'}}
                                    />
                                </Search>
                            </Box>
                            <Box sx={{width: '50%', right: '0', float: 'right'}}>
                                <ButtonGroup variant="contained" aria-label="Basic button group">
                                    <Button>Add Your CA</Button>
                                    <Button onClick={handleBooleanChange}>Add New User</Button>
                                </ButtonGroup>
                            </Box>
                        </Box>
                        <Box>
                            <TableContainer component={Paper} sx={{maxHeight: 500}}>
                                <Table sx={{minWidth: 1250}} aria-label="customized table" stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center">Id</StyledTableCell>
                                            <StyledTableCell align="center">Business Name</StyledTableCell>
                                            <StyledTableCell align="center">Name</StyledTableCell>
                                            <StyledTableCell align="center">Phone</StyledTableCell>
                                            <StyledTableCell align="center">Role</StyledTableCell>
                                            <StyledTableCell>Actions</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {/* //    {mangUser*/}


                                        {filteredEmployees.map((row) => (
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

                                <div>
                                    <Autocomplete
                                        options={options}
                                        value={manageUserObj.accountBusinessName}
                                        renderInput={(params) => <TextField {...params} label="Options"/>}
                                        onInputChange={(event, value, reason) => {
                                            if (reason === 'clear') {
                                                setSelectedOption(null);
                                                setOpenModal(false);
                                            } else if (value !== '') {
                                                setSelectedOption(value)
                                            } else if (value === '') {
                                                setSelectedOption(null);
                                                setOpenModal(false);
                                            }
                                        }}
                                        inputValue={selectedOption || ''}
                                        onChange={(event, value) => {
                                            handleOptionClick(value);
                                        }}
                                    />
                                    <Modal
                                        open={openModal}
                                        onClose={handleCloseModal}
                                        aria-labelledby="modal-title"
                                        aria-describedby="modal-description"
                                    >
                                        <Box sx={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                            width: 400,
                                            bgcolor: 'background.paper',
                                            boxShadow: 24,
                                            p: 4
                                        }}>
                                            <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
                                                Selected Option
                                            </Typography>
                                      
                                        </Box>
                                    </Modal>
                                </div>
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