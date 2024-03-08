import {applyMiddleware, compose, createStore} from 'redux';
import employeeReducer from './Reducer';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(employeeReducer,
    composeEnhancers(
        applyMiddleware(/* Add any middleware you use here */)
    ));

export default store;
