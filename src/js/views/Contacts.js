import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { ContactCard } from "../component/ContactCard.js";
import { Modal } from "../component/Modal";

export const Contacts = () => {
	const { actions, store } = useContext(Context);
	const [state, setState] = useState({
		showModal: false
	});
	// useEffect(() => {
	// 	actions.getContactFromFB();
	// }, []);
	console.log("store FB", store.contactsFB);
	return (
		<div className="container">
			<div className="text-center mt-2">
				<h2>Contact List</h2>
			</div>
			<div>
				<p className="text-right my-3">
					<Link className="btn btn-success" to="/add">
						Add new contact
					</Link>
				</p>
				<div id="contacts" className="panel-collapse collapse show" aria-expanded="true">
					<ul className="list-group pull-down" id="contact-list">
						<ContactCard onDelete={() => setState({ showModal: true })} />
					</ul>
				</div>
			</div>
			<Modal show={state.showModal} onClose={() => setState({ showModal: false })} />
		</div>
	);
};
