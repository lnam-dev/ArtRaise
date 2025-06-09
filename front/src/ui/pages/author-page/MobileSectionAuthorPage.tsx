"use client"
import React, {useState} from 'react';
import AuthorArtpieces from "~/ui/pages/author-page/author-artpieces/AuthorArtpieces";
import {TAuthorPage} from "~/use-cases/contracts/author-page";
import QuickMenu from "~/ui/components/quick-menu/quick-menu";

type Props = Pick<TAuthorPage,"author"|"authorArtpieces">
enum SelectedInfo {
    Biography = "Біографія",
    AuthorArtPieces = "Роботи",
}

const MobileSectionAuthorPage: React.FC<Props> = ({authorArtpieces,author}) => {
    const [selectedInfo, setSelectedInfo] = useState<SelectedInfo>(
        SelectedInfo.AuthorArtPieces
    );
  return (
      <div
        className={`grid grid-cols-4 gap-x-[1rem] w-full h-fit mt-20 md:hidden`}>
        <div className={`flex flex-col col-span-full items-center w-full`}>
            <QuickMenu
                variants={["Роботи", "Біографія"]}
                onSelect={(selectedVariant) => setSelectedInfo(selectedVariant as SelectedInfo)}
            />
            {selectedInfo === SelectedInfo.Biography ? (
                <p className={"py-8 font-light text-black/70"}>
                    {author?.bio_text}
                </p>
            ) : (
                <AuthorArtpieces artpieces={authorArtpieces ?? []}/>
            )}
        </div>
    </div>
  );
};

export default MobileSectionAuthorPage;
