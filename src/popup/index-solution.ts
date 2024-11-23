import { Await } from "vanjs-ui";
import "./index.css";
import van from "vanjs-core";

const { main, div, h3, button } = van.tags;

const getSummaryResponse = async () => {
	// let summarizeText = "";
	const tab = await chrome.tabs.query({ active: true, currentWindow: true });
	const summarizeText = await chrome.tabs.sendMessage(tab[0].id, {
		type: "SUMMARIZE",
	});
	return summarizeText;
};

const result = van.state(getSummaryResponse());

const Summary = () => {
	const divDom = main(
		h3("Summary"),
		div(
			{ class: "summary" },
			() =>
				Await(
					{
						value: result.val,
						Loading: () => "Loading...",
						Error: (error) => `Error: ${error}`,
					},
					(value) => value.summary.output_text,
				),
			// button(
			// 	{
			// 		onclick: () => {
			// 			console.log("popup is sending a message to contentScript");
			// 			result.val = getSummaryResponse();
			// 		},
			// 	},
			// 	"Summarize",
			// ),
		),
	);

	return divDom;
};

van.add(document.body, Summary());
