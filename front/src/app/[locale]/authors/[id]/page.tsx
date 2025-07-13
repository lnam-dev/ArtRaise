import React from 'react';
import {TArtPiece, TAuthor} from "~/types";
import {TAuthorPage} from "~/use-cases/contracts/author-page";
import AuthorPage from "~/ui/pages/author-page/author-page";
import InternalServerErrorPage from "~/ui/pages/internal-server-error-page/internal-server-error-page";

const getData = async (auhtorId: number): Promise<TAuthorPage | string> => {
    try {
        const responseAuthor = await fetch(`${process.env.NEXT_PUBLIC_API_URL}authors/${auhtorId}`);
        const responseFamiliarAuthors = await fetch(`${process.env.NEXT_PUBLIC_API_URL}authors`);
        const responseAuthorArtpieces = await fetch(`${process.env.NEXT_PUBLIC_API_URL}authors/${auhtorId}/artpieces`);
        const familiarAuthors: TAuthor[] = await responseFamiliarAuthors.json();
        const authorArtpieces: TArtPiece[] = await responseAuthorArtpieces.json();
        const author: TAuthor = await responseAuthor.json();
        if(responseAuthor.ok && responseAuthor.ok && responseFamiliarAuthors.ok) return {familiarAuthors, authorArtpieces, author};
        return 'Не вдалось отримати даних'
    } catch (e: any) {
        if (typeof e === 'object' && 'message' in e && typeof e.message === 'string') {
            console.log(e);
            return e.message;
        }
        return 'Невідома помилка'
    }
}
const Page = async ({params}: { params: Promise<{ id: number }> }) => {
    const {id} = await params;
    const AuthorPageData: TAuthorPage | string = await getData(id);
    return (
        typeof AuthorPageData === 'string' ?
            <InternalServerErrorPage message={AuthorPageData}/>
            :
            <AuthorPage {...AuthorPageData}/>
    );
};

export default Page;
