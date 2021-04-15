import React, { useState } from "react";
import {
	Container,
	Row,
	Col,
	Form,
	ListGroup,
	Button,
	Alert,
} from "react-bootstrap";
import classes from "./todo.module.css";
import { todosMachine } from "./todosMachine";
import { useMachine } from "@xstate/react";
import { X, PencilSquare } from "react-bootstrap-icons";

export const Todos = () => {
	const [state, send] = useMachine(todosMachine, { devTools: true });
	const [input, setInput] = useState("");
	const [showLeftItems, setShowLeftItems] = useState("");
	console.log("state", state);

	return (
		<Container>
			<h3>ToDos with X State</h3>
			<Row>
				<Col xs={{ span: 6, offset: 3 }}>
					{state.matches("invalid") && (
						<Alert variant="danger">Empty Todo</Alert>
					)}
					<Form
						className={classes.form}
						onSubmit={(e) => {
							e.preventDefault();
							send({
								type: "NEWTODO_SUBMIT",
								value: input,
							});
							setInput("");
						}}
					>
						<Form.Control
							type="text"
							placeholder="What needs to be done?"
							value={input}
							onChange={(e) => setInput(e.target.value)}
						/>
						<i className="bi bi-x"></i>
					</Form>
				</Col>
			</Row>
			{state.context.todos.length > 0 && (
				<>
					<Row>
						<Col xs={{ span: 6, offset: 3 }}>
							<div className={classes.ctrlBtnContainer}>
								<div>2 item left</div>
								<div className={classes.ctrlBtn}>
									<Button variant="outline-dark">
										Show all
									</Button>
									<Button variant="outline-dark">
										Completed
									</Button>
									<Button variant="outline-dark">
										To Do
									</Button>
								</div>
							</div>
						</Col>
					</Row>
					<Row>
						<Col xs={{ span: 6, offset: 3 }}>
							<ListGroup>
								{state.context.todos.map((todo) => (
									<ListGroup.Item
										key={todo.id}
										className={classes.listItem}
										onMouseOver={() =>
											setShowLeftItems(todo.id)
										}
										onMouseLeave={() =>
											setShowLeftItems("")
										}
									>
										<div className={classes.leftItem}>
											<div>
												<Form.Check
													aria-label="option 1"
													checked={todo.completed}
													onChange={(e) =>
														send({
															type:
																"TOGGLE_COMPLETE",
															id: todo.id,
														})
													}
												/>
											</div>
											<div>
												{todo.completed ? (
													<strike>
														{todo.title}
													</strike>
												) : (
													todo.title
												)}
											</div>
										</div>
										{showLeftItems === todo.id && (
											<div className={classes.rightItem}>
												<div>
													<PencilSquare size="20" />
												</div>
												<div
													onClick={() => {
														send({
															type: "TODO_DELETE",
															id: todo.id,
														});
													}}
												>
													<X size="26" />
												</div>
											</div>
										)}
									</ListGroup.Item>
								))}
							</ListGroup>
						</Col>
					</Row>
				</>
			)}
		</Container>
	);
};
