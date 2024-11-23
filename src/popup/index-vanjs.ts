import "./index.css";
import van from "vanjs-core";

const { a, button, del, div, input, span } = van.tags;

const TodoItem = ({ text }) => {
	const done = van.state(false);
	const deleted = van.state(false);

	const handleDelete = () => {
		deleted.val = true;
	};

	return () =>
		deleted.val
			? null
			: div(
					input({
						type: "checkbox",
						checked: done,
						onclick: (e) => {
							done.val = e.target.checked;
						},
					}),
					() => (done.val ? del : span)(text),
					a({ onclick: () => handleDelete() }, "❌"),
				);
};

const TodoList = () => {
	const inputDom = input({ type: "text" });
	const dom = div(
		inputDom,
		button(
			{ onclick: () => van.add(dom, TodoItem({ text: inputDom.value })) },
			"Add",
		),
	);
	return dom;
};

van.add(document.body, TodoList());
