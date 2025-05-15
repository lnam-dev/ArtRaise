import React, {FC} from "react";
import AuthorsFilterMenu from "~/ui/components/authors/authors-filtermenu/AuthorsFilterMenu";
import {TAuthorsPage} from "~/use-cases/contracts/authors-page";
import AuthorsMapper from "~/ui/pages/authors-page/authors-mapper";
import LinkBackTo from "~/ui/components/link/link-back-to";


const AuthorsPage: FC<TAuthorsPage> = ({authors}) => {
    return (
        <div
            className={
                "font-namu mt-16 grid grid-cols-4 gap-x-[1rem] w-full h-fit auto-rows-auto px-[3vw]"
            }>
            <div className={"col-span-full"}>
                <LinkBackTo path="/" className="mb-8">
                    назад до Головної
                </LinkBackTo>
                <AuthorsFilterMenu/>
                <AuthorsMapper authors ={authors}/>
            </div>
        </div>
    );
};

export default AuthorsPage;