import { PromptTemplate } from "@langchain/core/prompts";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { loadSummarizationChain } from "langchain/chains";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export async function summarizeText(text: string, geminiApiKey: string) {
	// reteive the Gemini API key from the Chrome storage
	const gemini = new ChatGoogleGenerativeAI({
		model: "gemini-1.5-flash-001",
		apiKey: geminiApiKey,
	});

	const textSplitter = new RecursiveCharacterTextSplitter({
		chunkSize: 100,
		chunkOverlap: 50,
	});

	const docs = await textSplitter.createDocuments([text]);

	const summaryRefineTemplate = `
Summarize in three sentences the following text:
--------
{text}
--------
`;

	const SUMMARY_REFINE_PROMPT = PromptTemplate.fromTemplate(
		summaryRefineTemplate,
	);

	const summarizerChain = loadSummarizationChain(gemini, {
		type: "refine",
		refinePrompt: SUMMARY_REFINE_PROMPT,
	});

	const summary = await summarizerChain.invoke({
		input_documents: docs,
	});

	return summary;
}
