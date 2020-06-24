import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

export const EditContact = props => {
	// let short = store.contacts[props.match.params.index];
	let id = props.match.params.id;
	const { store, actions } = useContext(Context);
	const [phone, setPhone] = useState(store.contacts[props.match.params.index].phone);
	const [name, setName] = useState(store.contacts[props.match.params.index].full_name);
	const [email, setEmail] = useState(store.contacts[props.match.params.index].email);
	const [address, setAddress] = useState(store.contacts[props.match.params.index].address);
	if (store == undefined) {
		return <h1>Loading...</h1>;
	} else {
		return (
			<div className="container">
				<div>
					<h1 className="text-center mt-5">Edit contact</h1>
					<form>
						<div className="form-group">
							<label>Full Name</label>
							<input
								type="text"
								className="form-control"
								placeholder="Full Name"
								value={name}
								onChange={e => setName(e.target.value)}
							/>
						</div>
						<div className="form-group">
							<label>Email</label>
							<input
								type="email"
								className="form-control"
								placeholder="Enter email"
								value={email}
								onChange={e => setEmail(e.target.value)}
							/>
						</div>
						<div className="form-group">
							<label>Phone</label>
							<input
								type="phone"
								className="form-control"
								placeholder="Enter phone"
								value={phone}
								onChange={e => setPhone(e.target.value)}
							/>
						</div>
						<div className="form-group">
							<label>Address</label>
							<input
								type="text"
								className="form-control"
								placeholder="Enter address"
								value={address}
								onChange={e => setAddress(e.target.value)}
							/>
						</div>
						<Link to={"/"}>
							<button
								type="button"
								className="btn btn-primary form-control"
								onClick={() => {
									actions.editContact(id, name, phone, email, address);
								}}>
								save
							</button>
						</Link>
						<Link className="mt-3 w-100 text-center" to="/">
							or get back to contacts
						</Link>
					</form>
				</div>
			</div>
		);
	}
};
EditContact.propTypes = {
	match: PropTypes.object
};
