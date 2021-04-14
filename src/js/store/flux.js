import firebase from "firebase/app";
import "firebase/firestore";

const url = "https://assets.breatheco.de/apis/fake/contact/";
const getState = ({ getStore, setStore }) => {
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
					// console.log(e.message);
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
					});
			},

			loadContact() {
				fetch(url + "agenda/downtown_xii")
					.then(response => response.json())
					.then(result => {
						console.log("Get Contact", result),
							setStore({
								contacts: result
							});
					})
					.catch(e => console.error(e));
			},
			addContact(name, phone, email, address) {
				fetch(url, {
					method: "post",
					headers: { "Content-type": "application/json" },
					body: JSON.stringify({
						full_name: name,
						phone: phone,
						address: address,
						email: email,
						agenda_slug: "downtown_xii"
					})
				}).then(() => {
					fetch(url + "agenda/downtown_xii")
						.then(response => response.json())
						.then(result => {
							console.log("result", result),
								setStore({
									contacts: result
								});
						})
						.catch(e => console.error(e));
				});
			},
			editContact(id, name, phone, email, address) {
				fetch(url + id, {
					method: "put",
					headers: { "Content-type": "application/json" },
					body: JSON.stringify({
						full_name: name,
						phone: phone,
						address: address,
						email: email,
						agenda_slug: "downtown_xii"
					})
				}).then(() => {
					fetch(url + "agenda/downtown_xii")
						.then(response => response.json())
						.then(result => {
							console.log("update", result),
								setStore({
									contacts: result
								});
						})
						.catch(e => console.error(e));
				});
			},
			deleteContact(id) {
				fetch(url + id, {
					method: "delete"
				}).then(() => {
					fetch(url + "agenda/downtown_xii")
						.then(response => response.json())
						.then(result => {
							console.log("result", result),
								setStore({
									contacts: result
								});
						})
						.catch(e => console.error(e));
				});
			}
		}
	};
};

export default getState;
