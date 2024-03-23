import {useEffect, useState} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {Box, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import UserRole from "../../jsonfile/Role.json";
import MenuItem from "@mui/material/MenuItem";
import {Input} from "@mui/joy";
import {saveLoggedInUser} from "../../apiservice/UserApiService";

export const MyUserDetails = () => {
    const [enable, setEnable] = useState(true);
    const [myUser, setMyUser] = useState({
        id: '',
        firstName: '',
        lastName: '',
        dob: '',
        gender: '',
        role: '',
        email: '',
        password: '',
        mobileNumber: '',
        tempPassword: '',
        primary_user_id: '',
        secondary_user_id: '',
    });
    const loginData = useSelector(state => state.loginReducerValue);
    const dispatch = useDispatch();

    const handleBooleanChange = () => {
        setEnable(prevState => !prevState);
    };

    const handleTextFieldChange = (event, field) => {
        setMyUser({
            ...myUser,
            [field]: event.target.value,
        });
    };
    useEffect(() => {
        setMyUser(loginData);
/*        const fetchData = async () => {
            try {
                console.log("LoginData  ", loginData);

                /!*                const response = await axios.get('http://localhost:8700/hesabbook/user/get/258');
                                console.log("user response ", response.data);
                                if (response.data.code === 200) {
                                    setMyUser(login);
                                }*!/
                // localStorage.setItem('login-user', JSON.stringify(myUser));
                //dispatch(addManageUser(response.data));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();*/
    }, [setMyUser]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        myUser['isLogin'] = loginData.isLogin;
        myUser['token'] = loginData.token;
        myUser['primary_user_id'] = loginData.primary_user_id;
        myUser['secondary_user_id'] = loginData.secondary_user_id;
        await saveLoggedInUser(myUser, dispatch);
    };

    return (
        <>
            <Box>
                {myUser != null && (
                    <Box>
                        <Box sx={{display: 'flex'}}>
                            <Box>
                                <Button size="small" variant="contained">Edit/View User Details</Button>
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
                                    margin: "10px",
                                    marginLeft: '200px'
                                }}>
                                    <TextField id="outlined-basic" label="Id" variant="outlined" disabled={true}
                                               sx={{margin: '10px'}} value={myUser.id}
                                               onChange={(event) => handleTextFieldChange(event, 'id')}/>
                                    <TextField id="outlined-basic" label="First Name" variant="outlined"
                                               sx={{margin: '10px'}}
                                               value={myUser.firstName}
                                               onChange={(event) => handleTextFieldChange(event, 'firstName')}/>
                                    <TextField id="outlined-basic" label="Last Name" variant="outlined"
                                               sx={{margin: '10px'}}
                                               value={myUser.lastName}
                                               onChange={(event) => handleTextFieldChange(event, 'lastName')}/>
                                    <Input
                                        type="date"
                                        value={myUser.dob}
                                        onChange={(event) => handleTextFieldChange(event, 'dob')}
                                    />
                                    {/*                     this date picker is not working as of now
                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <DatePicker
                                        label="Select Date"
                                        format="MM/dd/yyyy"
                                        value={myUser.dob}
                                        onChange={(event) => handleTextFieldChange(event, 'dob')}

                                    />
                                    </MuiPickersUtilsProvider>*/}
                                    <TextField
                                        fullWidth
                                        select
                                        value={myUser.role}
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
                                    <TextField id="outlined-basic" label="Email Address" variant="outlined"
                                               sx={{margin: '10px'}} value={myUser.email}
                                               onChange={(event) => handleTextFieldChange(event, 'email')}/>
                                </Box>
                                <Box sx={{width: '50%', display: 'flex', flexDirection: 'column', margin: "10px"}}>

                                    <TextField id="outlined-basic" label="Password" variant="outlined"
                                               sx={{margin: '10px'}} value={myUser.password}
                                               onChange={(event) => handleTextFieldChange(event, 'password')}/>
                                    <TextField id="outlined-basic" label="Phone Number" variant="outlined"
                                               sx={{margin: '10px'}} value={myUser.mobileNumber}
                                               onChange={(event) => handleTextFieldChange(event, 'mobileNumber')}/>
                                    <TextField id="outlined-basic" label="Temp Password" variant="outlined"
                                               sx={{margin: '10px'}} value={myUser.tempPassword}
                                               onChange={(event) => handleTextFieldChange(event, 'tempPassword')}/>

                                    <TextField id="outlined-basic" label="Primary User Id" variant="outlined"
                                               disabled={true}
                                               sx={{margin: '10px'}} value={myUser.primary_user_id}
                                               onChange={(event) => handleTextFieldChange(event, 'primary_user_id')}/>

                                    <TextField id="outlined-basic" label="Secondary User Id" variant="outlined"
                                               disabled={true}
                                               sx={{margin: '10px'}} value={myUser.secondary_user_id}
                                               onChange={(event) => handleTextFieldChange(event, 'secondary_user_id')}/>

                                    <TextField
                                        fullWidth
                                        select
                                        value={myUser.gender}
                                        onChange={(event) => handleTextFieldChange(event, 'gender')}
                                        label="Gender"
                                        variant="outlined"
                                        margin="normal"
                                    >
                                        {
                                            UserRole.genders.map(gender => (
                                                <MenuItem key={gender.name}
                                                          value={gender.name}>{gender.name}</MenuItem>
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
            </Box>
        </>
    )
}