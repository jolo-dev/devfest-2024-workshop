import * as cheerio from "cheerio";
import { summarizeText } from "../ai/langchain-solution";

const $ = cheerio.load(document.body.innerHTML);
console.info("contentScript is running");

const text = $("article").text();
console.log(text);

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
	console.log(request);

	if (request.type === "SUMMARIZE") {
		console.log("contentScript has received a message from popup");

		chrome.storage.sync.get(["gemini"], async (result) => {
			const geminiApiKey = result.gemini;
			const summary = await summarizeText(text, geminiApiKey);
			console.log("here is the summary of the page:");
			console.log(summary);
			sendResponse({ summary });
		});
	}
	return true; // Keeps the message channel open for asynchronous responses
});
