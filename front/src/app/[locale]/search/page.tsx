"use client";
import React from "react";
import BreadcrumbsLink from "~/ui/components/breadcrumbs/breadcrumbs-link";
import BreadcrumbsWrapper from "~/ui/components/breadcrumbs/breadcrumbs-wrapper";
import SearchPageInput from "~/ui/pages/search-page/search-page-input";
import FilterMenu from "~/ui/pages/search-page/filter-menu";
import SegmentTitle from "~/ui/components/segment-title/segment-title";
import LinkBackTo from "~/ui/components/link/link-back-to";
import { useAppSelector } from "~/store/client/hooks";
import MobileFilterNavigation from "~/ui/pages/search-page/mobile-filter-navigation";
import { SearchPagination } from "~/app/[locale]/search/SearchPagination";
import CardPurchase from "~/ui/components/card/card-purchase";

export default function Page() {
	const searchPageState = useAppSelector((state) => state.searchPageReducer);
	const { artpieces } = searchPageState;
	const isArtpiecesNotEmpty = searchPageState.artpieces.length !== 0;
	return (
		<div
			className={
				"font-namu mt-16 grid grid-cols-4 gap-x-[3rem] w-full h-fit auto-rows-auto px-[3vw]"
			}>
			<BreadcrumbsWrapper activeIndex={2} className="col-span-full mt-9 pl-0">
				<BreadcrumbsLink>Головна</BreadcrumbsLink>
				<BreadcrumbsLink>Пошук</BreadcrumbsLink>
			</BreadcrumbsWrapper>
			<LinkBackTo path="/" className="mt-4 pl-10 opacity-70">
				до головної
			</LinkBackTo>
			<SearchPageInput className={"col-span-full pl-0 my-4"} />
			{/*<FilterMapper className={"col-span-full"}/>*/}
			<MobileFilterNavigation className={`md:hidden col-span-full`} />
			<aside className={"py-2 hidden md:block"}>
				{/*<Button className={"w-full my-3 text-nowrap"}*/}
				{/*        onClick={() => }>{`Застосувати фільтр ( ${searchPageState.pagination.total_items} )`}</Button>*/}
				<FilterMenu />
			</aside>
			<main className={"md:col-start-2 md:col-end-[-1] col-span-full"}>
				{
					<div
						className={
							"grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pb-5 columns-3"
						}>
						<SegmentTitle className={"col-span-full"}>{"Роботи"}</SegmentTitle>
						<div
							className={
								"columns-1 md:columns-2 lg:columns-3 col-span-full space-y-12 mt-10"
							}>
							{isArtpiecesNotEmpty ? (
								artpieces.map((a) => <CardPurchase key={a.id} card={a} />)
							) : (
								<p className={"md:text-6 col-span-full"}>
									Результатів із заданими фільтрами не знайдено
								</p>
							)}
						</div>
					</div>
				}
				<SearchPagination />
			</main>
		</div>
	);
}
