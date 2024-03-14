import {
    ADD_EXISTING_MANAGE_USER,
    ADD_MANAGE_USER,
    GET_MANAGE_USER,
    REMOVE_MANAGE_USER,
    UPDATE_MANAGE_USER
} from './Action';

const initialStateManageUser = {
    manageUsers: []
}

export const manageUserReducer = (state = initialStateManageUser, action) => {
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

export default {manageUserReducer};
