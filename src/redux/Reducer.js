import { ADD_EMPLOYEE, REMOVE_EMPLOYEE, UPDATE_EMPLOYEE } from './Action';

const initialState = {
    employees: []
};

const employeeReducer = (state = initialState, action) => {
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

export default employeeReducer;
