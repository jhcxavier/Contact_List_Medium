import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// import ScrollToTop from "./component/scrollToTop";
import Login from "../js/views/home";
import injectContext from "./store/appContext";
import { Contacts } from "./views/Contacts.js";
import { AddContact } from "./views/AddContact.js";
import { EditContact } from "./views/editContact";

export const Layout = () => {
	return (
		<div>
			<BrowserRouter>
				<div>
					<Switch>
						{/* <Route exact path="/index.html" component={Contacts} /> */}
						<Route exact path="/" component={Login} />
						<Route exact path="/contacts" component={Contacts} />
						<Route exact path="/add" component={AddContact} />
						<Route exact path="/edit/:id/:index" component={EditContact} />
						<Route render={() => <h1 className="notfound">Not found!</h1>} />
					</Switch>
				</div>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
