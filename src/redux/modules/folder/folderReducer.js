import { SELECT_FOLDER, UPDATE_FOLDER, SET_CHILD_FOLDERS, SET_CHILD_FILES } from "./folderTypes";

const initialState = {
	folderID: null,
	folder: null,
	childFolders: [],
	childFiles: []
};

const ROOT_FOLDER = { name: "Root", id: "root_folder", path: [] };

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
				folder: (!action.payload) ? ROOT_FOLDER : action.payload
			};
		
		case SET_CHILD_FOLDERS:
			return {
				...state,
				childFolders: action.payload
			};
		
		case SET_CHILD_FILES:
			return {
				...state,
				childFiles: action.payload
			};
		
		default:
			return { ...state };
	}
};