import React, {useEffect, useRef, useState} from "react";
import {godownDataModel} from "../../datamodel/ManageUserDataModel";
import {useDispatch, useSelector} from "react-redux";
import {fetchGodownBasedOnPrimaryUserIds, saveGodown} from "../../apiservice/UserApiService";
import {addGodown, removeGodown} from "../../redux/Action";
import axios from "axios";
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

export const InventoryGodown = () => {
    const [enable, setEnable] = useState(true);
    const [manageUserObj, setManageUserObj] = useState(godownDataModel);
    const [godownSelected, setGodownSelected] = useState();
    const [mangUser, setMangUser] = useState([]);
    const fileInputRef = useRef(null);
    const dispatch = useDispatch();
    const loginData = useSelector(state => state.loginReducerValue);
    const {godownUser} = useSelector(state => state.godownReducerValue);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [viewParty, setViewParty] = useState([]);
    const [filter, setFilter] = useState('');
    const handleFilterChange = event => {
        setFilter(event.target.value);
    };
    const handleBooleanChange = () => {
        setManageUserObj(godownDataModel);
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
        await saveGodown(manageUserObj, loginData, addObjectOnTop, setManageUserObj, setEnable);
    };
    const addObjectOnTop = (newObject) => {
        const existingIndex = godownUser.findIndex(item => item.id === newObject.id);
        if (existingIndex === -1) {
            setFilteredEmployees([newObject, ...godownUser]);
            setMangUser([newObject, ...godownUser]);
            dispatch(addGodown([newObject, ...godownUser]));
        } else {
            const updatedArray = [...godownUser];
            updatedArray[existingIndex] = newObject;
            setFilteredEmployees(updatedArray);
            setMangUser(updatedArray);
            dispatch(addGodown(updatedArray));
        }
    };

    async function handleDelete(id, event) {
        console.log("DELETE ID " + id)
        const response = await axios.post(`http://api.hesabbook.in/hesabbook/business/account/delete/${id}`);
        //  fetchAllManageUserData();
        dispatch(removeGodown(id));
        setFilteredEmployees(godownUser);
    }

    function handleEdit(id, data) {
        handleBooleanChange();
        findObjectById(id);
        // fetchAllManageUserData();
        // dispatch(updateBusinessUser(data));
    }

    const findObjectById = (id) => {
        const foundItem = filteredEmployees.find(item => item.id === id);
        if (foundItem) {
            setManageUserObj(foundItem);
        } else {
            console.log('Object with ID', id, 'not found');
        }
    };

    /*    useEffect(() => {
            if (businessUser.length > 0) {
                const filteredData = businessUser.filter(employee => {
                    return (employee.businessName.toLowerCase().includes(filter.toLowerCase()) ||
                        employee.gstNumber.toLowerCase().includes(filter.toLowerCase()));
                });
                setFilteredEmployees(filteredData);
            }
        }, [filter, businessUser]);*/
    function fetchAllManageUserData() {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://api.hesabbook.in/hesabbook/business/account/all');
                console.log(response.data.response);
                setMangUser(response.data.response);
                localStorage.setItem('business-details', response.data.response);
                //   dispatch(addManageUser(response.data));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        return fetchData;
    }

    useEffect(() => {
        fetchGodownBasedOnPrimaryUserIds(setFilteredEmployees, dispatch, loginData.primary_user_id);
    }, [setFilteredEmployees]);

    return (
        <>
            {enable && (
                <Box>
                    <Box>
                        <h6>Godown Management</h6>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'left', alignItems: 'left'}}>
                        <TextField
                            select
                            value={godownSelected}
                            onChange={(event) => setGodownSelected(event.target.value)}
                            label="Godown"
                            variant="outlined"
                            margin="normal"
                            sx={{width: '250px'}}
                        >
                            {
                                godownUser.map(bt => (
                                    <MenuItem key={bt.wareHouseName}
                                              value={bt.wareHouseName}>{bt.wareHouseName}</MenuItem>
                                ))
                            }
                        </TextField>
                        <Box sx={{right: '0', float: 'right'}}>
                            <ButtonGroup variant="contained" aria-label="Basic button group">
                                <Button onClick={handleBooleanChange}>Create Godown</Button>
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
                                        placeholder="Enter By Business Name"
                                        inputProps={{'aria-label': 'search'}}

                                        type="text"
                                        value={filter}
                                        onChange={handleFilterChange}
                                    />
                                </Search>
                            </Box>

                        </Box>
                        <Box>
                            <TableContainer component={Paper} sx={{maxHeight: 500}}>
                                <Table sx={{minWidth: 1250}} aria-label="customized table" stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center">Item Name</StyledTableCell>
                                            <StyledTableCell align="center">Item Code</StyledTableCell>
                                            <StyledTableCell align="center">Item Batch</StyledTableCell>
                                            <StyledTableCell align="center">Stock QTY</StyledTableCell>
                                            <StyledTableCell align="center">Stock Value</StyledTableCell>
                                            <StyledTableCell align="center">Selling Price</StyledTableCell>
                                            <StyledTableCell align="center">Purchase Price</StyledTableCell>
                                            <StyledTableCell>Actions</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {viewParty.size > 1 && viewParty.map((row) => (
                                            <StyledTableRow key={row.id}>
                                                <StyledTableCell align="center">{row.businessName}</StyledTableCell>
                                                <StyledTableCell
                                                    align="center">{row.phoneNumber}</StyledTableCell>
                                                <StyledTableCell align="center">{row.email}</StyledTableCell>
                                                <StyledTableCell align="center">{row.gstNumber}</StyledTableCell>
                                                <StyledTableCell align="center">{row.panNumber}</StyledTableCell>
                                                <StyledTableCell align="center">{row.gstNumber}</StyledTableCell>
                                                <StyledTableCell align="center">{row.panNumber}</StyledTableCell>
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
                            <Button size="small" variant="contained">Create/Edit Godown</Button>
                        </Box>
                        <Box sx={{float: 'right', alignItems: 'center', marginLeft: "50px"}}>
                            <Button size="small" variant="contained" onClick={handleBooleanChange}>Cancel</Button>
                            <Button size="small" variant="contained" onClick={handleBooleanChange}>Save</Button>
                        </Box>
                    </Box>
                    <form onSubmit={handleSubmit}>
                        <Box sx={{width: '100%', display: 'flex', flexDirection: 'column'}}>
                            <TextField id="outlined-basic" label="Godown Name" variant="outlined"
                                       sx={{margin: '10px'}}
                                       value={manageUserObj.wareHouseName}
                                       onChange={(event) => handleTextFieldChange(event, 'wareHouseName')}/>
                            <TextField id="outlined-basic" label="Street Address" variant="outlined"
                                       sx={{margin: '10px'}}
                                       value={manageUserObj.address}
                                       onChange={(event) => handleTextFieldChange(event, 'address')}/>
                            <Box sx={{display: 'flex'}}>
                                <TextField
                                    fullWidth
                                    select
                                    value={manageUserObj.state}
                                    onChange={(event) => handleTextFieldChange(event, 'state')}
                                    label="Place of Supply"
                                    variant="outlined"
                                    margin="normal"
                                >
                                    {
                                        UserRole.india.map(bt => (
                                            <MenuItem key={bt.name}
                                                      value={bt.name}>{bt.name}</MenuItem>
                                        ))
                                    }
                                </TextField>
                                <TextField id="outlined-basic" label="Pin Code" variant="outlined"
                                           sx={{margin: '10px'}}
                                           value={manageUserObj.zipCode}
                                           onChange={(event) => handleTextFieldChange(event, 'zipCode')}/>
                            </Box>
                            <TextField id="outlined-basic" label="City" variant="outlined"
                                       sx={{margin: '10px'}}
                                       value={manageUserObj.city}
                                       onChange={(event) => handleTextFieldChange(event, 'city')}/>
                            <TextField id="outlined-basic" label="Notes" variant="outlined"
                                       sx={{margin: '10px'}}
                                       value={manageUserObj.notes}
                                       onChange={(event) => handleTextFieldChange(event, 'notes')}/>
                            <Box>
                                <Button type="submit">SUBMIT</Button>
                            </Box>
                        </Box>
                    </form>
                </Box>
            )}
        </>
    )
}
