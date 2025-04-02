import ProductPage from "~/ui/pages/product-page";
import { ProductPage as TProductPage } from "~/use-cases/contracts/product-page";

export const revalidate = 21600;

// async function getData(id: string): Promise<TProductPage> {
// 	try {
// 		const response = await fetch(`${process.env.API_URL}artpieces/${id}/`);
// 		if (!response.ok) {
// 			throw new Error(`Failed to fetch art pieces: ${response.status}`);
// 		}
// 		const artPiece = await response.json();
// 		return { artPiece };
// 	} catch (error) {
// 		console.error(error);
// 		throw error;
// 	}
// }

// export async function generateStaticParams() {
// 	try {
// 		const response = await fetch(`${process.env.API_URL}artpieces/`);
// 		if (!response.ok) {
// 			throw new Error(`Failed to fetch art pieces: ${response.status}`);
// 		}
// 		const artPieces = await response.json();

// 		return artPieces.map((artPiece: any) => ({
// 			id: String(artPiece.id),
// 			langstore: "uk",
// 		}));
// 	} catch (error) {
// 		console.error(`Failed to generate static pages: ${error}`);
// 		return [];
// 	}
// }

async function getData(id: string): Promise<TProductPage> {
	try {
		const response = await fetch(`${process.env.API_URL}artpieces/`);
		if (!response.ok) {
			throw new Error(`Failed to fetch art pieces: ${response.status}`);
		}
		const artPiecesArray = await response.json();
		const currentArtPiece = artPiecesArray.find(
			(artPiece: any) => artPiece.id === Number(id)
		);
		return { artPiece: currentArtPiece };
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export default async ({
	params,
}: {
	params: { id: string; langstore: string };
}) => {
	const data = await getData(params.id);
	return <ProductPage data={data} />;
};
