import { SET_PROJECT } from "./projectTypes";

export const setProject = (index) => dispatch => {
	dispatch({
		type: SET_PROJECT,
		payload: index
	});
};