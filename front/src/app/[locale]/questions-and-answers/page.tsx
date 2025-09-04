import React from "react";

import { TFAQResponse } from "~/types";
import { TQAPage } from "~/use-cases/contracts/qa-page";

import QAPage from "~/ui/pages/qa-page/qa-page";

export const revalidate = 21600;
export const dynamic = "force-static";

async function getData(): Promise<TFAQResponse> {
	try {
		const response = await fetch(
			`${process.env.API_URL}faq/questions/question-and-answer/`
		);
		if (!response.ok) {
			throw new Error(`Failed to fetch FAQ data: ${response.status}`);
		}

		const faqData = await response.json();
		return faqData;
	} catch (error) {
		console.error(`Error fetching FAQ data: ${error}`);
		return {
			common: [],
			frequent: [],
		};
	}
}

const Home = async () => {
	const QAdata: TQAPage = await getData();
	return <QAPage {...QAdata} />;
};

export default Home;
