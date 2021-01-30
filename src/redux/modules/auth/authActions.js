import { SET_CURRENT_USER } from "./authTypes";

export const setCurrentUser = (u) => dispatch => {
	dispatch({ type: SET_CURRENT_USER, payload: u });
};