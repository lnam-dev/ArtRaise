import { TArtPiece } from "~/types";
import { TParams } from "~/types/params";
import ProductPage from "~/ui/pages/product-page";

const ACCORDION_ITEMS = [
	{ title: "Умови придбання", content: "Інформація про умови придбання" },
	{ title: "Сертифікати автентичності", content: "Інформація про сертифікати" },
	{ title: "FAQ", content: "Часті запитання" },
];

const ART_DETAIL_LABELS = {
	MATERIAL: "Матеріал",
	THEME: "Тема",
	STYLE: "Стиль",
	DATE: "Дата створення",
	SIZE: "Розмір",
};

export const revalidate = 21600;
export const dynamicParams = true;

async function getData(id: string): Promise<TArtPiece> {
	try {
		const response = await fetch(`${process.env.API_URL}artpieces/${id}/`);
		if (!response.ok) {
			throw new Error(`Failed to fetch art pieces: ${response.status}`);
		}

		const artPiece = await response.json();
		return artPiece;
	} catch (error) {
		console.error(error);
		throw error;
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
	const artPiece = await getData(id);

	return (
		<ProductPage
			artPiece={artPiece}
			ACCORDION_ITEMS={ACCORDION_ITEMS}
			ART_DETAIL_LABELS={ART_DETAIL_LABELS}
		/>
	);
};
