import {
    ADD_BUSINESS_USER,
    ADD_EXISTING_BUSINESS_USER,
    ADD_EXISTING_MANAGE_USER,
    ADD_EXISTING_PARTY,
    ADD_LOGIN_USER,
    ADD_MANAGE_USER,
    ADD_PARTY,
    GET_BUSINESS_USER,
    GET_MANAGE_USER,
    GET_PARTY,
    REMOVE_BUSINESS_USER,
    REMOVE_MANAGE_USER,
    REMOVE_PARTY,
    UPDATE_BUSINESS_USER,
    UPDATE_MANAGE_USER,
    UPDATE_PARTY
} from './Action';
import {
    businessAccountDataModel,
    manageUserDataModel,
    partnerDataModel,
    userDetailModel
} from "../datamodel/ManageUserDataModel";


export const LoginReducer = (state = {loginData: userDetailModel}, action) => {
    switch (action.type) {
        case ADD_LOGIN_USER:
            return action.payload;
        default:
            return state;
    }
}


export const partyReducer = (state = {partyUser: [partnerDataModel]}, action) => {
    switch (action.type) {
        case ADD_EXISTING_PARTY:
            return {
                ...state,
                partyUser: [action.payload, ...state.partyUser]
            };
        case ADD_PARTY:
            return {
                ...state,
                partyUser: action.payload
            };
        case REMOVE_PARTY:
            return {
                ...state,
                partyUser: state.partyUser.filter(manageUser => manageUser.id !== action.payload)
            };
        case UPDATE_PARTY:
            return {
                ...state,
                partyUser: state.partyUser.map(manageUser =>
                    manageUser.id === action.payload.id ? action.payload : manageUser
                )
            };
        case GET_PARTY:
            return {
                ...state,
                party: state.partyUser
            }
        default:
            return state;
    }
};


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

export default {manageUserReducer, LoginReducer, businessUserReducer, partyReducer};
