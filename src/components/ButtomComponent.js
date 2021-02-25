import React from "react";
import { Button } from "react-bootstrap";

const ButtonComponent = ({ text, buttonClass, variant }) => {
	return (
		<Button className={buttonClass} variant={variant}>
			{text}
		</Button>
	);
};

export default ButtonComponent;
