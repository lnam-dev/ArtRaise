import { TCategory } from "~/types/categories";
import { CategoriesPage as TCategoriesPage } from "~/use-cases/contracts/categories-page";
import CategoriesPage from "~/ui/pages/categories-page/categories-page";

const NEW_ARRIVALS: TCategory[] = [
	{
		image_url: "/default.png",
		value: "New Arrivals",
		label_en: "New Arrivals",
		label_ua: "Нові надходження",
		count: 24,
		is_available: true,
	},
];

export const revalidate = 21600;
export const dynamic = "force-dynamic";

async function getData(): Promise<TCategory[]> {
	try {
		const response = await fetch(`${process.env.API_URL}artpieces/categories/`);
		if (!response.ok) {
			throw new Error(`Failed to fetch categories: ${response.status}`);
		}
		const { categories }: { categories: TCategory[] } = await response.json();
		return categories;
	} catch (error) {
		console.error(`Помилка при завантаженні категорій: ${error}`);
		return [];
	}
}

export default async () => {
	const categories = await getData();
	return <CategoriesPage newArrivals={NEW_ARRIVALS} categories={categories} />;
};
