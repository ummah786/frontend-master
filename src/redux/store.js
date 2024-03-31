import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {
    businessUserReducer,
    godownReducer,
    keyBusinessReducer,
    keyCategoryReducer,
    keyCompanyReducer,
    keyRackReducer,
    keyWarehouseReducer,
    LoginReducer,
    manageUserReducer,
    partyReducer
} from './Reducer';

import {thunk} from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducer = combineReducers({
    manageUserReducerValue: manageUserReducer,
    loginReducerValue: LoginReducer,
    manageBusinessReducerValue: businessUserReducer,
    partyReducerValue: partyReducer,
    godownReducerValue: godownReducer,
    keyCompanyReducerValue: keyCompanyReducer,
    keyBusinessReducerValue: keyBusinessReducer,
    keyRackReducerValue: keyRackReducer,
    keyWarehouseReducerValue: keyWarehouseReducer,
    keyCategoryReducerValue: keyCategoryReducer
});
const store = createStore(reducer,
    composeEnhancers(
        applyMiddleware(thunk)
    ));

export default store;
