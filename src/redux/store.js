import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {LoginReducer, manageUserReducer} from './Reducer';

import {thunk} from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducer = combineReducers({
    manageUserReducerValue: manageUserReducer,
    loginReducerValue: LoginReducer
});
const store = createStore(reducer,
    composeEnhancers(
        applyMiddleware(thunk)
    ));

export default store;
