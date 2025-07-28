import { capitalize } from "lodash";

import { CategoryPage as TCategoryPage } from "~/use-cases/contracts/category-page";

import BreadcrumbsLink from "~/ui/components/breadcrumbs/breadcrumbs-link";
import BreadcrumbsWrapper from "~/ui/components/breadcrumbs/breadcrumbs-wrapper";
import LinkBackTo from "~/ui/components/link/link-back-to";
import CardPurchase from "~/ui/components/card/card-purchase";

const CategoryPage = ({ category, artPieces }: TCategoryPage) => {
	return (
		<main className="container mx-auto mt-14 lg:mt-18 xl:mt-[5rem] mobile-spacing">
			<div>
				<BreadcrumbsWrapper activeIndex={2} className="mb-3">
					<BreadcrumbsLink to="/categories">Категорії</BreadcrumbsLink>
					<BreadcrumbsLink>{capitalize(category)}</BreadcrumbsLink>
				</BreadcrumbsWrapper>
				<LinkBackTo path="/" className="mb-6">
					Назад
				</LinkBackTo>
			</div>
			<h1 className="font-namu font-medium text-6 xl:text-8 text-black leading-none mb-8">
				{capitalize(category)}
			</h1>
			<section className="columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4 space-y-12">
				{artPieces.map((obj) => (
					<CardPurchase key={obj.id} card={obj} />
				))}
			</section>
		</main>
	);
};

export default CategoryPage;
