import { Machine, assign } from "xstate";
import uuid from "uuid-v4";

const addTodo = assign((context, event) => {
	const newTodo = {
		id: uuid(),
		title: event.value,
		completed: false,
	};
	return {
		todos: [...context.todos, newTodo],
	};
});

const deleteTodo = assign((context, event) => {
	const filtered = context.todos.filter((todo) => todo.id !== event.id);
	return {
		todos: [...filtered],
	};
});

const toggleComplete = assign((context, event) => {
	const found = context.todos.find((todo) => todo.id === event.id);
	found.completed = !found.completed;
	return {
		todos: [...context.todos],
	};
});

const addValid = (context, event) => {
	return event.value && event.value.length > 0;
};

export const todosMachine = Machine(
	{
		id: "todos",
		initial: "idle",
		context: {
			todos: [],
		},
		states: {
			idle: {
				on: {
					NEWTODO_SUBMIT: [
						{
							target: "idle",
							cond: addValid,
							actions: [addTodo],
						},
						{ target: "invalid" },
					],
					TODO_DELETE: {
						target: "idle",
						actions: [deleteTodo],
					},
					TOGGLE_COMPLETE: {
						target: "idle",
						actions: [toggleComplete],
					},
				},
			},
			invalid: {
				on: {
					NEWTODO_SUBMIT: [
						{
							target: "idle",
							cond: addValid,
							actions: [addTodo],
						},
						{ target: "invalid" },
					],
				},
			},
		},
	},
	{ guards: { addValid }, actions: { addTodo, deleteTodo, toggleComplete } }
);
