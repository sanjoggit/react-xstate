import React from "react";
import { Spinner } from "react-bootstrap";

const SpinnerComponent = () => {
	return (
		<div style={{ display: "flex", justifyContent: "center" }}>
			<Spinner animation="border" role="status">
				<span className="sr-only">Loading...</span>
			</Spinner>
		</div>
	);
};

export default SpinnerComponent;
