import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID
};

console.log(process.env.REACT_APP_API_KEY);
firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

export const storage = firebase.storage();
export const auth = firebase.auth();
export const database = {
	folders: firestore.collection("folders"),
	files: firestore.collection("files"),
	formatDoc: doc => { return { id: doc.id, ...doc.data() }; },
	getCurrentTimeStamp: firebase.firestore.FieldValue.serverTimestamp
};