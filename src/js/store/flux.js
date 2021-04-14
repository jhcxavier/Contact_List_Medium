import firebase from "firebase/app";
import "firebase/firestore";

const getState = ({ getStore, setStore, getActions }) => {
	return {
		store: {
			userId: "",
			contacts: [],
			contactsFB: []
		},
		actions: {
			getUserId: userId => {
				setStore(userId);
			},
			getContactFromFB: async () => {
				try {
					const getContact = firebase.firestore().collection("newContacts");
					const response = await getContact.get();
					console.log("response", response);
					// console.log("contact", response[0].data(), response.data());
					let arr = [];
					response.forEach(contact => {
						console.log("contactforEach", contact);
						arr = [...arr, { ...contact.data(), id: contact.id }];
						setStore({ contactsFB: arr });
					});
				} catch (e) {
					console.log(e);
				} finally {
					console.log("LAst result", getStore().contactsFB);
				}
			},
			addContactFB: async (name, phone, email, address, doc) => {
				return firebase
					.firestore()
					.collection("newContacts")
					.doc(doc)
					.set({
						full_name: name,
						phone,
						email,
						address
					})
					.then(() => {
						console.log("Document successfully written!");
					})
					.catch(error => {
						console.error("Error writing document: ", error);
					})
					.then(() => getActions().getContactFromFB());
			},
			deleteContactFB: async id => {
				return firebase
					.firestore()
					.collection("newContacts")
					.doc(id)
					.delete()
					.then(() => {
						console.log("Document successfully deleted!");
					})
					.catch(error => {
						console.error("Error removing document: ", error);
					})
					.then(() => getActions().getContactFromFB());
			}
		}
	};
};

export default getState;
