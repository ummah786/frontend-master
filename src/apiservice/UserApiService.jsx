import axios from "axios";
import {addBusinessUser, addLogin} from "../redux/Action";
import {manageUserDataModel} from "../datamodel/ManageUserDataModel";

export async function saveLoggedInUser(myUser, dispatch) {
    const response = await axios.post('http://localhost:8700/hesabbook/user/save', myUser);
    if (response.data.code === 200) {
        localStorage.setItem("login-user-info", JSON.stringify(response.data.response));
        dispatch(addLogin(response.data.response));
    }
}

//---------------- Bussiness Account API----------------------
export function fetchBusinessDetailsBasedOnPrimaryUserIds(setFilteredEmployees, dispatch,id) {
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8700/hesabbook/business/account/all/${id}`);
            setFilteredEmployees(response.data.response);
            dispatch(addBusinessUser(response.data.response));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    fetchData();
}


export async function saveBusinessAccount(manageUserObj, loginData, addObjectOnTop, setFilteredEmployees, setEnable) {
    manageUserObj['primary_user_id'] = loginData.primary_user_id;
    manageUserObj['secondary_user_id'] = loginData.secondary_user_id;
    const response = await axios.post('http://localhost:8700/hesabbook/business/account/save', manageUserObj);
    addObjectOnTop(response.data.response)
    setFilteredEmployees(manageUserDataModel);
    setEnable(prevState => !prevState);
}