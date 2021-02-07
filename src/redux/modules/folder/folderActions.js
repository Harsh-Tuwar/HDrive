import { SELECT_FOLDER, UPDATE_FOLDER, SET_CHILD_FOLDERS, SET_CHILD_FILES } from "./folderTypes";
import { getCurrentInstances } from "../../../utils";

export const setFolder = (folderID = null, folder = null) => dispatch => {
	dispatch({
		type: SELECT_FOLDER,
		payload: { folderID, folder }
	});
};

export const updateFolder = (folderID = null) => (dispatch, getState) => {
	const project = getState().project.currentProject;

	const { database } = getCurrentInstances(project);

	if (!database.folders) return;
	
	if (folderID && folderID != "root_folder") {
		database.folders
			.doc(folderID)
			.get()
			.then(doc => {
				dispatch({
					type: UPDATE_FOLDER,
					payload: database.formatDoc(doc)
				});
			}).catch((err) => {
				dispatch({
					type: UPDATE_FOLDER,
					payload: null
				});
			});
	} else {
		dispatch({
			type: UPDATE_FOLDER,
			payload: null
		});
	}
};

export const setChildFolders = (folderID = null, userID) => (dispatch, getState) => {
	const project = getState().project.currentProject;

	const { database } = getCurrentInstances(project);

	if (!database.folders) return;

	return database.folders
		.where("parentID", "==", folderID)
		.where("userID", "==", userID)
		.orderBy("createdAt")
		.onSnapshot(snapshot => {
			dispatch({
				type: SET_CHILD_FOLDERS,
				payload: snapshot.docs.map(database.formatDoc)
			});
		});
};

export const setChildFiles = (folderID = null, userID) => (dispatch, getState) => {
	const project = getState().project.currentProject;

	const { database } = getCurrentInstances(project);
	
	if (!database.files) return;

	return database.files
		.where("folderID", "==", folderID)
		.where("userID", "==", userID)
		.orderBy("createdAt")
		.onSnapshot((snapshot) => {
			dispatch({
				type: SET_CHILD_FILES,
				payload: snapshot.docs.map(database.formatDoc)
			});
		});
};