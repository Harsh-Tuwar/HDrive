import { GET_ERROR, SET_ERROR } from "./errorTypes";

const initialState = { errorPayload: {} };

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_ERROR:
			return { ...state };
		
		case SET_ERROR:
			return {
				...state,
				errorPayload: action.payload
			};
	}
};