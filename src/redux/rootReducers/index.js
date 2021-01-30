import { combineReducers } from "redux";
import authReducer from "../modules/auth/authReducer";
import folderReduced from "../modules/folder/folderReducer";

/**
 * Root Reducer which will hold list of app reducers
 * @see https://redux.js.org/api/combinereducers
 * @type {Reducer<unknown>}
 */
const rootReducer = combineReducers({
	auth: authReducer,
	folder: folderReduced
});

export default rootReducer;