import React from 'react';
import BreadcrumbsLink from "~/ui/components/breadcrumbs/breadcrumbs-link";
import BreadcrumbsWrapper from "~/ui/components/breadcrumbs/breadcrumbs-wrapper";
import SearchPageInput from "~/ui/pages/search-page/search-page-input";
import {TArtPiece} from "~/types";
import CardPurchase from "~/ui/components/card-purchase/card-purchase";
import FilterMenu from "~/ui/pages/search-page/filter-menu";
import SegmentTitle from "~/ui/components/segment-title/segment-title";
import MobileFilterNavigation from "~/ui/pages/search-page/mobile-filter-navigation";
import FilterMapper from "~/ui/pages/search-page/filter-mapper";
import LinkBackTo from "~/ui/components/link/link-back-to";

const getArtpiecesByQueryParams = async (queryParams: string): Promise<TArtPiece[]> => {
    try {

        const response = await fetch(`${process.env.API_URL}artpieces/?${queryParams}`);
        if (!response.ok) {
            return [];
        }
        const artPieces = await response.json();
        return artPieces;
    } catch (error) {
        console.log(error)
        return []
    }
}
export default async function Page({searchParams}: { searchParams: Promise<Record<string, string | undefined>> }) {
    const params = await searchParams
    const queryParams = new URLSearchParams(params as Record<string, string>).toString()
    const artpieces = await getArtpiecesByQueryParams(queryParams);
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
            <SearchPageInput className={"col-span-full pl-0 my-4"}/>
            <FilterMapper className={"col-span-full"}/>
            <MobileFilterNavigation className={`md:hidden col-span-full`}/>
            <FilterMenu className={"py-2 hidden md:block"}/>
            <main className={"md:col-start-2 md:col-end-[-1] col-span-full"}>
                {
                    <div className={"grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pb-5 columns-3"}>
                        <SegmentTitle className={"col-span-full"}>{"Роботи"}</SegmentTitle>
                        <div className={"columns-1 md:columns-2 lg:columns-3 col-span-full space-y-12 mt-10"}>

                            {
                                artpieces.length > 0 ?
                                    artpieces.map((a) => <CardPurchase key={a.id} card={a}/>)
                                    :
                                    <p className={"md:text-6 col-span-full"}>Результатів із заданими фільтрами не
                                        знайдено</p>
                            }
                        </div>
                    </div>
                }
            </main>


        </div>
    );
};

