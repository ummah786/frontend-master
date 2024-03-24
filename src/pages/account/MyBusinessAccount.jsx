import {Box, Button, ButtonGroup, FormControlLabel, TextField} from "@mui/material";
import React, {useEffect, useRef, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import {businessAccountDataModel} from "../../datamodel/ManageUserDataModel";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import UserRole from '../../jsonfile/Role';
import MenuItem from "@mui/material/MenuItem";
import {useDispatch, useSelector} from 'react-redux';
import {addBusinessUser, removeBusinessUser, updateBusinessUser} from "../../redux/Action";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Typography from "@mui/material/Typography";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {Search, SearchIconWrapper, StyledInputBase, StyledTableCell, StyledTableRow} from "../../commonStyle";
import {fetchBusinessDetailsBasedOnPrimaryUserIds, saveBusinessAccount} from "../../apiservice/UserApiService";

export const MyBusinessAccount = () => {
    const [enable, setEnable] = useState(true);
    const [manageUserObj, setManageUserObj] = useState(businessAccountDataModel);
    const [mangUser, setMangUser] = useState([]);
    const fileInputRef = useRef(null);
    const dispatch = useDispatch();
    const loginData = useSelector(state => state.loginReducerValue);
    const {businessUser} = useSelector(state => state.manageBusinessReducerValue);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [filter, setFilter] = useState('');
    const handleFilterChange = event => {
        setFilter(event.target.value);
    };

    const handleBooleanChange = () => {
        setManageUserObj(businessAccountDataModel);
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
        await saveBusinessAccount(manageUserObj, loginData, addObjectOnTop, setManageUserObj, setEnable);
    };
    const addObjectOnTop = (newObject) => {
        const existingIndex = businessUser.findIndex(item => item.id === newObject.id);
        if (existingIndex === -1) {
            setFilteredEmployees([newObject, ...businessUser]);
            setMangUser([newObject, ...businessUser]);
            dispatch(addBusinessUser([newObject, ...businessUser]));
        } else {
            const updatedArray = [...businessUser];
            updatedArray[existingIndex] = newObject;
            setFilteredEmployees(updatedArray);
            setMangUser(updatedArray);
            dispatch(addBusinessUser(updatedArray));
        }
    };

    async function handleDelete(id, event) {
        console.log("DELETE ID " + id)
        const response = await axios.post(`http://localhost:8700/hesabbook/business/account/delete/${id}`);
        //  fetchAllManageUserData();
        dispatch(removeBusinessUser(id));
        setFilteredEmployees(businessUser);
    }

    function handleEdit(id, data) {
        handleBooleanChange();
        setEnable(prevState => !prevState);
        findObjectById(id);
        // fetchAllManageUserData();
        dispatch(updateBusinessUser(data));
    }

    const findObjectById = (id) => {
        const foundItem = filteredEmployees.find(item => item.id === id);
        if (foundItem) {
            setManageUserObj(foundItem);
        } else {
            console.log('Object with ID', id, 'not found');
        }

    };

    useEffect(() => {
        if (businessUser.length > 0) {
            const filteredData = businessUser.filter(employee => {
                return (employee.businessName.toLowerCase().includes(filter.toLowerCase()) ||
                    employee.gstNumber.toLowerCase().includes(filter.toLowerCase()));
            });
            setFilteredEmployees(filteredData);
        }
    }, [filter, businessUser]);

    function fetchAllManageUserData() {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8700/hesabbook/business/account/all');
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

    const handleCheckboxChange = (event) => {
        const {name, checked} = event.target;
        setManageUserObj({...manageUserObj, [name]: checked});
    };
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');

    const handleImageUpload = (event, setImage) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        fetchBusinessDetailsBasedOnPrimaryUserIds(setFilteredEmployees, dispatch);
    }, [setFilteredEmployees]);

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

                                        type="text"
                                        value={filter}
                                        onChange={handleFilterChange}
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
                                        {filteredEmployees.map((row) => (
                                            <StyledTableRow key={row.id}>
                                                <StyledTableCell align="center">{row.businessName}</StyledTableCell>
                                                <StyledTableCell
                                                    align="center">{row.phoneNumber}</StyledTableCell>
                                                <StyledTableCell align="center">{row.email}</StyledTableCell>
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
                            <Button size="small" variant="contained">Create/Edit Business Account</Button>
                        </Box>
                        <Box sx={{float: 'right', alignItems: 'center', marginLeft: "50px"}}>
                            <Button size="small" variant="contained" onClick={handleBooleanChange}>Cancel</Button>
                            <Button size="small" variant="contained" onClick={handleBooleanChange}>Save</Button>
                        </Box>
                    </Box>
                    <form onSubmit={handleSubmit}>
                        <Box sx={{width: '100%', display: 'flex'}}>
                            <Box sx={{
                                width: '25%',
                                display: 'flex',
                                flexDirection: 'column',
                                margin: "10px",
                                marginLeft: '180px'
                            }}>
                                <Card sx={{maxWidth: 305}}>
                                    <CardMedia
                                        sx={{height: 100, width: 100}}
                                        sx={{height: 140}}
                                        image={image1}
                                        alt="Card 1 Image"
                                        title="avatar"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Avatar
                                        </Typography>
                                    </CardContent>
                                    <input
                                        accept="image/*"
                                        style={{display: 'none'}}
                                        id="image-upload-2"
                                        type="file"
                                        onChange={(event) => handleImageUpload(event, setImage2)}
                                    />
                                    <CardActions>
                                        <CardContent>
                                            <input
                                                accept="image/*"
                                                style={{display: 'none'}}
                                                id="image-upload-1"
                                                type="file"
                                                onChange={(event) => handleImageUpload(event, setImage1)}
                                            />
                                            <label htmlFor="image-upload-1">
                                                <Button variant="contained" component="span">
                                                    Upload Image for Card 1
                                                </Button>
                                            </label>
                                        </CardContent>
                                    </CardActions>
                                </Card>
                                <Card sx={{maxWidth: 345, marginTop: '30px'}}>
                                    <CardMedia
                                        sx={{height: 140}}
                                        image={image2}
                                        alt="Card 1 Image"
                                        title="Signature"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Signature
                                        </Typography>

                                    </CardContent>
                                    <input
                                        accept="image/*"
                                        style={{display: 'none'}}
                                        id="image-upload-2"
                                        type="file"
                                        onChange={(event) => handleImageUpload(event, setImage2)}
                                    />
                                    <CardActions>
                                        <CardContent>
                                            <input
                                                accept="image/*"
                                                style={{display: 'none'}}
                                                id="image-upload-2"
                                                type="file"
                                                onChange={(event) => handleImageUpload(event, setImage2)}
                                            />
                                            <label htmlFor="image-upload-2">
                                                <Button variant="contained" component="span">
                                                    Upload Image for Card 2
                                                </Button>
                                            </label>
                                        </CardContent>
                                    </CardActions>
                                </Card>
                            </Box>
                            <Box sx={{
                                width: '25%',
                                display: 'flex',
                                flexDirection: 'column',
                                margin: "10px",
                                marginLeft: '20px'
                            }}>
                                <TextField id="outlined-basic" label="Business Name" variant="outlined"
                                           sx={{margin: '10px'}}
                                           value={manageUserObj.businessName}
                                           onChange={(event) => handleTextFieldChange(event, 'businessName')}/>
                                <TextField id="outlined-basic" label="Phone Number" variant="outlined"
                                           sx={{margin: '10px'}}
                                           value={manageUserObj.phoneNumber}
                                           onChange={(event) => handleTextFieldChange(event, 'phoneNumber')}/>
                                <TextField id="outlined-basic" label="E-mail" variant="outlined" sx={{margin: '10px'}}
                                           value={manageUserObj.email}
                                           onChange={(event) => handleTextFieldChange(event, 'email')}/>

                                <TextField id="outlined-basic" label="PAN Number" variant="outlined"
                                           sx={{margin: '10px'}} value={manageUserObj.panNumber}
                                           onChange={(event) => handleTextFieldChange(event, 'panNumber')}/>
                                <Box sx={{display: 'flex'}}>
                                    <FormControl>
                                        <FormLabel id="demo-controlled-radio-buttons-group">Are you GST
                                            Registered?</FormLabel>
                                        <RadioGroup aria-labelledby="demo-controlled-radio-buttons-group"
                                                    name="controlled-radio-buttons-group" value={manageUserObj.gstUser}
                                                    onChange={(event) => handleTextFieldChange(event, 'gstUser')}>
                                            <FormControlLabel value="Yes" control={<Radio/>} label="Yes"/>
                                            <FormControlLabel value="No" control={<Radio/>} label="No"/>
                                        </RadioGroup>
                                    </FormControl>
                                </Box>
                                <TextField id="outlined-basic" label="GST Number" variant="outlined"
                                           sx={{margin: '10px'}}
                                           value={manageUserObj.gstNumber}
                                           onChange={(event) => handleTextFieldChange(event, 'gstNumber')}/>

                            </Box>

                            <Box sx={{
                                width: '25%',
                                display: 'flex',
                                flexDirection: 'column',
                                margin: "10px",
                                marginLeft: '20px'
                            }}>
                                <TextField id="outlined-basic" label="Billing Address" variant="outlined"
                                           sx={{margin: '10px'}}
                                           value={manageUserObj.billingAddress}
                                           onChange={(event) => handleTextFieldChange(event, 'billingAddress')}/>
                                <TextField id="outlined-basic" label="City" variant="outlined" sx={{margin: '10px'}}
                                           value={manageUserObj.city}
                                           onChange={(event) => handleTextFieldChange(event, 'city')}/>
                                <TextField id="outlined-basic" label="District" variant="outlined" sx={{margin: '10px'}}
                                           value={manageUserObj.district}
                                           onChange={(event) => handleTextFieldChange(event, 'district')}/>
                                <TextField
                                    fullWidth
                                    select
                                    value={manageUserObj.state}
                                    onChange={(event) => handleTextFieldChange(event, 'state')}
                                    label="State"
                                    variant="outlined"
                                    margin="normal"
                                >
                                    {
                                        UserRole.india.map(indi => (
                                            <MenuItem key={indi.name}
                                                      value={indi.name}>{indi.name}</MenuItem>))
                                    }
                                </TextField>
                                <TextField id="outlined-basic" label="Pin Code" variant="outlined"
                                           sx={{margin: '10px'}} value={manageUserObj.pinCode}
                                           onChange={(event) => handleTextFieldChange(event, 'pinCode')}/>


                            </Box>

                            <Box sx={{width: '25%', display: 'flex', flexDirection: 'column', margin: "10px"}}>

                                {/*  handle check box */}
                                <TextField
                                    fullWidth
                                    select
                                    value={manageUserObj.businessType}
                                    onChange={(event) => handleTextFieldChange(event, 'businessType')}
                                    label="Business Type"
                                    variant="outlined"
                                    margin="normal"
                                >
                                    {
                                        UserRole.businessType.map(bt => (
                                            <MenuItem key={bt.name}
                                                      value={bt.name}>{bt.name}</MenuItem>
                                        ))
                                    }
                                </TextField>

                                <TextField
                                    fullWidth
                                    select
                                    value={manageUserObj.industryType}
                                    onChange={(event) => handleTextFieldChange(event, 'industryType')}
                                    label="Industry Type"
                                    variant="outlined"
                                    margin="normal"
                                >
                                    {
                                        UserRole.industryType.map(userrole => (
                                            <MenuItem key={userrole.name}
                                                      value={userrole.name}>{userrole.name}</MenuItem>
                                        ))
                                    }
                                </TextField>
                                <TextField
                                    fullWidth
                                    select
                                    value={manageUserObj.businessRegistrationType}
                                    onChange={(event) => handleTextFieldChange(event, 'businessRegistrationType')}
                                    label="Business Registration Type"
                                    variant="outlined"
                                    margin="normal"
                                >
                                    {
                                        UserRole.businessRegistrationType.map(brt => (
                                            <MenuItem key={brt.name}
                                                      value={brt.name}>{brt.name}</MenuItem>
                                        ))
                                    }
                                </TextField>
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