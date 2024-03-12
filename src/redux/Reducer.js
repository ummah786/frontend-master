import {
    ADD_EMPLOYEE,
    ADD_EXISTING_MANAGE_USER,
    ADD_MANAGE_USER,
    REMOVE_EMPLOYEE,
    REMOVE_MANAGE_USER,
    UPDATE_EMPLOYEE,
    UPDATE_MANAGE_USER
} from './Action';

const initialState = {
    employees: [],

};
const initialStateManageUser = {
    manageUsers: []
}

export const employeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_EMPLOYEE:
            return {
                ...state,
                employees: [...state.employees, action.payload]
            };
        case REMOVE_EMPLOYEE:
            return {
                ...state,
                employees: state.employees.filter(employee => employee.id !== action.payload)
            };
        case UPDATE_EMPLOYEE:
            return {
                ...state,
                employees: state.employees.map(employee =>
                    employee.id === action.payload.id ? action.payload : employee
                )
            };
        default:
            return state;
    }
};
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
                manageUsers:  action.payload
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
        default:
            return state;
    }
};

export default {employeeReducer, manageUserReducer};
