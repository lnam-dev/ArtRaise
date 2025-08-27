'use client'
import React, {useState} from 'react';
import SegmentTitle from "~/ui/components/segment-title/segment-title";
import CardPurchase from "~/ui/components/card/card-purchase";
import {TArtPiece} from "~/types";

interface Props {
    artpieces: TArtPiece[]
}

const ArtpiecesTagMapper: React.FC<Props> = ({artpieces}) => {
    const [numbOfDisplayed, setNumbOfDisplayed] = useState<number>(10)
    const canLoadMore = artpieces.length > numbOfDisplayed
    return (
        <>
            <SegmentTitle className={'mb-10'}>{'Знайдені результати'}</SegmentTitle>
            <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4 space-y-12">
                {artpieces.slice(0,numbOfDisplayed).map((obj) => (
                    <CardPurchase key={obj.id} card={obj}/>
                ))}
            </div>
            {canLoadMore && <p className={'w-full text-center response-text-6 py-5'} onClick={()=> setNumbOfDisplayed(numbOfDisplayed + 10)}>Завантажити ще...</p>}
        </>
    );
};

export default ArtpiecesTagMapper;
