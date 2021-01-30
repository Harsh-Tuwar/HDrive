import { GET_ERROR, SET_ERROR } from "./errorTypes";

export const setError = (err) => dispatch => {
	dispatch({
		type: SET_ERROR,
		payload: err
	});
};

export const getError = () => dispatch => {
	return dispatch({ type: GET_ERROR });
};