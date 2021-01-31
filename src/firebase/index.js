import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";


const firebaseConfig = {
	apiKey: "AIzaSyDPIOklqvwy7OpxF_SFtJ2QJngIsA4bPiE",
	authDomain: "hdrive-main.firebaseapp.com",
	projectId: "hdrive-main",
	storageBucket: "hdrive-main.appspot.com",
	messagingSenderId: "682181766787",
	appId: "1:682181766787:web:39eb3c4013645ca60235b6"
};

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