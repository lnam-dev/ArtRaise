import { TArtPiece } from "~/types";
import CategoryPage from "~/ui/pages/category-page/category-page";
import {
	STATIC_CATEGORIES_SLUG,
	NEW_ARRIVALS_PAGE_SIZE,
} from "~/const/static-categories";
import { DEFAULT_PAGE_SIZE } from "~/const/search-page";

export type TParams = {
	params: Promise<{ category: string }>;
	searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const revalidate = 21600;
export const dynamic = "force-dynamic";

interface FetchOptions {
	category: string;
	page: number;
}

async function getData({
	category,
	page,
}: FetchOptions): Promise<{ artpieces: TArtPiece[]; pagination: any }> {
	try {
		const isNewArrivalsCategory = category === "new-arrivals";

		const endpoint = isNewArrivalsCategory
			? `search?sort_by=date&sort_direction=desc&page=1&page_size=${NEW_ARRIVALS_PAGE_SIZE}`
			: `search?type=${encodeURIComponent(
					category
			  )}&page=${page}&page_size=${DEFAULT_PAGE_SIZE}`;

		const response = await fetch(`${process.env.API_URL}${endpoint}`, {
			next: { revalidate },
			cache: "force-cache",
		} as any);

		if (!response.ok) {
			throw new Error(`Failed to fetch artpieces: ${response.status}`);
		}

		const { results, pagination }: { results: TArtPiece[]; pagination: any } =
			await response.json();

		return { artpieces: results, pagination };
	} catch (error) {
		console.error(`Error: ${error}`);
		return { artpieces: [], pagination: {} };
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

		const apiCategories = categories.map((category) => ({
			category: category.slug,
		}));

		const staticCategories = STATIC_CATEGORIES_SLUG.map((slug) => ({
			category: slug.slug,
		}));

		return [...staticCategories, ...apiCategories];
	} catch (error) {
		console.error(`Error generating static routes: ${error}`);
		return [STATIC_CATEGORIES_SLUG];
	}
}
export default async ({ params, searchParams }: TParams) => {
	const { category } = await params;
	const queryParams = (await searchParams) || {};

	const isNewArrivalsCategory = category === "new-arrivals";

	const resolvedPage = isNewArrivalsCategory
		? 1
		: queryParams.page
		? Number(queryParams.page)
		: 1;

	const { artpieces, pagination } = await getData({
		category,
		page: resolvedPage,
	});

	const currentCategoryName =
		STATIC_CATEGORIES_SLUG.find((item) => item.slug === category)?.name_ua ||
		artpieces[0]?.category?.name_ua ||
		"";

	return (
		<CategoryPage
			artPieces={artpieces}
			categories={currentCategoryName}
			pagination={pagination}
		/>
	);
};
