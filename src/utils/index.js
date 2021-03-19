import lf from "localforage";
import { masterAuth as auth } from "../firebase";
import { SET_CURRENT_USER } from "../redux/modules/auth/authTypes";
import {
	masterDatabase as d0,
	masterStorage as s0,
	d1Database as d1,
	d1Storage as s1,
	d2Database as d2,
	d2Storage as s2
} from "../firebase";

export const getCurrentInstances = (project) => {
	switch (project) {
		case 0:
			return { database: d0, storage: s0 };
		
		case 1:
			return { database: d1, storage: s1 };
		
		case 2:
			return { database: d2, storage: s2 };
		
		default: return { database: d0, storage: s0 };
	}
};

export const drawerWidth = 240;

export const checkAuthToken = async (store) => {
	auth.onAuthStateChanged(async (u) => {
		if (u) {
			store.dispatch({
				type: SET_CURRENT_USER,
				payload: u
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