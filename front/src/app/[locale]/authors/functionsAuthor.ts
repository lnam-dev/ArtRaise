import {TArtPiece, TAuthor} from "~/types";

export const getStylesFromArtPieces = (artpieces:TArtPiece[]):string[] => {
    let tags:string[] = [];
    artpieces.forEach(arpiece => {
        if(tags.indexOf(arpiece.style)===-1) tags.unshift(arpiece.style)
    })
    tags.unshift("Всі")
    return tags;
}
export const getFirstLettersOfAuthorsName = (authors:TAuthor[]):string[] => {
    let letters:string[] = [];
    authors.forEach((author,index) => {
        if(letters.indexOf(author.fullname[0].toUpperCase()) === -1 ) letters.push(author.fullname[0].toUpperCase());
    })
    return letters.sort();
}
export const getMapOfLettersAuthors = (authors: TAuthor[], letters: string[]): Record<string, TAuthor[]> => {
    // Ініціалізуємо об'єкт з літерами як ключами та пустими масивами
    const map: Record<string, TAuthor[]> = letters.reduce((acc, letter) => {
        acc[letter] = [];
        return acc;
    }, {} as Record<string, TAuthor[]>);
    // Заповнюємо об'єкт авторами
    authors.forEach((author) => {
        const firstLetter = author.fullname[0].toUpperCase(); // Перша літера імені
        if (map[firstLetter]) {
            map[firstLetter].push(author);
        }
    });
    return map;
};