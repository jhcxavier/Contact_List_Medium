import firebase from "firebase";
const url = "https://assets.breatheco.de/apis/fake/contact/";
const getState = ({ getStore, setStore, getActions }) => {
	return {
		store: {
			contacts: [],
			contactsFB: []
		},
		actions: {
			createUser: (email, password, fullName) => {
				const db = firebase.firestore();
				firebase
					.auth()
					.createUserWithEmailAndPassword(email, password)
					.then(cred => {
						setStore({ userId: cred.user.uid });
						return db
							.collection("users")
							.doc(cred.user.uid)
							.set({
								fullName: fullName
							});
					});
			},
			signin: async (email, password) => {
				return firebase
					.auth()
					.signInWithEmailAndPassword(email, password)
					.then(() =>
						firebase.auth().onAuthStateChanged(user => {
							if (user) {
								setStore({ userId: user.uid });
							}
						})
					);
			},
			getUserId: userId => {
				setStore(userId);
			},
			getContactFromFB: async () => {
				try {
					const getContact = firebase
						.firestore()
						.collection("newContacts")
						.doc();
					const response = await getContact.get();
					console.log("response", response);
					let arr = [];
					response &&
						response.forEach(contact => {
							arr.push({ ...contact.data(), contact: contact.userId });
						});
					setStore({ contactsFB: arr });
				} catch (e) {
					console.log(e);
				}
			},
			addContactFB: (name, phone, email, address, id) => {
				firebase
					.firestore()
					.collection("newContacts")
					.doc(getStore().userId)
					.set({
						full_name: name,
						phone: phone,
						email: email,
						address: address,
						userId: getStore().userId
					})
					.catch(error => {
						alert(error);
					})
					.then(() => getActions().getContactFromFB());
			},
			deleteContactFB: id => {
				firebase
					.firestore()
					.collection("newContacts")
					.doc(id)
					.delete()
					.catch(e => console.log(e))
					.then(() => getActions().getContactFromFB());
			}
		}
	};
};

export default getState;
