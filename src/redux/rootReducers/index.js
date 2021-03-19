import { combineReducers } from "redux";
import authReducer from "../modules/auth/authReducer";
import folderReducer from "../modules/folder/folderReducer";
import projectReducer from "../modules/project/projectReducer";

/**
 * Root Reducer which will hold list of app reducers
 * @see https://redux.js.org/api/combinereducers
 * @type {Reducer<unknown>}
 */
const rootReducer = combineReducers({
	auth: authReducer,
	folder: folderReducer,
	project: projectReducer
});

export default rootReducer;