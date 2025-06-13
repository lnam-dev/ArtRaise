import React, {FC, useState} from 'react';
import {TArtPiece} from "~/types";
import {getStylesFromArtPieces} from "~/app/[locale]/authors/functionsAuthor";
import CardPurchase from "~/ui/components/card-purchase/card-purchase";
import TagsMenu from "~/app/[locale]/authors/[id]/AuthorArtpieces/TagsMenu";


type Props = {
    artpieces: TArtPiece[];
}
const AuthorArtpieces: FC<Props> = ({artpieces}) => {
    const filterArtTags = getStylesFromArtPieces(artpieces ?? []);
    const [selectedTag, setSelectedTag] = useState<string>(filterArtTags[0])
    const filteredArtPieces = selectedTag === filterArtTags[0] ?
        artpieces
        :
        artpieces.filter(artpiece => artpiece.style === selectedTag);
    return (
        <div>
            <TagsMenu tags={filterArtTags} onSelectTag={setSelectedTag}/>
            <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4 space-y-12 mt-20">
                    {filteredArtPieces.map((artpiece) => (
                        <CardPurchase key={artpiece.id} card={artpiece}/>
                    ))}
            </div>
        </div>
    );
};

export default AuthorArtpieces;