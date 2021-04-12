import firebase from "firebase/app";

export const signIn = async (email, password) => {
	return firebase
		.auth()
		.signInWithEmailAndPassword(email, password)
		.then(res => console.log("res", res.user.uid));
};
