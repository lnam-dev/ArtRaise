import { CategoriesPage as TCategoriesPage } from "~/use-cases/contracts/categories-page";

import CategoriesSearchWrapper from "./search/categories-search-wrapper";
import CardCategories from "~/ui/components/card/card-categories";

const CategoriesPage = ({ newArrivals, categories }: TCategoriesPage) => {
	return (
		<main className="container mx-auto mt-14 lg:mt-18 xl:mt-[5rem] mobile-spacing">
			<div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between mb-5 xl:mb-8">
				<h1 className="font-namu font-medium text-6 xl:text-8 text-black leading-none ">
					Категорії
				</h1>
				<CategoriesSearchWrapper />
			</div>
			<section className="columns-1 gap-6 sm:columns-2 xl:columns-4">
				<CardCategories
					card={newArrivals}
					variant="disabled"
					className="w-full xl:break-after-column sticky top-[5rem] "
				/>
				{categories.map((category) => (
					<CardCategories
						key={category.title}
						card={category}
						className="mb-12"
					/>
				))}
			</section>
		</main>
	);
};

export default CategoriesPage;
