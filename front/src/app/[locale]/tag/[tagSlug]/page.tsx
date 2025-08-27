import React from 'react';
import {TArtPiece} from "~/types";
import CardPurchase from "~/ui/components/card/card-purchase";
import LinkBackTo from "~/ui/components/link/link-back-to";
import SegmentTitle from "~/ui/components/segment-title/segment-title";
import ArtpiecesTagMapper from "~/app/[locale]/tag/[tagSlug]/ArtpiecesTagMapper";

const getData = async (tagSlug: string): Promise<TArtPiece[]> => {
    try {
        const responseArtpieces = await fetch(`${process.env.NEXT_PUBLIC_API_URL}artpieces/?${tagSlug}`);
        if (!responseArtpieces.ok) return [];
        return await responseArtpieces.json();
    } catch (e: any) {
        console.log(e)
        return []
    }
}
const Page = async ({params}: { params: Promise<{ tagSlug: string }> }) => {
    const {tagSlug} = await params;
    const artpieces: TArtPiece[] = await getData(tagSlug);
    const isArrayEmpty = artpieces.length === 0;
    return (
        <div className={'mx-auto mobile-spacing pt-20 container md:px-4'}>
            <LinkBackTo path="/" className="mb-8">
                Назад
            </LinkBackTo>

            {!isArrayEmpty ?
                    <ArtpiecesTagMapper artpieces={artpieces}/>
                :
                <h1 className={'text-gray-950 response-text-8'}>Результатів не знайдено</h1>
            }
        </div>
    );
};

export default Page;
