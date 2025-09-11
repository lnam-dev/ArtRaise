import { TArtPiece } from "~/types";
import ProductPage from "~/ui/pages/product-page/product-page";

export type TParams = {
	params: Promise<{
		id: string;
	}>;
};

const ACCORDION_ITEMS = [
	{ title: "Умови придбання", content: "Інформація про умови придбання" },
	{ title: "FAQ", content: "Часті запитання" },
];

export const revalidate = 21600;
export const dynamic = "force-dynamic";

async function getData(id: string): Promise<{
	artPiece: TArtPiece;
	similarArtPieces: TArtPiece[];
}> {
	try {
		const artPieceRes = await fetch(`${process.env.API_URL}artpieces/${id}/`, {
			cache: "force-cache",
		});

		if (!artPieceRes.ok) {
			throw new Error("Failed to fetch art piece");
		}

		const artPiece: TArtPiece = await artPieceRes.json();

		const styleParam = encodeURIComponent(artPiece.style);

		const similarArtPiecesRes = await fetch(
			`${process.env.API_URL}search?style=${styleParam}`,
			{
				cache: "force-cache",
			}
		);

		if (!similarArtPiecesRes.ok) {
			throw new Error("Failed to fetch similar art pieces");
		}

		const similarArtPiecesData = await similarArtPiecesRes.json();

		const validatedSimilarArtPieces = similarArtPiecesData.results.filter(
			(item: TArtPiece) => item.id !== artPiece.id
		);

		return { artPiece, similarArtPieces: validatedSimilarArtPieces };
	} catch (error) {
		console.error("Error fetching art piece or similar art pieces:", error);
		return { artPiece: {} as TArtPiece, similarArtPieces: [] };
	}
}

export async function generateStaticParams() {
	try {
		const response = await fetch(`${process.env.API_URL}artpieces/`);
		if (!response.ok) {
			throw new Error(`Failed to fetch art pieces: ${response.status}`);
		}
		const artPieces = await response.json();

		return artPieces.map((artPiece: any) => ({
			id: artPiece.id.toString(),
		}));
	} catch (error) {
		console.error(`Failed to generate static pages: ${error}`);
		return [];
	}
}

export default async ({ params }: TParams) => {
	const { id } = await params;
	const { artPiece, similarArtPieces } = await getData(id);

	return (
		<ProductPage
			artPiece={artPiece}
			similarArtPieces={similarArtPieces}
			ACCORDION_ITEMS={ACCORDION_ITEMS}
		/>
	);
};
