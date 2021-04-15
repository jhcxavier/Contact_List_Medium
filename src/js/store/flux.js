import firebase from "firebase/app";
const url = "https://assets.breatheco.de/apis/fake/contact/";
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
					let arr = [];
					response.forEach(contact => {
						arr.push({ ...contact.data(), id: contact.id });
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
					.doc(id)
					.set({
						full_name: name,
						phone: phone,
						email: email,
						address: address
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
