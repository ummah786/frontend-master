import {
    ADD_EXISTING_MANAGE_USER,
    ADD_MANAGE_USER,
    GET_MANAGE_USER,
    REMOVE_MANAGE_USER,
    UPDATE_MANAGE_USER
} from './Action';
import {manageUserDataModel} from "../datamodel/ManageUserDataModel";

const data = [
    {name: 'Item 1', count: 10},
    {name: 'Item 2', count: 20},
    {name: 'as', count: ''}
    // Add more items as needed
];
export const counterValue = (state = {countt: data}, action) => {
    switch (action.type) {
        case "INCREMENT":
            return state + 1
        case "DECREMENT":
            return state - 1
        default:
            return state
    }
}


export const manageUserReducer = (state = {manageUsers: [manageUserDataModel]}, action) => {
    switch (action.type) {
        case ADD_EXISTING_MANAGE_USER:
            return {
                ...state,
                manageUsers: [action.payload, ...state.manageUsers]
            };

        case ADD_MANAGE_USER:
            return {
                ...state,
                manageUsers: action.payload
            };
        case REMOVE_MANAGE_USER:
            return {
                ...state,
                manageUsers: state.manageUsers.filter(manageUser => manageUser.id !== action.payload)
            };
        case UPDATE_MANAGE_USER:
            return {
                ...state,
                manageUsers: state.manageUsers.map(manageUser =>
                    manageUser.id === action.payload.id ? action.payload : manageUser
                )
            };
        case GET_MANAGE_USER:
            return {
                ...state,
                manageUsers: state.manageUsers
            }
        default:
            return state;
    }
};

export default {manageUserReducer, counterValue};
