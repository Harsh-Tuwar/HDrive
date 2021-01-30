import { SELECT_FOLDER, UPDATE_FOLDER, SET_CHILD_FOLDERS } from "./folderTypes";

const initialState = {
	folderID: null,
	folder: null,
	childFolders: [],
	childFiles: []
};

const ROOT_FOLDER = { name: "Root", id: "9Iz4bdk7mHXCRb3Ou8Ot", path: [] };

export default (state = initialState, action) => {
	switch (action.type) {
		case SELECT_FOLDER:
			return {
				...state,
				childFiles: [],
				childFolders: [],
				folderID: action.payload.folderID,
				folder: action.payload.folder
			};
		
		case UPDATE_FOLDER:
			return {
				...state,
				folder: (state.folder === null) ? ROOT_FOLDER : action.payload
			};
		
		case SET_CHILD_FOLDERS:
			return {
				...state,
				childFolders: action.payload
			};
		
		default:
			return { ...state };
	}
};