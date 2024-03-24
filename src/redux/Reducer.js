import {
    ADD_BUSINESS_USER,
    ADD_EXISTING_BUSINESS_USER,
    ADD_EXISTING_MANAGE_USER,
    ADD_LOGIN_USER,
    ADD_MANAGE_USER,
    GET_BUSINESS_USER,
    GET_MANAGE_USER,
    REMOVE_BUSINESS_USER,
    REMOVE_MANAGE_USER,
    UPDATE_BUSINESS_USER,
    UPDATE_MANAGE_USER
} from './Action';
import {businessAccountDataModel, manageUserDataModel, userDetailModel} from "../datamodel/ManageUserDataModel";


export const LoginReducer = (state = {loginData: userDetailModel}, action) => {
    switch (action.type) {
        case ADD_LOGIN_USER:
            return action.payload;
        default:
            return state;
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

export const businessUserReducer = (state = {businessUser: [businessAccountDataModel]}, action) => {
    switch (action.type) {
        case ADD_EXISTING_BUSINESS_USER:
            return {
                ...state,
                businessUser: [action.payload, ...state.businessUser]
            };

        case ADD_BUSINESS_USER:
            return {
                ...state,
                businessUser: action.payload
            };
        case REMOVE_BUSINESS_USER:
            return {
                ...state,
                businessUser: state.manageUsers.filter(manageUser => manageUser.id !== action.payload)
            };
        case UPDATE_BUSINESS_USER:
            return {
                ...state,
                businessUser: state.manageUsers.map(manageUser =>
                    manageUser.id === action.payload.id ? action.payload : manageUser
                )
            };
        case GET_BUSINESS_USER:
            return {
                ...state,
                businessUser: state.businessUser
            }
        default:
            return state;
    }
};

export default {manageUserReducer, LoginReducer, businessUserReducer};
