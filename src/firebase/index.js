import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// Master Project
const firebaseConfigMaster = {
	apiKey: process.env.REACT_APP_API_KEY_MASTER,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN_MASTER,
	projectId: process.env.REACT_APP_PROJECT_ID_MASTER,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET_MASTER,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID_MASTER,
	appId: process.env.REACT_APP_APP_ID_MASTER
};

const masterApp = firebase.initializeApp(firebaseConfigMaster, "masterApp");

const masterFirestore = masterApp.firestore();
export const masterStorage = masterApp.storage();
export const masterAuth = masterApp.auth();
export const masterDatabase = {
	folders: masterFirestore.collection("folders"),
	files: masterFirestore.collection("files"),
	formatDoc: doc => { return { id: doc.id, ...doc.data() }; },
	getCurrentTimeStamp: firebase.firestore.FieldValue.serverTimestamp
};

// Drive 1
const firbaseConfig1 = {
	apiKey: process.env.REACT_APP_API_KEY_D1,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN_D1,
	projectId: process.env.REACT_APP_PROJECT_ID_D1,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET_D1,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID_D1,
	appId: process.env.REACT_APP_APP_ID_D1
};

const drive1 = firebase.initializeApp(firbaseConfig1, "drive1");

const d1Firestore = drive1.firestore();
export const d1Storage = drive1.storage();
export const d1Auth = drive1.auth();
export const d1atabase = {
	folders: d1Firestore.collection("folders"),
	files: d1Firestore.collection("files"),
	formatDoc: doc => { return { id: doc.id, ...doc.data() }; },
	getCurrentTimeStamp: firebase.firestore.FieldValue.serverTimestamp
};