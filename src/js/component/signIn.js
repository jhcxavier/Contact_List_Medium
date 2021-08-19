import firebase from "firebase/app";

export const signin = async (email, password) => {
	return firebase
		.auth()
		.signInWithEmailAndPassword(email, password)
		.then(() =>
			firebase.auth().onAuthStateChanged(user => {
				if (user) {
					console.log("userID", user.uid);
				}
			})
		);
};
