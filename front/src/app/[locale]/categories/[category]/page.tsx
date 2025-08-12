import { TCategory } from "~/types/categories";
import { TArtPiece } from "~/types";

import CategoryPage from "~/ui/pages/category-page/category-page";

export type TParams = {
	params: Promise<{
		category: string;
	}>;
};

export const revalidate = 21600;
export const dynamic = "force-dynamic";

async function getData(category: string): Promise<TArtPiece[]> {
	try {
		const response = await fetch(
			`${process.env.API_URL}search?type=${category}`
		);
		if (!response.ok) {
			throw new Error(`Failed to fetch artpieces: ${response.status}`);
		}
		const { results }: { results: TArtPiece[] } = await response.json();
		return results;
	} catch (error) {
		console.error(`Помилка при завантаженні арт-об'єктів: ${error}`);
		return [];
	}
}

export default async ({ params }: TParams) => {
	const { category } = await params;
	const artPieces = await getData(category);

	return <CategoryPage artPieces={artPieces} />;
};
