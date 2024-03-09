export const ADD_EMPLOYEE = 'ADD_EMPLOYEE';
export const REMOVE_EMPLOYEE = 'REMOVE_EMPLOYEE';
export const UPDATE_EMPLOYEE = 'UPDATE_EMPLOYEE';


export const ADD_MANAGE_USER = 'ADD_MANAGE_USER';
export const ADD_EXISTING_MANAGE_USER = 'ADD_EXISTING_MANAGE_USER';
export const REMOVE_MANAGE_USER = 'REMOVE_MANAGE_USER';
export const UPDATE_MANAGE_USER = 'UPDATE_MANAGE_USER';

export const addEmployee = (employee) => ({
    type: ADD_EMPLOYEE,
    payload: employee
});

export const removeEmployee = (employeeId) => ({
    type: REMOVE_EMPLOYEE,
    payload: employeeId
});

export const updateEmployee = (employee) => ({
    type: UPDATE_EMPLOYEE,
    payload: employee
});


export const addManageUser = (manageUser) => ({
    type: ADD_MANAGE_USER,
    payload: manageUser
});
export const addExistingMangeUser= (manageUser)=>({
    type: ADD_EXISTING_MANAGE_USER,
    payload: manageUser
})

export const removeManageUser = (id) => ({
    type: REMOVE_MANAGE_USER,
    payload: id
});

export const updateManageUser = (manageUser) => ({
    type: UPDATE_EMPLOYEE,
    payload: manageUser
});