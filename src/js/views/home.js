import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import { signin } from "../component/signIn";

const Login = () => {
	const history = useHistory();
	const { actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [fullName, setFullName] = useState("");
	const [login, setLogin] = useState(true);

	const onSingInClicked = async (email, password) => {
		try {
			await signin(email, password);
			console.log("success");
			history.push("/contacts");
		} catch (e) {
			console.log("fail", e.message);
		}
	};

	return (
		<span>
			<div className="sidenav">
				<div className="login-main-text">
					<h2>
						Application
						<br /> Login Page
					</h2>
					<p>Login or register from here to access.</p>
				</div>
			</div>
			<div className="main">
				<div className="col-md-6 col-sm-12">
					<div className="login-form">
						{login ? (
							<form>
								<div className="form-group">
									<label>Email</label>
									<input
										type="text"
										className="form-control"
										placeholder="Email"
										onChange={e => setEmail(e.target.value)}
									/>
								</div>
								<div className="form-group">
									<label>Password</label>
									<input
										type="password"
										className="form-control"
										placeholder="Password"
										onChange={e => setPassword(e.target.value)}
									/>
								</div>
								<button
									type="submit"
									className="btn btn-black"
									onClick={e => {
										onSingInClicked(email, password);
										e.preventDefault();
									}}>
									Login
								</button>
								<button type="submit" className="btn btn-secondary" onClick={() => setLogin(false)}>
									Register
								</button>
							</form>
						) : (
							<div>
								<div className="form-group">
									<label>Full Name</label>
									<input
										type="text"
										value={fullName}
										className="form-control"
										placeholder="Email"
										onChange={e => setFullName(e.target.value)}
									/>
								</div>
								<div className="form-group">
									<label>Email</label>
									<input
										type="text"
										value={email}
										className="form-control"
										placeholder="Email"
										onChange={e => setEmail(e.target.value)}
									/>
								</div>
								<div className="form-group">
									<label>Password</label>
									<input
										type="password"
										value={password}
										className="form-control"
										placeholder="Password"
										onChange={e => setPassword(e.target.value)}
									/>
								</div>
								<button
									type="submit"
									className="btn btn-black"
									onClick={() => {
										setLogin(true);
									}}>
									Cancel
								</button>
								<button
									type="submit"
									className="btn btn-secondary"
									onClick={e => {
										e.preventDefault();
										actions.createUser(email, password, fullName);
									}}>
									Create
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</span>
	);
};
export default Login;
