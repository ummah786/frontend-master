import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {manageUserReducer} from './Reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducer = combineReducers({
    manageUserReducer: manageUserReducer,
});
const store = createStore(reducer,
    composeEnhancers(
        applyMiddleware(/* Add any middleware you use here */)
    ));

export default store;
