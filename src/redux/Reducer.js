import {
    ADD_BUSINESS_USER,
    ADD_EXISTING_BUSINESS_USER,
    ADD_EXISTING_INVENTORY,
    ADD_EXISTING_MANAGE_USER,
    ADD_EXISTING_PARTY,
    ADD_EXISTING_SALEPURCHASE,
    ADD_EXPENSE,
    ADD_GODOWN,
    ADD_INVENTORY,
    ADD_INV_KEY_COMPANY,
    ADD_KEY_BUSINESS,
    ADD_KEY_CATEGORY,
    ADD_KEY_COMPANY,
    ADD_KEY_RACK,
    ADD_KEY_WAREHOUSE,
    ADD_LOGIN_USER,
    ADD_MANAGE_USER,
    ADD_PARTY,
    ADD_SALEPURCHASE,
    DELETE_KEY_CATEGORY,
    GET_BUSINESS_USER,
    GET_INVENTORY,
    GET_MANAGE_USER,
    GET_PARTY,
    GET_SALEPURCHASE,
    REMOVE_BUSINESS_USER,
    REMOVE_EXPENSE,
    REMOVE_GODOWN,
    REMOVE_INVENTORY,
    REMOVE_MANAGE_USER,
    REMOVE_PARTY,
    REMOVE_SALEPURCHASE,
    UPDATE_BUSINESS_USER,
    UPDATE_GODOWN,
    UPDATE_INVENTORY,
    UPDATE_MANAGE_USER,
    UPDATE_PARTY,
    UPDATE_SALEPURCHASE,
    ADD_PRIMARY_BUSINESS_USER
} from './Action';
import {
    InventoryDataModel,
    businessAccountDataModel,
    expenseDataModel,
    godownDataModel,
    manageUserDataModel,
    partnerDataModel,
    salePurchaseModel,
    userDetailModel
} from "../datamodel/ManageUserDataModel";


export const inventoryReducer = (state = {inventoryUser: [InventoryDataModel]}, action) => {
    switch (action.type) {
        case ADD_EXISTING_INVENTORY:
            return {
                ...state,
                inventoryUser: [action.payload, ...state.inventoryUser]
            };
        case ADD_INVENTORY:
            return {
                ...state,
                inventoryUser: action.payload
            };
        case REMOVE_INVENTORY:
            return {
                ...state,
                inventoryUser: state.inventoryUser.filter(manageUser => manageUser.id !== action.payload)
            };
        case UPDATE_INVENTORY:
            return {
                ...state,
                inventoryUser: state.inventoryUser.map(manageUser =>
                    manageUser.id === action.payload.id ? action.payload : manageUser
                )
            };
        case GET_INVENTORY:
            return {
                ...state,
                party: state.inventoryUser
            }
        default:
            return state;
    }
};

export const expenseReducer = (state = {expenseUser: [expenseDataModel]}, action) => {
    switch (action.type) {
        case ADD_EXPENSE:
            return action.payload;
        case REMOVE_EXPENSE:
            return {
                ...state,
                expenseUser: state.expenseUser.filter(manageUser => manageUser.id !== action.payload)
            };
        default:
            return state;
    }
}

export const LoginReducer = (state = {loginData: userDetailModel}, action) => {
    switch (action.type) {
        case ADD_LOGIN_USER:
            return action.payload;
        default:
            return state;
    }
}
export const godownReducer = (state = {godownUser: [godownDataModel]}, action) => {
    switch (action.type) {
        case ADD_GODOWN:
            return {
                ...state,
                godownUser: action.payload
            };
        case REMOVE_GODOWN:
            return {
                ...state,
                godownUser: state.godownUser.filter(manageUser => manageUser.id !== action.payload)
            };
        case UPDATE_GODOWN:
            return {
                ...state,
                godownUser: state.godownUser.map(manageUser =>
                    manageUser.id === action.payload.id ? action.payload : manageUser
                )
            };
        default:
            return state;
    }
};
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
export const businessPrimaryUserReducer= (state = {businessPrimaryUser: [businessAccountDataModel]}, action) => {
    switch (action.type) {
        case ADD_PRIMARY_BUSINESS_USER:
            return {
                ...state,
                businessUser: action.payload
            };
        default:
            return state;
    }
    }
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

export const keyCompanyReducer = (state = {keyCompanyData: []}, action) => {
    switch (action.type) {
        case ADD_KEY_COMPANY:
            return action.payload;
        default:
            return state;
    }
}

export const keyInvCompanyReducer = (state = {keyInvCompanyData: []}, action) => {
    switch (action.type) {
        case ADD_INV_KEY_COMPANY:
            return action.payload;
        default:
            return state;
    }
}
export const keyBusinessReducer = (state = {KeyBusinessData: []}, action) => {
    switch (action.type) {
        case ADD_KEY_BUSINESS:
            return action.payload;
        default:
            return state;
    }
}
export const keyRackReducer = (state = {KeyRackData: []}, action) => {
    switch (action.type) {
        case ADD_KEY_RACK:
            return action.payload;
        default:
            return state;
    }
}
export const keyWarehouseReducer = (state = {KeyWarehouseData: []}, action) => {
    switch (action.type) {
        case ADD_KEY_WAREHOUSE:
            return action.payload;
        default:
            return state;
    }
}
export const keyCategoryReducer = (state = {KeyCategoryData: []}, action) => {
    switch (action.type) {
        case ADD_KEY_CATEGORY:
            return action.payload;
        case DELETE_KEY_CATEGORY:
            return {
                ...state,
                KeyCategoryData: state.filter(manageUser => manageUser !== action.payload)
            };
        default:
            return state;
    }
}


export const salePurchaseReducer = (state = {salePurchaseUser: [salePurchaseModel]}, action) => {
    switch (action.type) {
        case ADD_EXISTING_SALEPURCHASE:
            return {
                ...state,
                salePurchaseUser: [action.payload, ...state.salePurchaseUser]
            };
        case ADD_SALEPURCHASE:
            return {
                ...state,
                salePurchaseUser: action.payload
            };
        case REMOVE_SALEPURCHASE:
            return {
                ...state,
                salePurchaseUser: state.salePurchaseUser.filter(manageUser => manageUser.id !== action.payload)
            };
        case UPDATE_SALEPURCHASE:
            return {
                ...state,
                salePurchaseUser: state.salePurchaseUser.map(manageUser =>
                    manageUser.id === action.payload.id ? action.payload : manageUser
                )
            };
        case GET_SALEPURCHASE:
            return {
                ...state,
                party: state.salePurchaseUser
            }
        default:
            return state;
    }
};

export default {
    manageUserReducer, LoginReducer, businessUserReducer, partyReducer, keyCompanyReducer,
    keyBusinessReducer, keyRackReducer, keyWarehouseReducer, keyCategoryReducer,inventoryReducer,
    salePurchaseReducer,businessPrimaryUserReducer
};
