import React from "react";
import HowToBuyPage from "~/ui/pages/how-to-buy-page/how-to-buy-page";
import { TStepToBuy } from "~/types/step-to-buy";

export const revalidate = 21600;
export const dynamic = "force-static";

async function getData(): Promise<TStepToBuy[]> {
	try {
		const response = await fetch(
			`${process.env.API_URL}faq/how-to-buy/?lang=ua`
		);
		if (!response.ok) {
			throw new Error(`Failed to fetch how to buy data: ${response.status}`);
		}

		const howToBuyData = await response.json();
		return howToBuyData;
	} catch (error) {
		console.error(`Error fetching how to buy data: ${error}`);
		return [];
	}
}

export default async () => {
	const Steps: TStepToBuy[] = await getData();

	return <HowToBuyPage steps={Steps} />;
};
