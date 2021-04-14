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
	apiKey: "AIzaSyBoCa3Y2Ni5fk_XWvXMIvVzyCk_cdHlkpE",
	authDomain: "loginandauth-ee757.firebaseapp.com",
	projectId: "loginandauth-ee757",
	storageBucket: "loginandauth-ee757.appspot.com",
	messagingSenderId: "838369797083",
	appId: "1:838369797083:web:a6cb1e40da6bb2614c3dfe",
	measurementId: "G-2YW1DQKZ3C"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.auth();
firebase.firestore();
//render your react application
ReactDOM.render(<Layout />, document.querySelector("#app"));
