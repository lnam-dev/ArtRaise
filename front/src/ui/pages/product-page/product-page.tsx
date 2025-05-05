import React, { useMemo } from "react";
import { ProductPage as TProductPage } from "~/use-cases/contracts/product-page";
import { TAccordion } from "~/types/accordion";
import SliderWrapper from "./card-wrapper";
import LinkBackTo from "~/ui/components/link/link-back-to";
import BreadcrumbsWrapper from "~/ui/components/breadcrumbs/breadcrumbs-wrapper";
import BreadcrumbsLink from "~/ui/components/breadcrumbs/breadcrumbs-link";
import Character from "~/ui/components/character/character";
import Script from "next/script";
import Accordion from "~/ui/components/accordion/accordion";
import PriceBar from "~/ui/components/price-bar/price-bar";
import CardPurchase from "~/ui/components/card-purchase/card-purchase";

function ProductPage({ artPiece, ACCORDION_ITEMS }: TProductPage) {
	const size = useMemo(() => {
		const length = parseInt(artPiece.length_cm);
		const width = parseInt(artPiece.width_cm);

		if (length && width) {
			return `${length} см × ${width} см`;
		}

		if (length) {
			return `${length} см`;
		}

		return "";
	}, [artPiece.length_cm, artPiece.width_cm]);

	const accordionItems: TAccordion[] = useMemo(() => {
		return [
			{ title: "Опис твору", content: artPiece.description },
			{ title: "Про автора", content: artPiece.author?.bio_text || "" },
			...ACCORDION_ITEMS,
		];
	}, [artPiece.description, artPiece.author?.bio_text]);

	const slides = [
		{
			imgSrc: artPiece.image_artpiece,
			title: artPiece.title,
		},
	];

	const schema = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: accordionItems.map(({ title, content }) => ({
			"@type": "Question",
			name: title,
			acceptedAnswer: { "@type": "Answer", text: content },
		})),
	};

	return (
		<main className="container mx-auto mt-14 xl:mt-[5rem]">
			<Script
				id="faq-schema"
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
			/>
			<section className="mb-6">
				<BreadcrumbsWrapper activeIndex={2} className="mb-3">
					<BreadcrumbsLink>Категорії</BreadcrumbsLink>
					<BreadcrumbsLink>Живопис</BreadcrumbsLink>
					<BreadcrumbsLink>{artPiece.title}</BreadcrumbsLink>
				</BreadcrumbsWrapper>
				<LinkBackTo path="/" className="mb-8">
					назад до Категорій
				</LinkBackTo>
				<SliderWrapper slides={slides} author={artPiece.author} />
			</section>
			<div className="grid grid-cols-[5fr_3fr] gap-12 mobile-spacing">
				<article className="space-y-4">
					<Character title="Матеріал" value={artPiece.material} />
					<Character title="Тема" value={artPiece.theme} />
					<Character title="Стиль" value={artPiece.style} />
					<Character title="Дата створення" value={artPiece.creating_date} />
					<Character title="Розмір" value={size} />

					{accordionItems.map(({ title, content }) => (
						<Accordion key={title} title={title} size="bg">
							{content}
						</Accordion>
					))}
				</article>
				<aside className="flex flex-col justify-start col-span-1 w-full">
					<PriceBar
						title="Вартість картини"
						price={artPiece.price}
						className="mb-[4rem]"
					/>
					<div className="space-y-8">
						<h2 className="font-fixel font-medium tracking-[-0.04rem] text-left text-6 xl:text-8 mb-4">
							Роботи інших авторів у схожій стилістиці
						</h2>
						<CardPurchase card={artPiece} variable="dark" />
						<CardPurchase card={artPiece} variable="dark" />
					</div>
				</aside>
			</div>
		</main>
	);
}

export default React.memo(ProductPage, (prevProps, nextProps) => {
	return (
		prevProps.artPiece.id === nextProps.artPiece.id &&
		prevProps.artPiece.price === nextProps.artPiece.price &&
		prevProps.artPiece.title === nextProps.artPiece.title
	);
});
