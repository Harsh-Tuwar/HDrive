import { SELECT_FOLDER, UPDATE_FOLDER, SET_CHILD_FOLDERS } from "./folderTypes";
import { database } from "../../../firebase";

export const setFolder = (folderID = null, folder = null) => dispatch => {
	dispatch({
		type: SELECT_FOLDER,
		payload: { folderID, folder }
	});
};

export const updateFolder = (folderID = null) => dispatch => {
	if (folderID) {
		database.folders
			.doc(folderID)
			.get()
			.then(doc => {
				// const folderData = database.formatDoc(doc);

				dispatch({
					type: UPDATE_FOLDER,
					payload: database.formatDoc(doc)
				});
				console.log(doc.data());
			}).catch((err) => {
				console.log(err);
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

export const setChildFolders = (folderID, userID) => dispatch => {
	return database.folders
		.where("parentID", "==", folderID)
		.where("userID", "==", userID)
		// .orderBy("createdAt")
		.onSnapshot(snapshot => {
			// console.log(snapshot);
			dispatch({
				type: SET_CHILD_FOLDERS,
				payload: snapshot.docs.map(database.formatDoc)
			});
		});
};