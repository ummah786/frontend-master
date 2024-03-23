import axios from "axios";
import {addLogin} from "../redux/Action";

export async function saveLoggedInUser(myUser, dispatch) {
    const response = await axios.post('http://localhost:8700/hesabbook/user/save', myUser);
    if (response.data.code === 200) {
        localStorage.setItem("login-user-info", JSON.stringify(response.data.response));
        dispatch(addLogin(response.data.response));
    }
}

export function extracted(setMangUser) {
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8700/hesabbook/business/account/all/2');
            console.log(response.data.response);
            setMangUser(response.data.response);
            localStorage.setItem('business-details', response.data.response);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    fetchData();
}