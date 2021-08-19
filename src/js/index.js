//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import "firebase/firestore";
//include bootstrap npm library into the bundle
import "bootstrap/dist/css/bootstrap.css";

//include your index.scss file into the bundle
import "../styles/index.scss";

//import your own components
import Layout from "./layout";

var firebaseConfig = {
	apiKey: "AIzaSyCJU14PyFLPryviHIc7TrGegTh9KHOg_t8",
	authDomain: "mdc-14-authentication.firebaseapp.com",
	projectId: "mdc-14-authentication",
	storageBucket: "mdc-14-authentication.appspot.com",
	messagingSenderId: "537038399314",
	appId: "1:537038399314:web:20dd8eef512ceaf34c7c8b",
	measurementId: "G-DKVGMCZFGS"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.firestore();
//render your react application
ReactDOM.render(<Layout />, document.querySelector("#app"));
