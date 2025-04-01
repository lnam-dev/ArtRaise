import {TArtPiece} from "~/types";

export const getStylesFromArtPieces = (artpieces:TArtPiece[]):string[] => {
    let tags:string[] = [];
    artpieces.forEach(arpiece => {
        if(tags.indexOf(arpiece.style)===-1) tags.unshift(arpiece.style)
    })
    tags.unshift("Всі")
    return tags;
}