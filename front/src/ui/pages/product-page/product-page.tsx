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
import CardPurchase from "~/ui/components/card/card-purchase";
import "~/styles/bg-light.css";

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
		<main className="container mx-auto mt-14 lg:mt-18 xl:mt-[5rem]">
			<Script
				id="faq-schema"
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
			/>
			<section className="mb-10 lg:mb-6">
				<BreadcrumbsWrapper activeIndex={2} className="mb-3 mobile-spacing">
					<BreadcrumbsLink>Категорії</BreadcrumbsLink>
					<BreadcrumbsLink>Живопис</BreadcrumbsLink>
					<BreadcrumbsLink>{artPiece.title}</BreadcrumbsLink>
				</BreadcrumbsWrapper>
				<LinkBackTo path="/" className="mb-8 mobile-spacing">
					назад до Категорій
				</LinkBackTo>
				<SliderWrapper artPiece={artPiece} />
			</section>
			<div className="grid grid-cols-1 gap-12 gap-y-0 lg:grid-cols-[5fr_3fr] mobile-spacing">
				<article className="order-2 mb-8 lg:row-span-2 lg:mb-0 lg:order-none space-y-4">
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
				<aside className="order-1 lg:order-none flex flex-col justify-start col-sp w-full">
					<PriceBar
						title="Вартість картини"
						artPiece={artPiece}
						className="mb-8 xl:mb-[4rem]"
					/>
				</aside>
				<aside className="order-3 lg:order-none lg:col-start-2">
					<div>
						<h2 className="font-fixel font-medium tracking-[-0.04rem] text-left text-6 xl:text-8 mb-4">
							Роботи інших авторів у схожій стилістиці
						</h2>
						<div className="space-y-8">
							<CardPurchase card={artPiece} variable="dark" />
						</div>
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
