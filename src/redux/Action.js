
export const ADD_PARTY = 'ADD_PARTY';
export const ADD_EXISTING_PARTY = 'ADD_EXISTING_PARTY';
export const REMOVE_PARTY = 'REMOVE_PARTY';
export const UPDATE_PARTY = 'UPDATE_PARTY';
export const GET_PARTY='GET_PARTY';


export const ADD_LOGIN_USER = 'ADD_LOGIN_USER';
export const DELETE_LOGIN_USER = 'DELETE_LOGIN_USER';
export const GET_LOGIN_USER = 'GET_LOGIN_USER';


export const ADD_GODOWN = 'ADD_GODOWN';
export const DELETE_GODOWN = 'DELETE_GODOWN';
export const REMOVE_GODOWN = 'REMOVE_GODOWN';
export const UPDATE_GODOWN = 'UPDATE_GODOWN';
export const GET_GODOWN = 'GET_GODOWN';


export const ADD_BUSINESS_USER = 'ADD_BUSINESS_USER';
export const ADD_EXISTING_BUSINESS_USER = 'ADD_EXISTING_BUSINESS_USER';
export const REMOVE_BUSINESS_USER = 'REMOVE_BUSINESS_USER';
export const UPDATE_BUSINESS_USER = 'UPDATE_BUSINESS_USER';
export const GET_BUSINESS_USER='GET_BUSINESS_USER';


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




export const updateGodown = (godown) => ({
    type: UPDATE_GODOWN,
    payload: godown
});
export const addGodown = (godown) => ({
    type: ADD_GODOWN,
    payload: godown
})

export const removeGodown = (id) => ({
    type: REMOVE_GODOWN,
    payload: id
});

export const addParty = (party) => ({
    type: ADD_PARTY,
    payload: party
});
export const addExistingParty = (party) => ({
    type: ADD_EXISTING_PARTY,
    payload: party
})

export const removeParty = (id) => ({
    type: REMOVE_PARTY,
    payload: id
});

export const updateParty= (party) => ({
    type: UPDATE_PARTY,
    payload: party
});


export const addBusinessUser = (businessUser) => ({
    type: ADD_BUSINESS_USER,
    payload: businessUser
});
export const addExistingBusinessUser = (businessUser) => ({
    type: ADD_EXISTING_BUSINESS_USER,
    payload: businessUser
})

export const removeBusinessUser = (id) => ({
    type: REMOVE_BUSINESS_USER,
    payload: id
});

export const updateBusinessUser= (businessUser) => ({
    type: UPDATE_BUSINESS_USER,
    payload: businessUser
});

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


export const addLogin = (login) => ({
    type: ADD_LOGIN_USER,
    payload: login
});



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