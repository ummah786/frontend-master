import {Autocomplete, Box, Button, Card, CardContent, Grid, Modal, TextField, Typography} from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import * as React from "react";
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
import {Search, SearchIconWrapper, style, StyledInputBase, StyledTableCell, StyledTableRow} from "../../commonStyle";
import Sheet from "@mui/joy/Sheet";
import ModalClose from "@mui/joy/ModalClose";
import {Transition} from "react-transition-group";
import PeopleIcon from '@mui/icons-material/People';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

export const AccountManagementUsers = () => {
    const [enable, setEnable] = useState(true);
    const [manageUserObj, setManageUserObj] = useState(manageUserDataModel);
    const [mangUser, setMangUser] = useState([]);
    const dispatch = useDispatch();
    const [filter, setFilter] = useState('');
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const {manageUsers} = useSelector(state => state.manageUserReducerValue);
    const [fetchBusiness, setFetchBusiness] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const loginData = useSelector(state => state.loginReducerValue);
    const KeyBusinessData = useSelector(state => state.keyBusinessReducerValue);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
    });
    const [cAFlag, setCAFlag] = useState(false);


    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmitModal = (e) => {
        console.log('', formData);
        handleCloseModal()
    };

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
        manageUserObj['primary_user_id'] = loginData.primary_user_id;
        manageUserObj['secondary_user_id'] = loginData.secondary_user_id;
        const response = await axios.post('http://localhost:8700/hesabbook/manageuser/save', manageUserObj);

        addObjectOnTop(response.data.response)
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
    useEffect(() => {
        console.log("Business Name ", KeyBusinessData);
        setFetchBusiness(KeyBusinessData);
    }, [setFetchBusiness])

    const handleSaveCA = async (event) => {
        event.preventDefault();
        manageUserObj['primary_user_id'] = loginData.primary_user_id;
        manageUserObj['secondary_user_id'] = loginData.secondary_user_id;
        const response = await axios.post('http://localhost:8700/hesabbook/manageuser/save', manageUserObj);
        addObjectOnTop(response.data.response)
        setManageUserObj(manageUserDataModel);
        setCAFlag(false);
    };
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8700/hesabbook/manageuser/all/${loginData.primary_user_id}`);
            setMangUser(response.data.response);
            localStorage.setItem('mangeUser', mangUser);
            dispatch(addManageUser(response.data.response));
            setFilteredEmployees(response.data.response);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <>
            {enable && (
                <Box>
                    <Box>
                        <h5>Manage Users</h5>
                    </Box>
                    <Box>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Card variant="outlined" style={{backgroundColor: '#f5f5ff'}}>
                                    <CardContent style={{padding: '8px'}}>
                                        <Box display="flex" alignItems="center">
                                            <PeopleIcon
                                                style={{color: '#00c853', marginRight: '4px', fontSize: '16px'}}/>
                                            <Typography variant="body2" color="textSecondary" gutterBottom>
                                                Number of Users
                                            </Typography>
                                        </Box>
                                        <Typography variant="h6">3</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={6}>
                                <Card variant="outlined">
                                    <CardContent style={{padding: '8px'}}>
                                        <Box display="flex" alignItems="center">
                                            <TrendingUpIcon
                                                style={{color: '#1e88e5', marginRight: '4px', fontSize: '16px'}}/>
                                            <Typography variant="body2" color="textSecondary" gutterBottom>
                                                Activities Performed
                                            </Typography>
                                        </Box>
                                        <Typography variant="h6">1</Typography>

                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                        <Box sx={{
                            display: 'flex',
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <Box sx={{display: 'flex', width: '40%', justifyContent: 'center', alignItems: 'center'}}>
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
                            <Box sx={{display: 'flex', justifyContent: 'flex-end', width: '60%', margin: "5px"}}>
                                <Button type="submit" variant="contained" sx={{marginRight: "10px"}}
                                        onClick={() => setCAFlag(true)}>
                                    Add Your CA
                                </Button>
                                <Button onClick={handleBooleanChange} type="submit" variant="contained"
                                        sx={{marginRight: "10px"}}>
                                    Add New User
                                </Button>
                                <Transition in={cAFlag} timeout={400}>
                                    <Modal
                                        open={cAFlag}
                                        onClose={() => setCAFlag(false)}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Box sx={style}>
                                            <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                                <ModalClose
                                                    onClick={() => setCAFlag(false)}
                                                    variant="plain"
                                                    sx={{
                                                        m: 1,
                                                        borderStyle: "dashed",
                                                        borderWidth: "2px",
                                                    }}
                                                />
                                                <Typography component="h1" variant="h5">
                                                    Save CA Information
                                                </Typography>
                                                <Box component="form" onSubmit={handleSaveCA} noValidate sx={{mt: 1}}>
                                                    <TextField
                                                        id="outlined-basic"
                                                        label="Name"
                                                        variant="outlined"
                                                        value={manageUserObj.name}
                                                        fullWidth
                                                        sx={{mt: 1}}
                                                        onChange={(event) => handleTextFieldChange(event, 'name')}
                                                    />
                                                    <TextField
                                                        id="outlined-basic"
                                                        label="Email Address"
                                                        variant="outlined"
                                                        fullWidth
                                                        sx={{mt: 1}}
                                                        value={manageUserObj.emailAddress}
                                                        onChange={(event) => handleTextFieldChange(event, 'emailAddress')}
                                                    />
                                                    <TextField
                                                        sx={{mt: 1}}
                                                        select
                                                        value={manageUserObj.role}
                                                        onChange={(event) => handleTextFieldChange(event, 'role')}
                                                        label="Role"
                                                        fullWidth
                                                        variant="outlined"
                                                        margin="normal"
                                                    >
                                                        <MenuItem key="CA" value="CA">CA</MenuItem>
                                                    </TextField>
                                                    <TextField
                                                        id="outlined-basic"
                                                        label="Phone Number"
                                                        variant="outlined"
                                                        fullWidth
                                                        sx={{mt: 1}}
                                                        value={manageUserObj.mobileNumber}
                                                        onChange={(event) => handleTextFieldChange(event, 'mobileNumber')}
                                                    />
                                                    <Button
                                                        type="submit"
                                                        fullWidth
                                                        variant="contained"
                                                        onClick={handleSaveCA}
                                                        sx={{
                                                            mt: 3,
                                                            mb: 2,
                                                            color: "whitesmoke",
                                                            background: "#212121",
                                                        }}
                                                    >
                                                        SUBMIT
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Modal>
                                </Transition>
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
                            <Button size="small" variant="contained" sx={{marginTop: '40px', marginLeft: "210px"}}>Create
                                Manage User</Button>
                        </Box>
                        <Box sx={{float: 'right', alignItems: 'center', marginLeft: "555px", marginTop: '40px'}}>
                            <Button sx={{marginRight: "10px"}} size="small" variant="contained"
                                    onClick={handleBooleanChange}>Cancel</Button>
                            <Button size="small" variant="contained" onClick={handleBooleanChange}>Save</Button>
                        </Box>
                    </Box>
                    <form onSubmit={handleSubmit}>
                        <Box sx={{width: '100%', display: 'flex'}}>
                            <Box sx={{
                                width: '50%',
                                display: 'flex',
                                flexDirection: 'column',
                                marginTop: "10px",
                                marginLeft: '200px'
                            }}>
                                <TextField id="outlined-basic" label="Name" variant="outlined" sx={{margin: '10px'}}
                                           value={manageUserObj.name}
                                           onChange={(event) => handleTextFieldChange(event, 'name')}/>

                                <div>
                                    <Autocomplete
                                        options={fetchBusiness}
                                        sx={{margin: '10px'}}
                                        value={manageUserObj.accountBusinessName}
                                        renderInput={(params) => <TextField {...params} label="Business Name"/>}
                                        onInputChange={(event, value, reason) => {
                                            if (reason === 'clear') {
                                                setSelectedOption(null);
                                                setOpenModal(false);
                                            } else if (value !== '') {
                                                setSelectedOption(value)
                                            } else if (value === '') {
                                                setSelectedOption(null);
                                                //  setOpenModal(false);
                                            }
                                        }}
                                        inputValue={selectedOption || ''}
                                        onChange={(event, value) => {
                                            handleOptionClick(value);
                                        }}
                                    />
                                    <Modal
                                        aria-labelledby="modal-title"
                                        aria-describedby="modal-desc"
                                        open={openModal}
                                        onClose={handleCloseModal}
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
                                            <ModalClose variant="plain" sx={{m: 1}} onClick={handleCloseModal}/>

                                            <h2>Modal Form</h2>
                                            <TextField
                                                label="Name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                fullWidth
                                                margin="normal"
                                            />
                                            <TextField
                                                label="Email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                fullWidth
                                                margin="normal"
                                            />
                                            <Button type="submit" variant="contained" color="primary"
                                                    onClick={handleSubmitModal}>Submit</Button>

                                        </Sheet>
                                    </Modal>
                                </div>
                                <TextField id="outlined-basic" label="Email Address" variant="outlined"
                                           sx={{margin: '10px'}} value={manageUserObj.emailAddress}
                                           onChange={(event) => handleTextFieldChange(event, 'emailAddress')}/>
                                <TextField id="outlined-basic" label="Address" variant="outlined" sx={{margin: '10px'}}
                                           value={manageUserObj.address}
                                           onChange={(event) => handleTextFieldChange(event, 'address')}/>
                            </Box>
                            <Box sx={{
                                width: '50%',
                                display: 'flex',
                                flexDirection: 'column',
                                margin: "10px",
                                marginRight: "200px"
                            }}>
                                <TextField
                                    sx={{margin: '10px'}}
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
                                <Box sx={{float: 'right', marginLeft: "340px"}}>
                                    <Button type="submit" variant="contained">SUBMIT</Button>
                                </Box>
                            </Box>
                        </Box>
                    </form>
                </Box>
            )}
        </>
    )


}
