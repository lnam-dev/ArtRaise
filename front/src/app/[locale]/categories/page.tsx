import { TCategory } from "~/types/categories";
import CategoriesPage from "~/ui/pages/categories-page/categories-page";

const NEW_ARRIVALS: TCategory = {
	id: 1,
	slug: "new-arrivals",
	image_url: "/default.png",
	description: "New Arrivals",
	name_en: "New Arrivals",
	name_ua: "Нові надходження",
	count: 24,
	is_available: true,
};

export const dynamic = "force-static";

async function getData(): Promise<{
	staticCategory: TCategory[];
	dynamicCategory: TCategory[];
}> {
	try {
		const [categoriesRes, newArrivalsRes] = await Promise.all([
			fetch(`${process.env.API_URL}artpieces/categories/`, {
				cache: "force-cache",
			}),
			fetch(
				`${process.env.API_URL}search?sort_by=date&sort_direction=desc&page=1&page_size=1`,
				{ cache: "force-cache" }
			),
		]);

		if (!categoriesRes.ok || !newArrivalsRes.ok) {
			throw new Error("Failed to fetch data");
		}

		const categoriesData = await categoriesRes.json();
		const newArrivalsData = await newArrivalsRes.json();

		const dynamicCategory: TCategory[] = categoriesData.categories;
		const staticCategory: TCategory[] = [
			{
				...NEW_ARRIVALS,
				image_url: newArrivalsData.results[0].image_artpiece,
				count: newArrivalsData.pagination.total_items,
			},
		];

		return { staticCategory, dynamicCategory };
	} catch (error) {
		console.error(
			"Помилка при завантаженні категорій або нових надходжень:",
			error
		);
		return { staticCategory: [], dynamicCategory: [] };
	}
}

export default async () => {
	const { staticCategory, dynamicCategory } = await getData();

	return (
		<CategoriesPage categories={dynamicCategory} newArrivals={staticCategory} />
	);
};
