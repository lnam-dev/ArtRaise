import { TArtPiece } from "~/types";

import CategoryPage from "~/ui/pages/category-page/category-page";
import {
	NEW_ARRIVALS_PAGE_SIZE,
	STATIC_CATEGORIES_SLUG,
} from "~/const/static-categories";

export type TParams = {
	params: Promise<{
		category: string;
	}>;
};

export const revalidate = 21600;
export const dynamic = "force-dynamic";

async function getData(category: string): Promise<TArtPiece[]> {
	try {
		const isNewArrivals = category === "new-arrivals";
		const endpoint = isNewArrivals
			? `search?sort_by=date&sort_direction=desc&page=1&page_size=${NEW_ARRIVALS_PAGE_SIZE}`
			: `search?type=${category}`;

		const response = await fetch(`${process.env.API_URL}${endpoint}`, {
			next: { revalidate },
			cache: "force-cache",
		} as any);

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

export async function generateStaticParams() {
	try {
		const response = await fetch(
			`${process.env.API_URL}artpieces/categories/`,
			{
				next: { revalidate },
				cache: "force-cache",
			} as any
		);
		if (!response.ok) {
			throw new Error(`Failed to fetch categories: ${response.status}`);
		}

		const { categories }: { categories: { slug: string }[] } =
			await response.json();

		const categoryParams = categories.map((category) => ({
			category: category.slug,
		}));

		const staticCategoriesParams = STATIC_CATEGORIES_SLUG.map((slug) => ({
			category: slug.slug,
		}));

		const merged = [...staticCategoriesParams, ...categoryParams];

		return merged;
	} catch (error) {
		console.error(`Error generating static routes: ${error}`);
		return [STATIC_CATEGORIES_SLUG];
	}
}

export default async ({ params }: TParams) => {
	const { category } = await params;
	const artPieces = await getData(category);

	const validationCurrentCategory =
		STATIC_CATEGORIES_SLUG.find((item) => item.slug === category)?.name_ua ||
		artPieces[0].category.name_ua;

	console.log("validationCurrentCategory", validationCurrentCategory);
	return (
		<CategoryPage
			artPieces={artPieces}
			categories={validationCurrentCategory}
		/>
	);
};
