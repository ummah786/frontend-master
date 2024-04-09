import * as React from "react";
import {useEffect, useState} from "react";
import {Box, Button, ButtonGroup, TextField} from "@mui/material";
import {Search, SearchIconWrapper, StyledInputBase, StyledTableCell, StyledTableRow} from "../../commonStyle";
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
import UserRole from "../../jsonfile/Role.json";
import MenuItem from "@mui/material/MenuItem";
import {manageUserDataModel} from "../../datamodel/ManageUserDataModel";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {addManageUser, removeManageUser, updateManageUser} from "../../redux/Action";
import {Input} from "@mui/joy";

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
    const KeyBusinessData = useSelector(state => state.keyBusinessReducerValue);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
    });
    const [employees, setEmployees] = useState([]);

    const addRow = () => {
        //     const newEmployee = {id: employees.length + 1, item: '', quantity: 0, rate: 0, total: 0};
        const newEmployee = {id: employees.length + 1, item: ''};
        setEmployees([...employees, newEmployee]);
    };

    const deleteRow = (id) => {
        const updatedEmployees = employees.filter(employee => employee.id !== id);
        setEmployees(updatedEmployees);
    };

    const handleInputChange = (id, key, value) => {
        const updatedEmployees = employees.map(employee => {
            if (employee.id === id) {
                if (key === 'quantity') {
                    employee.total = value * employee.rate;
                    return {...employee, [key]: value};
                } else if (key === 'rate') {
                    employee.total = value * employee.quantity;
                    return {...employee, [key]: value};
                } else {
                    return {...employee, [key]: value};
                }
            }
            return employee;
        });

        setEmployees(updatedEmployees);
        console.log("Employee  ", employees)
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
        /*  const response = await axios.post('http://localhost:8700/hesabbook/manageuser/save', manageUserObj);

          addObjectOnTop(response.data.response)
          setManageUserObj(manageUserDataModel);*/
        setEnable(prevState => !prevState);


        console.log("submit   --->>>>>", employees);
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

    /*    const getProductKeyValuePair = async () => {
            const response = await axios.get(`http://localhost:8700/hesabbook/product/key/value/get/business/${loginData.primary_user_id}`);
            console.log('Submit delete Response :--    ', response.data.response);
            let responseData = [];
            responseData = response.data.response;
            //  responseData.push('Create a business');
            console.log('response Date after resp', responseData)
            setFetchBusiness(responseData);
        }

      */
    useEffect(() => {
        console.log("Business Name ", KeyBusinessData);
        setFetchBusiness(KeyBusinessData);
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

                    <Box sx={{display: 'flex', width: '100%'}}>
                        <Box sx={{width: '50%'}}>
                            <Box>
                                <h3>Expenses</h3>
                            </Box>
                        </Box>
                        <Box sx={{width: '50%', right: '0', float: 'right'}}>
                            <ButtonGroup variant="contained" aria-label="Basic button group">
                                <Button onClick={handleBooleanChange}>Create Expense</Button>
                            </ButtonGroup>
                        </Box>
                    </Box>
                    <Box>
                        <Box sx={{display: 'flex', width: '100%'}}>
                            <Box sx={{width: '40%'}}>
                                <Search>
                                    <SearchIconWrapper>
                                        <SearchIcon/>
                                    </SearchIconWrapper>
                                    <StyledInputBase
                                        type="text"
                                        value={filter}
                                        onChange={handleFilterChange}
                                        placeholder="Search by Expense Id Or Note "
                                        inputProps={{'aria-label': 'search'}}
                                    />
                                </Search>
                            </Box>
                            <Box sx={{width: '60%', right: '0', float: 'right'}}>
                                <Box sx={{width: '50%', right: '0', float: 'right'}}>
                                    <TextField
                                        fullWidth
                                        select
                                        value={manageUserObj.role}
                                        onChange={(event) => handleTextFieldChange(event, 'role')}
                                        label="Select Expense Type"
                                        variant="outlined"
                                        margin="normal"
                                    >
                                        {
                                            UserRole.expenseType.map(userrole => (
                                                <MenuItem key={userrole.name}
                                                          value={userrole.name}>{userrole.name}</MenuItem>
                                            ))
                                        }
                                    </TextField></Box>
                                <Box sx={{width: '50%', right: '0', float: 'right'}}>
                                    <TextField
                                        fullWidth
                                        select
                                        value={manageUserObj.role}
                                        onChange={(event) => handleTextFieldChange(event, 'role')}
                                        label="Select Payment Mode"
                                        variant="outlined"
                                        margin="normal"
                                    >
                                        {
                                            UserRole.paymentMode.map(userrole => (
                                                <MenuItem key={userrole.name}
                                                          value={userrole.name}>{userrole.name}</MenuItem>
                                            ))
                                        }
                                    </TextField>
                                </Box>
                            </Box>
                        </Box>
                        <Box>
                            <TableContainer component={Paper} sx={{maxHeight: 500}}>
                                <Table sx={{minWidth: 1250}} aria-label="customized table" stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center">Id</StyledTableCell>
                                            <StyledTableCell align="center">Total Amount</StyledTableCell>
                                            <StyledTableCell align="center">Expense Type</StyledTableCell>
                                            <StyledTableCell align="center">Note</StyledTableCell>
                                            <StyledTableCell align="center">Expense Date</StyledTableCell>
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
            {
                !enable && (
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
                            <Box>
                                <Box sx={{display: 'flex'}}>
                                    <Box sx={{width: '50%'}}>
                                        <TextField
                                            fullWidth
                                            select

                                            value={manageUserObj.role}
                                            onChange={(event) => handleTextFieldChange(event, 'role')}
                                            label="Select Expense Type"
                                            variant="outlined"
                                            margin="normal"
                                        >
                                            {
                                                UserRole.expenseType.map(userrole => (
                                                    <MenuItem key={userrole.name}
                                                              value={userrole.name}>{userrole.name}</MenuItem>
                                                ))
                                            }
                                        </TextField>
                                        <TextField
                                            fullWidth
                                            select
                                            value={manageUserObj.role}
                                            onChange={(event) => handleTextFieldChange(event, 'role')}
                                            label="Select Payment Mode"
                                            variant="outlined"
                                            margin="normal"
                                        >
                                            {
                                                UserRole.paymentMode.map(userrole => (
                                                    <MenuItem key={userrole.name}
                                                              value={userrole.name}>{userrole.name}</MenuItem>
                                                ))
                                            }
                                        </TextField>
                                    </Box>
                                    <Box sx={{width: '50%'}}>
                                        <TextField id="outlined-basic" label="Notes" variant="outlined"
                                                   fullWidth value={manageUserObj.mobileNumber}
                                                   onChange={(event) => handleTextFieldChange(event, 'mobileNumber')}/>
                                        <Input
                                            type="date"
                                            value={manageUserObj.dob}
                                            onChange={(event) => handleTextFieldChange(event, 'dob')}
                                        />
                                    </Box>
                                </Box>
                                <Box>
                                    <TableContainer component={Paper} sx={{maxHeight: 280}}>
                                        <Table sx={{minWidth: 1250}} aria-label="customized table" stickyHeader>
                                            <TableHead>
                                                <TableRow>
                                                    <StyledTableCell align="center">Item Name</StyledTableCell>
                                                    <StyledTableCell align="center">Quantity</StyledTableCell>
                                                    <StyledTableCell align="center">Rate</StyledTableCell>
                                                    <StyledTableCell align="center">Total</StyledTableCell>
                                                    <StyledTableCell align="center">Action</StyledTableCell>
                                                </TableRow>
                                            </TableHead>


                                            <TableBody>
                                                {employees.map(employee => (
                                                    <TableRow key={employee.id}>
                                                        <StyledTableCell align="center">
                                                            <TextField
                                                                value={employee.item}
                                                                onChange={(e) => handleInputChange(employee.id, 'item', e.target.value)}
                                                            />
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">
                                                            <TextField
                                                                value={employee.quantity}
                                                                onChange={(e) => handleInputChange(employee.id, 'quantity', e.target.value)}
                                                            />
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">
                                                            <TextField
                                                                value={employee.rate}
                                                                onChange={(e) => handleInputChange(employee.id, 'rate', e.target.value)}
                                                            />
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">
                                                            <TextField
                                                                value={employee.total}
                                                                //   onChange={(e) => handleInputChange(employee.id, 'total', employee.quantity * employee.rate)}
                                                            />
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">
                                                            <Button onClick={() => deleteRow(employee.id)}>Delete</Button>
                                                        </StyledTableCell>
                                                    </TableRow>


                                                ))}
                                            </TableBody>
                                        </Table>
                                        <Button onClick={addRow}>Add Row</Button>
                                    </TableContainer>
                                </Box>

                                <Box>
                                    <Button type="submit">SUBMIT</Button>
                                </Box>
                            </Box>
                        </form>
                    </Box>
                )
            }
        </>
    )


}