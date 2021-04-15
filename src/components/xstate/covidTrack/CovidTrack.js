import { useMachine } from "@xstate/react";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { covidTrackMachine } from "./covidTrackMachine";
import SpinnerComponent from "../../SpinnerComponent";
import styles from "./coidTrack.module.css";
import { CountryCard } from "./CountryCard";
import GlobalCase from "./GlobalCase";

export const CovidTrack = () => {
	const [state, send] = useMachine(covidTrackMachine, { devTools: true });
	const [input, setInput] = useState("");

	useEffect(() => {
		send({ type: "FETCH_COVID_LIST" });
		send({ type: "FETCH_GLOBAL_CASE" });
		// eslint-disable-next-line
	}, []);

	const filteredCountries = () => {
		if (input.length > 0) {
			const filterCountries = state.context.countries.filter(
				(country) =>
					country.name
						.toLowerCase()
						.indexOf(input.toLocaleLowerCase()) !== -1
			);
			return filterCountries;
		}
		return state.context.countries;
	};

	return (
		<Container>
			<h3 className={styles.pageTitle}>Covid-19 Coronavirus Outbreak</h3>
			<Row>
				<Col xs={{ span: 6, offset: 3 }}>
					<div>
						<Form>
							<Form.Control
								type="text"
								placeholder="Search by countries"
								value={input}
								onChange={(e) => setInput(e.target.value)}
							/>
						</Form>
					</div>
				</Col>
			</Row>
			{state.matches("failure") && "Something went wrong"}
			{state.matches("loading") && <SpinnerComponent />}
			{state.context.global != null && (
				<GlobalCase globalCases={state.context.global} />
			)}
			<h3 style={{ marginTop: 40 }}>All Countries</h3>
			<CountryCard countries={filteredCountries()} />
		</Container>
	);
};
