import "./index.css";
import van from "vanjs-core";
import { MessageBoard } from "vanjs-ui";
const { h3, div, input, button, main } = van.tags;

const board = new MessageBoard({ top: "20px" });
export const GeminiForm = () => {
	const divDom = main(
		div({ class: "gemini-api-key-form" }, h3("Gemini API Key")),
	);
	const inputDom = input({
		type: "text",
		id: "gemini-api",
		placeholder: "Enter your Gemini API Key",
	});
	van.add(
		divDom,
		inputDom,
		button(
			{
				onclick: () => {
					// Set the Gemini key to the Chrome storage
					chrome.storage.sync.set({
						gemini: inputDom.value,
					});
					board.show({ message: "Added your Gemini Key", durationSec: 2 });
				},
			},
			"Add",
		),
	);
	return divDom;
};

van.add(document.body, GeminiForm());
