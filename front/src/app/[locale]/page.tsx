import MainPage from "~/ui/pages/main-page/main-page";
import { MainPage as TMainPage } from "~/use-cases/contracts/main-page";

export const revalidate = 21600;
export const dynamic = "force-static";

async function getData(): Promise<TMainPage> {
	try {
		const artPiecesResponse = await fetch(`${process.env.API_URL}artpieces/`, {
			next: { revalidate: revalidate },
			cache: "force-cache",
		} as any);

		const SliderResponse = await fetch(`${process.env.API_URL}slider/`, {
			next: { revalidate: revalidate },
			cache: "force-cache",
		} as any);

		const findByTagResponse = await fetch(`${process.env.API_URL}artpieces/tags`, {
			next: { revalidate: revalidate },
			cache: "force-cache",
		} as any);

		if (!artPiecesResponse.ok) {
			throw new Error(
				`Failed to fetch art pieces: ${artPiecesResponse.status}`
			);
		}
		if (!findByTagResponse.ok) {
			throw new Error(
				`Failed to fetch tags: ${artPiecesResponse.status}`
			);
		}
		if (!SliderResponse.ok) {
			throw new Error(`Failed to fetch slides: ${SliderResponse.status}`);
		}
		const artPieces = await artPiecesResponse.json();
		const slides = await SliderResponse.json();
		const tagsFindBy = (await findByTagResponse.json()).tags;
		return { artPieces, slides , tagsFindBy};
	} catch (error) {
		console.error(`Помилка при завантаженні мистецьких творів: ${error}`);
		return {
			artPieces: [],
			slides: [],
			tagsFindBy: []
		};
	}
}

export default async () => {
	const data = await getData();
	return <MainPage slides={data.slides} artPieces={data.artPieces} tagsFindBy={data.tagsFindBy} />;
};
