export const ADD_MANAGE_USER = 'ADD_MANAGE_USER';
export const ADD_EXISTING_MANAGE_USER = 'ADD_EXISTING_MANAGE_USER';
export const REMOVE_MANAGE_USER = 'REMOVE_MANAGE_USER';
export const UPDATE_MANAGE_USER = 'UPDATE_MANAGE_USER';
export const GET_MANAGE_USER='GET_MANAGE_USER';

export const addManageUser = (manageUser) => ({
    type: ADD_MANAGE_USER,
    payload: manageUser
});
export const addExistingMangeUser = (manageUser) => ({
    type: ADD_EXISTING_MANAGE_USER,
    payload: manageUser
})

export const removeManageUser = (id) => ({
    type: REMOVE_MANAGE_USER,
    payload: id
});

export const updateManageUser = (manageUser) => ({
    type: UPDATE_MANAGE_USER,
    payload: manageUser
});

export const getManageUser=()=>({
    type:GET_MANAGE_USER
})