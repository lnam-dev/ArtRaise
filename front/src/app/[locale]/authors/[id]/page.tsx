import React from 'react';
import {TArtPiece, TAuthor} from "~/types";
import {TAuthorPage} from "~/use-cases/contracts/author-page";
import AuthorPage from "~/ui/pages/author-page/author-page";

const getData = async (auhtorId: number) => {
    const responseAuthor = await fetch(`${process.env.NEXT_PUBLIC_API_URL}authors/${auhtorId}`);
    const responseFamiliarAuthors = await fetch(`${process.env.NEXT_PUBLIC_API_URL}authors`);
    const responseAuthorArtpieces = await fetch(`${process.env.NEXT_PUBLIC_API_URL}authors/${auhtorId}/artpieces`);
    const familiarAuthors:TAuthor[] = await responseFamiliarAuthors.json();
    const authorArtpieces:TArtPiece[] = await responseAuthorArtpieces.json();
    const author: TAuthor = await responseAuthor.json();
    return {familiarAuthors, authorArtpieces, author};
}
const Page = async ({params}: { params: Promise<{ id: number }> }) => {
    const {id} = await params;
    const AuthorPageData:TAuthorPage = await getData(id);
    return (
        <AuthorPage {...AuthorPageData}/>
    );
};

export default Page;
