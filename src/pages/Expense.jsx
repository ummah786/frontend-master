import * as React from "react";
import {useEffect, useState} from "react";
import {manageUserDataModel} from "../datamodel/ManageUserDataModel";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import {addManageUser, removeManageUser, updateManageUser} from "../redux/Action";
import {Autocomplete, Box, Button, ButtonGroup, Modal, TextField} from "@mui/material";
import {Search, SearchIconWrapper, StyledInputBase, StyledTableCell, StyledTableRow} from "../commonStyle";
import SearchIcon from "@mui/icons-material/Search";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Sheet from "@mui/joy/Sheet";
import ModalClose from "@mui/joy/ModalClose";
import UserRole from "../jsonfile/Role.json";
import MenuItem from "@mui/material/MenuItem";
import "react-datepicker/dist/react-datepicker.css";
import {styled} from '@mui/material/styles';
import {DemoContainer, DemoItem} from '@mui/x-date-pickers/internals/demo';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import {DateRangePicker} from '@mui/x-date-pickers-pro/DateRangePicker';

export const Expense = () => {
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
    const [formData, setFormData] = useState({
        name: '',
        email: '',
    });
    const [date, setDate] = useState(new Date());
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();


    const ProSpan = styled('span')({
        display: 'inline-block',
        height: '1em',
        width: '1em',
        verticalAlign: 'middle',
        marginLeft: '0.3em',
        marginBottom: '0.08em',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundImage: 'url(https://mui.com/static/x/pro.svg)',
    });

    function Label({componentName, valueType, isProOnly}) {
        const content = (
            <span>
      <strong>{componentName}</strong> for {valueType} editing
    </span>
        );

        if (isProOnly) {
            return (
                <Stack direction="row" spacing={0.5} component="span">
                    <Tooltip title="Included on Pro package">
                        <a
                            href="https://mui.com/x/introduction/licensing/#pro-plan"
                            aria-label="Included on Pro package"
                        >
                            <ProSpan/>
                        </a>
                    </Tooltip>
                    {content}
                </Stack>
            );
        }

        return content;
    }


    const handleStartDateChange = date => {
        setStartDate(date);
    };

    const handleEndDateChange = date => {
        setEndDate(date);
    };


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

    const getProductKeyValuePair = async () => {
        const response = await axios.get(`http://localhost:8700/hesabbook/product/key/value/get/business/${loginData.primary_user_id}`);
        console.log('Submit delete Response :--    ', response.data.response);
        let responseData = [];
        responseData = response.data.response;
        //  responseData.push('Create a business');
        console.log('response Date after resp', responseData)
        setFetchBusiness(responseData);
    }

    useEffect(() => {
        getProductKeyValuePair();
    }, [setFetchBusiness])


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
                        <h2>Expense</h2>
                    </Box>
                    <Box>
                        <Box sx={{display: 'flex', width: '100%'}}>
                            <Box>
                                <Search>
                                    <SearchIconWrapper>
                                        <SearchIcon/>
                                    </SearchIconWrapper>
                                    <StyledInputBase
                                        type="text"
                                        value={filter}
                                        onChange={handleFilterChange}
                                        placeholder="Search Expense"
                                        inputProps={{'aria-label': 'search'}}
                                    />
                                </Search>
                            </Box>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer
                                    components={[
                                        'DatePicker',
                                        'TimePicker',
                                        'DateTimePicker',
                                        'DateRangePicker',
                                    ]}
                                >
                                    <DemoItem label={<Label componentName="DatePicker" valueType="date"/>}>
                                        <DatePicker/>
                                    </DemoItem>
                                    <DemoItem label={<Label componentName="TimePicker" valueType="time"/>}>
                                        <TimePicker/>
                                    </DemoItem>
                                    <DemoItem
                                        label={<Label componentName="DateTimePicker" valueType="date time"/>}
                                    >
                                        <DateTimePicker/>
                                    </DemoItem>
                                    <DemoItem
                                        label={
                                            <Label
                                                componentName="DateRangePicker"
                                                valueType="date range"
                                                isProOnly
                                            />
                                        }
                                        component="DateRangePicker"
                                    >
                                        <DateRangePicker
                                            localeText={{
                                                start: '',
                                                end: '',
                                            }}
                                        />
                                    </DemoItem>
                                </DemoContainer>
                            </LocalizationProvider>

                            <Box sx={{right: '0', float: 'right'}}>
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
                                        options={fetchBusiness}
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