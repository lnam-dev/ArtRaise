import React from "react";
import { TAuthorPage } from "~/use-cases/contracts/author-page";
import { truncateText } from "~/functions/truncateText";
import AuthorArtpieces from "~/ui/pages/author-page/author-artpieces/AuthorArtpieces";
import SegmentTitle from "~/ui/components/segment-title/segment-title";
import AuthorCard from "~/ui/components/author-card/author-card";
import CallToActionSection from "~/ui/components/cta-section/cta-section";
import FamiliarAuthors from "~/ui/pages/author-page/FamiliarAuthors";
import MobileSectionAuthorPage from "~/ui/pages/author-page/MobileSectionAuthorPage";
import ImageWithFallback from "~/ui/components/imageWithFallback/image-with-fallback";

const AuthorPage: React.FC<TAuthorPage> = ({
	author,
	authorArtpieces,
	familiarAuthors,
}) => {
	familiarAuthors = familiarAuthors.slice(0, 5); //TODO тимчасово хардкодом обмежуємо
	return (
		<div className={"h-fit font-fixel px-4"}>
			<div
				className={
					"font-namu mt-20 grid grid-cols-4 gap-x-[1rem] w-full h-fit auto-rows-auto"
				}>
				<aside
					className={"flex flex-col w-full col-span-3 md:col-span-1 h-fit"}>
					<ImageWithFallback
						className="h-auto w-full object-cover max-h-[40vh] object-center"
						src={author.image_author}
						alt="Author"
						fallbackSrc={'/default.png'}
					/>
					<div
						className={
							"flex flex-col bottom-0 left-0 col-span-3 z-10 w-fit bg-white "
						}>
						<h1
							className={
								"flex font-bold text-8 w-fit md:text-10 md:text-nowrap"
							}>
							{author?.fullname}
						</h1>
						<h2 className={"w-full font-thin text-black/50"}>
							{author?.style}
						</h2>

						<div
							className={"font-thin text-black text-8 hidden md:block w-full"}>
							<h2 className={""}>Біографія</h2>
							<p className={"text-4 text-black/50"}>
								{truncateText(author?.bio_text, 100)}
							</p>
						</div>
					</div>
				</aside>
				<div className={"flex md:col-span-3 h-full max-h-full"}>
					<ImageWithFallback
						src={author.image_author}
						alt={"art photo"}
						fallbackSrc={'/default.png'}
						className={
							"object-cover w-full h-full md:col-span-3 max-h-[60vh]"
						}></ImageWithFallback>
				</div>
			</div>

			{/*mobile*/}
			<MobileSectionAuthorPage
				author={author}
				authorArtpieces={authorArtpieces}
			/>
			{/*desktop*/}
			<div className={`hidden w-full flex-col h-fit px-4 mt-20 md:flex`}>
				<SegmentTitle className={"w-full"}>Роботи автора</SegmentTitle>
				<AuthorArtpieces artpieces={authorArtpieces ?? []} />
			</div>
			{/*all*/}
			<SegmentTitle
				className={"mt-20"}
				link={{ to: "/authors", name: "Всі автори" }}>
				Схожі автори
			</SegmentTitle>
			<FamiliarAuthors
				familiarAuthors={familiarAuthors}
				className={
					"columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4 space-y-12 mt-10"
				}
			/>
			<CallToActionSection />
		</div>
	);
};

export default AuthorPage;
