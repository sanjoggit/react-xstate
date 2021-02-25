import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";
import classes from "./userDetail.module.css";
import SpinnerComponent from "../SpinnerComponent";
import ButtonComponent from "../ButtomComponent";

const UserDetail = () => {
	const [user, setUser] = useState(null);
	const [userLoaded, setUserLoaded] = useState(false);

	const { id } = useParams();

	useEffect(() => {
		if (id) {
			getUserDetail();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	const getUserDetail = () => {
		axios
			.get(`https://jsonplaceholder.typicode.com/users/${id}`)
			.then(result => {
				setUser(result.data);
				setUserLoaded(true);
			})
			.catch(err => console.error(err));
	};
	if (!userLoaded) {
		return <SpinnerComponent />;
	}

	return (
		<Container>
			<Link to="/users">
				<ButtonComponent
					text="Go Back"
					variant="outline-info"
					buttonClass="mt-2"
				/>
			</Link>
			<Row className={classes.userDetailRow}>
				<Col xs={12} sm={4}>
					<Card className="text-center">
						<div className={classes.logoContainer}>
							<div className={classes.logo}>
								<span>{user.name.charAt(0)}</span>
							</div>
						</div>
						<Card.Body>
							<Card.Title>{user.name}</Card.Title>
							<Card.Subtitle className="mb-2 text-muted">
								{user.username}
							</Card.Subtitle>
						</Card.Body>
					</Card>
				</Col>
				<Col xs={12} sm={8} className={classes.contactCol}>
					<p>Contact Information</p>
					<div className={classes.contactInformation}>
						<div>
							<div>Email:</div>
							<div>{user.email.toLowerCase()}</div>
						</div>
						<div>
							<div>Phone:</div> <div>{user.phone}</div>
						</div>
						<div>
							<div>Company:</div> <div>{user.company.name}</div>
						</div>
						<div>
							<div>Website: </div>
							<div>{user.website}</div>
						</div>
						<div>
							<div>Address:</div>{" "}
							<div>
								<div>City: {user.address.city}</div>
								<div>Street: {user.address.street}</div>
								<div>Suite: {user.address.suite}</div>
								<div>Zipcode: {user.address.zipcode}</div>
							</div>
						</div>
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default UserDetail;
