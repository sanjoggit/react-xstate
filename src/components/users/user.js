import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import ButtonComponent from "../ButtomComponent";

const user = ({ classes, user }) => {
	return (
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
				<Card.Text>{user.email.toLowerCase()}</Card.Text>
				<Link to={`/users/${user.id}`}>
					<ButtonComponent
						text="MORE DETAILS"
						buttonClass={classes.button}
					/>
				</Link>
			</Card.Body>
		</Card>
	);
};

export default user;
