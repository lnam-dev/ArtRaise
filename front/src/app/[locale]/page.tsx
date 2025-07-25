import MainPage from "~/ui/pages/main-page/main-page";
import { MainPage as TMainPage } from "~/use-cases/contracts/main-page";

const SLIDES = [
	{
		imgSrc: "/slider/img-1.png",
		title: "Sculpture Month",
		subtitle: "1 — 30.04.2025",
		description: "LNAA Gallery",
	},
	{
		imgSrc: "/slider/img-2.png",
		title: "Girl with a Pearl Earring",
		subtitle: "Johannes Vermeer",
	},
	{
		imgSrc: "/slider/img-3.png",
		title: "The great wave of Kanagawa",
		subtitle: "Katsushika Hokusai",
	},
	{
		imgSrc: "/slider/img-4.png",
		title: "The Lovers",
		subtitle: "Rene Magrita",
	},
	{
		imgSrc: "/slider/img-5.png",
		title: "The Gulf Stream",
		subtitle: "Rene Magrita",
	},
];

export const revalidate = 21600;

async function getData(): Promise<TMainPage> {
	try {
		const response = await fetch(`${process.env.API_URL}artpieces/`);
		if (!response.ok) {
			throw new Error(`Failed to fetch art pieces: ${response.status}`);
		}
		const artPieces = await response.json();
		return { artPieces, slides: SLIDES };
	} catch (error) {
		console.error(`Помилка при завантаженні мистецьких творів: ${error}`);
		return {
			artPieces: [],
			slides: SLIDES,
		};
	}
}

export default async () => {
	const data = await getData();
	return <MainPage data={data} />;
};
