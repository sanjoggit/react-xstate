import React, { useState } from "react";
import { Row, Col, Card, ListGroup, Badge } from "react-bootstrap";
import ReactCountryFlag from "react-country-flag";
import { useMachine } from "@xstate/react";
import { covidCountryMachine } from "./covidCountryMachine";
import styles from "./coidTrack.module.css";

export const CountryCard = ({ countries }) => {
	const [state, send] = useMachine(covidCountryMachine, { devTools: true });
	const [showOverlay, setShowOverlay] = useState("");
	const data = state.context.countryData;

	const handleMouseOver = (country) => {
		setShowOverlay(country);
		send({ type: "FETCH_COVID_DATA_COUNTRY", country });
	};

	return (
		<Row className={styles.countriesRow}>
			{countries.map((country) => (
				<Col
					xs={12}
					sm={6}
					md={4}
					lg={3}
					key={country.name}
					className={styles.countryCol}
					onMouseEnter={() => handleMouseOver(country.name)}
					onMouseLeave={() => setShowOverlay("")}
				>
					<Card className={styles.card}>
						<Card.Body>
							<Card.Title>
								<h6 className={styles.countryName}>
									{country.name}
								</h6>
							</Card.Title>
						</Card.Body>
						{country.iso2 ? (
							<ReactCountryFlag
								countryCode={country.iso2}
								svg
								style={{
									width: "none",
									height: "none",
								}}
							/>
						) : (
							<Card.Img
								variant="top"
								// src="https://via.placeholder.com/150"
							/>
						)}
						<div className={styles.overlay}>
							{showOverlay === country.name && (
								<div
									style={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
									}}
								>
									{state.matches("failure") &&
										"Something went wrong"}
									{state.matches("loading") && (
										<p style={{ color: "white" }}>
											Loading...
										</p>
									)}

									{data != null && (
										<ListGroup variant="flush">
											<ListGroup.Item
												className={styles.listGroupItem}
											>
												<h4>
													<Badge variant="primary">
														Confirmed:{" "}
														{data.confirmed.value}
													</Badge>
												</h4>
											</ListGroup.Item>
											<ListGroup.Item
												className={styles.listGroupItem}
											>
												<h4>
													<Badge variant="danger">
														Death:{" "}
														{data.deaths.value}
													</Badge>
												</h4>
											</ListGroup.Item>
											<ListGroup.Item
												className={styles.listGroupItem}
											>
												<h4>
													<Badge variant="success">
														Recovered:{" "}
														{data.recovered.value}
													</Badge>
												</h4>
											</ListGroup.Item>
										</ListGroup>
									)}
								</div>
							)}
						</div>
					</Card>
				</Col>
			))}
		</Row>
	);
};
