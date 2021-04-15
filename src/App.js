import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "./components/users/UserList";
import UserDetail from "./components/userDetail/UserDetail";
import Glove from './components/glove/Glove';
import {Todos} from "./components/xstate/todoApp";
import {CovidTrack} from "./components/xstate/covidTrack"

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={UserList} />
				<Route exact path="/users" component={UserList} />
				<Route path="/users/:id" component={UserDetail} />
				<Route path="/gloves" component={Glove} />
				<Route path="/todos" component={Todos}/>
				<Route path="/covidTrack" component={CovidTrack}/>
			</Switch>
		</Router>
	);
}

export default App;
