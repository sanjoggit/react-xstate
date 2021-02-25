import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "./components/users/UserList";
import UserDetail from "./components/userDetail/UserDetail";

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={UserList} />
				<Route exact path="/users" component={UserList} />
				<Route path="/users/:id" component={UserDetail} />
			</Switch>
		</Router>
	);
}

export default App;
