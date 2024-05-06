import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import {
  businessUserReducer,
  expenseReducer,
  godownReducer,
  inventoryReducer,
  keyBusinessReducer,
  keyCategoryReducer,
  keyCompanyReducer,
  keyRackReducer,
  keyWarehouseReducer,
  LoginReducer,
  manageUserReducer,
  partyReducer,
  salePurchaseReducer,
} from "./Reducer";

import { thunk } from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducer = combineReducers({
  expenseReducerValue: expenseReducer,
  manageUserReducerValue: manageUserReducer,
  loginReducerValue: LoginReducer,
  manageBusinessReducerValue: businessUserReducer,
  partyReducerValue: partyReducer,
  inventoryReducerValue: inventoryReducer,
  godownReducerValue: godownReducer,
  keyCompanyReducerValue: keyCompanyReducer,
  keyBusinessReducerValue: keyBusinessReducer,
  keyRackReducerValue: keyRackReducer,
  keyWarehouseReducerValue: keyWarehouseReducer,
  keyCategoryReducerValue: keyCategoryReducer,
  salePurchaseReducerValue: salePurchaseReducer,
});
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
