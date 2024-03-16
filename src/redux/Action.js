export const ADD_MANAGE_USER = 'ADD_MANAGE_USER';
export const ADD_EXISTING_MANAGE_USER = 'ADD_EXISTING_MANAGE_USER';
export const REMOVE_MANAGE_USER = 'REMOVE_MANAGE_USER';
export const UPDATE_MANAGE_USER = 'UPDATE_MANAGE_USER';
export const GET_MANAGE_USER='GET_MANAGE_USER';


export const ADD_INVENTORY = 'ADD_INVENTORY';
export const ADD_EXISTING_INVENTORY = 'ADD_EXISTING_INVENTORY';
export const REMOVE_INVENTORY = 'REMOVE_INVENTORY';
export const UPDATE_INVENTORY = 'UPDATE_INVENTORY';
export const GET_INVENTORY='GET_INVENTORY';

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


export const addInventory = (manageUser) => ({
    type: ADD_INVENTORY,
    payload: manageUser
});
export const addExistingInventory = (manageUser) => ({
    type: ADD_EXISTING_INVENTORY,
    payload: manageUser
})

export const removeInventory = (id) => ({
    type: REMOVE_INVENTORY,
    payload: id
});

export const updateInventory = (manageUser) => ({
    type: UPDATE_INVENTORY,
    payload: manageUser
});

export const getInventory=()=>({
    type:GET_INVENTORY
})