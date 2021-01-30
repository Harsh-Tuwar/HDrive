import { SET_CURRENT_USER } from "./authTypes";

const initialState = {
	loggedIn: false,
	user: {}
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_CURRENT_USER:
			return {
				...state,
				loggedIn: Boolean(action.payload),
				user: action.payload
			};
		
		default:
			return { ...state };
	}
};

