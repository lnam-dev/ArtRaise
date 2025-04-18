"use client";
import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { TArtPiece, TAuthor } from "~/types";
// import QuickMenu from "~/ui/components/quick-menu/quick-menu";
// import {useQuickMenu} from "~/ui/components/quick-menu/useQuickMenu";
import { truncateText } from "~/functions/truncateText";
import FilterTag from "~/ui/components/filter-tag/filter-tag";
import AuthorArtpieces from "~/app/[langstore]/authors/[id]/AuthorArtpieces/AuthorArtpieces";
import SegmentTitle from "~/ui/components/segment-title/segment-title";
import CallToActionSection from "~/ui/components/cta-section/cta-section";
import AuthorCard from "~/ui/components/author-card/author-card";

enum SelectedInfo {
	Biography = "Біографія",
	AuthorArtPieces = "Роботи",
}

const tempPhotoArdSrc =
	"https://i.pinimg.com/736x/f9/84/1a/f9841acfb5a3187087560caf09147d42.jpg";
const Home = ({ params }: { params: Promise<{ id: string }> }) => {
	console.log("params", params);
	const { id } = use(params);
	const [author, setAuthor] = useState<TAuthor>();
	const [artpieces, setArtpieces] = useState<TArtPiece[]>();
	const [familiarArtists, setFamiliarArtists] = useState<TAuthor[]>([]);
	const [selectedInfo, setSelectedInfo] = useState<SelectedInfo>(
		SelectedInfo.AuthorArtPieces
	);
	useEffect(() => {
		async function fetchData(id: string) {
			const responseAuthor = await axios.get(
				`http://localhost:8000/api/authors/${id}`
			);
			const authors = await axios.get(`http://localhost:8000/api/authors`);
			const responseArtpiece = await axios.get(
				`http://localhost:8000/api/authors/${id}/artpieces`
			);
			const authorData: TAuthor = responseAuthor.data;
			authorData.image_author = `http://localhost:8000${authorData.image_author}`;
			setFamiliarArtists(
				authors.data.filter((author: TAuthor) => author.id !== authorData.id)
			);
			let artpieces: TArtPiece[] = responseArtpiece.data;
			artpieces = artpieces.map((piece) => ({
				...piece,
				image_artpiece: `http://localhost:8000${piece.image_artpiece}`,
			}));
			artpieces = artpieces.filter(
				(piece) => piece.author.id === authorData.id
			);
			setAuthor(responseAuthor.data);
			setArtpieces(artpieces);
		}

		fetchData(id);
	}, []);
	return (
		<div className={"h-fit font-fixel px-4"}>
			<div
				className={
					"font-namu mt-20 grid grid-cols-4 gap-x-[1rem] w-full h-fit auto-rows-auto"
				}>
				<aside
					className={"flex flex-col w-full col-span-3 md:col-span-1 h-fit"}>
					<img
						className="h-auto w-full object-cover max-h-[40vh] object-center"
						src={author?.image_author}
						alt="imageAuthor"
					/>
					<div
						className={
							"flex flex-col bottom-0 left-0 col-span-3 z-10 w-fit bg-white px-4"
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
					<img
						src={tempPhotoArdSrc}
						alt={"art photo"}
						className={
							"object-cover w-full h-full md:col-span-3 max-h-[60vh]"
						}></img>
				</div>
			</div>

			{/*mobile*/}
			<div
				className={`grid grid-cols-4 gap-x-[1rem] w-full h-fit mt-20 md:hidden`}>
				<div className={`flex flex-col col-span-full items-center w-full`}>
					{/* <QuickMenu
                        variants={["Роботи", "Біографія"]}
                        onSelect={(selectedVariant) => setSelectedInfo(selectedVariant as SelectedInfo)}
                    /> */}
					{selectedInfo === SelectedInfo.Biography ? (
						<p className={"py-8 font-light text-black/70"}>
							{author?.bio_text}
						</p>
					) : (
						<AuthorArtpieces artpieces={artpieces ?? []} />
					)}
				</div>
			</div>
			{/*desktop*/}
			<div className={`hidden w-full flex-col h-fit px-4 mt-20 md:flex`}>
				<SegmentTitle className={"w-full"}>Роботи автора</SegmentTitle>
				<AuthorArtpieces artpieces={artpieces ?? []} />
			</div>
			{/*all*/}
			<SegmentTitle
				className={"mt-20"}
				link={{ to: "/en/authors", name: "Всі автори" }}>
				Схожі автори
			</SegmentTitle>
			<div className="columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4 space-y-12 mt-10">
				{familiarArtists.map((artist, index) => (
					<AuthorCard author={artist} key={index} />
				))}
			</div>
			<CallToActionSection />
		</div>
	);
};

export default Home;
