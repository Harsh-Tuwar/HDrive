import { SET_PROJECT } from "./projectTypes";

const intialState = {
	currentProject: null
};

export default (state = intialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case SET_PROJECT:
			return {
				...state,
				currentProject: payload
			};
			
		default:
			return { ...state };
	}
};