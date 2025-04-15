import React from "react";
import Image from "next/image";
import LinkToAuthor from "~/assets/linkToAuthor.svg";
import { ArtDetails, Accordion } from "~/ui/components/art-details/art-details";
import Link from "~/bridge/ui/Link";
import Buy from "~/assets/buy.svg";
import LinkButton from "~/ui/components/card-purchase/link-button";
import { ProductPage as TProductPage } from "~/use-cases/contracts/product-page";
import { useAppContext } from "~/ui/app-context/provider";
import { useMemo } from "react";

function ProductPage({ data }: { data: TProductPage }) {
	const { artPiece, ACCORDION_ITEMS, ART_DETAIL_LABELS } = data;

	// Меморизуємо size, щоб уникнути перерахунку при кожному рендері
	const size = useMemo(() => {
		return `${artPiece.length_cm || "?"} см x ${artPiece.width_cm || "?"} см`;
	}, [artPiece.length_cm, artPiece.width_cm]);

	// Меморизуємо деталі твору мистецтва
	const artDetails = useMemo(() => {
		return [
			{ label: ART_DETAIL_LABELS.MATERIAL, value: artPiece.material },
			{ label: ART_DETAIL_LABELS.THEME, value: artPiece.theme },
			{ label: ART_DETAIL_LABELS.STYLE, value: artPiece.style },
			{ label: ART_DETAIL_LABELS.DATE, value: artPiece.creating_date },
			{ label: ART_DETAIL_LABELS.SIZE, value: size },
		];
	}, [
		artPiece.material,
		artPiece.theme,
		artPiece.style,
		artPiece.creating_date,
		size,
	]);

	const accordionItems = useMemo(() => {
		return [
			{ title: "Опис твору", content: artPiece.description },
			{ title: "Про автора", content: artPiece.author?.bio_text || "" },
			...ACCORDION_ITEMS,
		];
	}, [artPiece.description, artPiece.author?.bio_text]);

	const formattedPrice = useMemo(() => {
		return artPiece.price ? parseFloat(artPiece.price) : 0;
	}, [artPiece.price]);

	if (!artPiece) {
		return (
			<p className="container mt-24 mx-auto">
				Немає доступних творів мистецтва.
			</p>
		);
	}

	return (
		<main className="container flex flex-col mt-24 mx-auto gap-10">
			<article className="flex flex-col lg:col-span-3 gap-10">
				<figure className="w-full">
					<Image
						src={artPiece.image_artpiece}
						alt={`Art piece ${artPiece.title}`}
						width={800}
						height={400}
						priority
						className="w-full h-auto"
					/>
				</figure>

				<div className="grid lg:grid-cols-3 w-full gap-7">
					<section className="lg:col-span-2 lg:-mt-20 bg-white opacity-90">
						<header className="mb-7">
							<h1 className="font-namu 2xl:text-6xl xl:text-5xl lg:text-4xl">
								{artPiece.title || "Без назви"}
							</h1>
							<p className="flex items-center font-fixel font-medium 2xl:text-4xl xl:text-3xl lg:text-2xl">
								{artPiece.author?.fullname || "Невідомий автор"}{" "}
								{artPiece.author?.id && (
									<Link to={`/authors/${artPiece.author.id}`}>
										<LinkToAuthor className="ml-3" />
									</Link>
								)}
							</p>
						</header>

						<ArtDetails details={artDetails} />

						<Accordion accordionItems={accordionItems} />
					</section>

					<aside className="flex flex-col justify-start col-span-1 w-full">
						<div className="price-section">
							<p className="font-fixel 2xl:text-2xl lg:text-xl text-gray-700">
								Вартість картини
							</p>
							<p className="font-namu 2xl:text-6xl xl:text-5xl lg:text-4xl">
								₴{formattedPrice}
							</p>
							<button className="flex justify-center w-full gap-3 py-2 mt-4 font-fixel font-medium 2xl:text-2xl xl:text-xl text-gray-100 bg-gray-900">
								<Buy /> Придбати
							</button>
						</div>

						<section className="mt-7">
							<h2 className="w-4/5 mb-4 font-fixel font-medium 2xl:text-4xl xl:text-2xl lg:text-xl">
								Роботи інших авторів у схожій стилістиці
							</h2>

							<article className="flex flex-col">
								<figure className="w-full">
									<Image
										src={artPiece.image_artpiece}
										alt={`Art piece ${artPiece.title}`}
										width={300}
										height={200}
										className="w-full h-auto"
									/>
								</figure>

								<footer className="flex justify-between items-center px-4 py-2 bg-gray-900">
									<div className="flex flex-col space-y-2">
										<p className="font-fixel 2xl:text-xl text-gray-400">
											{artPiece.author?.fullname || "Невідомий автор"}
										</p>

										<div className="2xl:text-2xl">
											<p className="font-namu text-white">
												{artPiece.title || "Без назви"}
											</p>
											<p className="font-fixel text-gray-400">{size}</p>
										</div>

										<p className="font-fixel font-medium 2xl:text-2xl text-gray-100">
											₴{formattedPrice}
										</p>
									</div>
									<LinkButton href={artPiece.id}>Перейти до твору</LinkButton>
								</footer>
							</article>
						</section>
					</aside>
				</div>
			</article>
		</main>
	);
}

export default React.memo(ProductPage, (prevProps, nextProps) => {
	return (
		prevProps.data.artPiece.id === nextProps.data.artPiece.id &&
		prevProps.data.artPiece.price === nextProps.data.artPiece.price &&
		prevProps.data.artPiece.title === nextProps.data.artPiece.title
	);
});
