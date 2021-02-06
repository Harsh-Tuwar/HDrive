import lf from "localforage";
import { masterAuth as auth } from "../firebase";
import { SET_CURRENT_USER } from "../redux/modules/auth/authTypes";
import { UPDATE_FOLDER } from "../redux/modules/folder/folderTypes";

export const drawerWidth = 240;

export const checkAuthToken = async (store) => {
	auth.onAuthStateChanged(async (u) => {
		if (u) {
			store.dispatch({
				type: SET_CURRENT_USER,
				payload: u
			});
			
			store.dispatch({
				type: UPDATE_FOLDER,
				payload: null
			});
		} else {
			await auth.signOut();
		}
	});
};

export const setStorage = async (key, val) => {
	return await lf.setItem(key, val);
};

export const getStorage = async (key) => {
	return await lf.getItem(key);
};

export const removeStorage = async (key) => {
	return await lf.removeItem(key);
};