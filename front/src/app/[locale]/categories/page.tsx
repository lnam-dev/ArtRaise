import CategoriesPage from "~/ui/pages/categories-page/categories-page";

const NEW_ARRIVALS = {
	imageSrc: "/default.png",
	imageAlternative: "Image description",
	title: "Нові надходження",
	description: "+24 роботи",
};

const CATEGORIES = [
	{
		imageSrc: "/default.png",
		imageAlternative: "Image description",
		title: "Живопис",
		description: "234 роботи",
	},
	{
		imageSrc: "/default.png",
		imageAlternative: "Image description",
		title: "Графіка",
		description: "157 робіт",
	},
	{
		imageSrc: "/default.png",
		imageAlternative: "Image description",
		title: "Скульптура",
		description: "89 робіт",
	},
	{
		imageSrc: "/default.png",
		imageAlternative: "Image description",
		title: "Фотографія",
		description: "312 робіт",
	},
	{
		imageSrc: "/default.png",
		imageAlternative: "Image description",
		title: "Цифрове мистецтво",
		description: "201 робота",
	},
	{
		imageSrc: "/default.png",
		imageAlternative: "Image description",
		title: "Ілюстрація",
		description: "145 робіт",
	},
	{
		imageSrc: "/default.png",
		imageAlternative: "Image description",
		title: "Кераміка",
		description: "67 робіт",
	},
	{
		imageSrc: "/default.png",
		imageAlternative: "Image description",
		title: "Мозаїка",
		description: "48 робіт",
	},
	{
		imageSrc: "/default.png",
		imageAlternative: "Image description",
		title: "Текстиль",
		description: "93 роботи",
	},
];

export const revalidate = 21600;
export const dynamic = "force-dynamic";

export default async () => {
	return <CategoriesPage newArrivals={NEW_ARRIVALS} categories={CATEGORIES} />;
};
