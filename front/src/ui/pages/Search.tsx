"use client";

import { FilteredProducts } from "../components/search/filtered-products";
import { useAppContext } from "../app-context/provider";
import { ProductSlim } from "~/use-cases/contracts/Product";

import SearchBar from "../components/search-bar/search-bar";

export default ({ products }: { products: ProductSlim[] }) => {
	const { _t } = useAppContext();

	return (
		<div className="container mt-[200px] px-6 mx-auto w-full">
			{/* <SearchBar /> */}
			<h1 className="font-bold text-4xl mt-10">{_t("search.label")}</h1>
			{products.length > 0 ? (
				<div>
					<FilteredProducts products={products} />
				</div>
			) : (
				<div className="mt-10">{_t("search.noResults")}</div>
			)}
		</div>
	);
};
