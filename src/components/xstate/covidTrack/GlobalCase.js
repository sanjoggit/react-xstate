import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import styles from "./coidTrack.module.css";

const GlobalCase = ({ globalCases }) => {
	return (
		<>
			<div className={styles.globalTitle}>
				<h4>Global Cases</h4>
				<h6>Last updated: {globalCases.lastUpdate}</h6>
			</div>
			<Row>
				<Col xs={12} sm={4}>
					<Card border="primary" text={"dark"} className={styles.globalCard}>
						<Card.Header>Confirmed</Card.Header>
						<Card.Body>
							<Card.Title>
								{globalCases.confirmed.value}
							</Card.Title>
						</Card.Body>
					</Card>
				</Col>
				<Col xs={12} sm={4}>
					<Card border="danger" text={"dark"} className={styles.globalCard}>
						<Card.Header>Deaths</Card.Header>
						<Card.Body>
							<Card.Title>{globalCases.deaths.value}</Card.Title>
						</Card.Body>
					</Card>
				</Col>
				<Col xs={12} sm={4}>
					<Card border="success" text={"dark"} className={styles.globalCard}>
						<Card.Header>Recovered</Card.Header>
						<Card.Body>
							<Card.Title>
								{globalCases.recovered.value}
							</Card.Title>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default GlobalCase;
