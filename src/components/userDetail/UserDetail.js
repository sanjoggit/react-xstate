import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";
import classes from "./userDetail.module.css";
import SpinnerComponent from "../SpinnerComponent";
import ButtonComponent from "../ButtomComponent";
import useSWR from "swr";

const UserDetail = () => {
	const { id } = useParams();
	const {data, error} = useSWR(`https://jsonplaceholder.typicode.com/users/${id}`)
	// const [user, setUser] = useState(null);
	// const [userLoaded, setUserLoaded] = useState(false);

	// useEffect(() => {
		//getUserDetail();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [id]);

	// const getUserDetail = () => {
	// 	axios
	// 		.get(`https://jsonplaceholder.typicode.com/users/${id}`)
	// 		.then((result) => {
	// 			setUser(result.data);
	// 			setUserLoaded(true);
	// 		})
	// 		.catch((err) => console.error(err));
	// };
	// if (!userLoaded) {
	// 	return <SpinnerComponent />;
	// }

	if (error) return <div>failed to load</div>
	if (!data) return <SpinnerComponent />;

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
								<span>{data.name.charAt(0)}</span>
							</div>
						</div>
						<Card.Body>
							<Card.Title>{data.name}</Card.Title>
							<Card.Subtitle className="mb-2 text-muted">
								{data.username}
							</Card.Subtitle>
						</Card.Body>
					</Card>
				</Col>
				<Col xs={12} sm={8} className={classes.contactCol}>
					<p>Contact Information</p>
					<div className={classes.contactInformation}>
						<div>
							<div>Email:</div>
							<div>{data.email.toLowerCase()}</div>
						</div>
						<div>
							<div>Phone:</div> <div>{data.phone}</div>
						</div>
						<div>
							<div>Company:</div> <div>{data.company.name}</div>
						</div>
						<div>
							<div>Website: </div>
							<div>{data.website}</div>
						</div>
						<div>
							<div>Address:</div>{" "}
							<div>
								<div>City: {data.address.city}</div>
								<div>Street: {data.address.street}</div>
								<div>Suite: {data.address.suite}</div>
								<div>Zipcode: {data.address.zipcode}</div>
							</div>
						</div>
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default UserDetail;
