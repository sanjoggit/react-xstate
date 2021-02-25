import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import classes from "./user.module.css";
import User from "./user";
import SpinnerComponent from "../SpinnerComponent";

const UserList = () => {
	const [users, setUsers] = useState([]);
	const [userLoaded, setUserLoaded] = useState(false);

	useEffect(() => {
		getUsers();
	}, []);

	const getUsers = () => {
		axios
			.get("https://jsonplaceholder.typicode.com/users")
			.then(result => {
				setUsers(result.data);
				setUserLoaded(true);
			})
			.catch(err => console.error(err));
	};

	if (!userLoaded) {
		return <SpinnerComponent />;
	}

	return (
		<Container>
			<p className={classes.heading}>Users</p>
			<Row>
				{users.map(user => (
					<Col
						key={user.id}
						xs={12}
						sm={6}
						md={4}
						style={{ marginBottom: 20 }}
					>
						<User classes={classes} user={user} />
					</Col>
				))}
			</Row>
		</Container>
	);
};

export default UserList;
