"use client";

import React, { useMemo, useRef, useEffect } from "react";
import Script from "next/script";
import Link from "~/bridge/ui/Link";

import { useGSAP } from "@gsap/react";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import LinkTo from "~/assets/link-to.svg";

import { ProductPage as TProductPage } from "~/use-cases/contracts/product-page";
import { TAccordion } from "~/types/accordion";

import SliderWrapper from "./slider-wrapper";
import LinkBackTo from "~/ui/components/link/link-back-to";
import BreadcrumbsWrapper from "~/ui/components/breadcrumbs/breadcrumbs-wrapper";
import BreadcrumbsLink from "~/ui/components/breadcrumbs/breadcrumbs-link";
import Character from "~/ui/components/character/character";
import Accordion from "~/ui/components/accordion/accordion";
import PriceBar from "~/ui/components/price-bar/price-bar";
import CardPurchase from "~/ui/components/card/card-purchase";

gsap.registerPlugin(ScrollTrigger);
const MAX_SHIFT_GSAP = 50;

function ProductPage({ artPiece, ACCORDION_ITEMS }: TProductPage) {
	const sliderRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		if (!sliderRef.current || !contentRef.current) return;

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: sliderRef.current,
				start: "top top",
				end: "bottom top",
				scrub: true,
			},
		});

		tl.fromTo(
			contentRef.current,
			{ y: 0 },
			{ y: `-${MAX_SHIFT_GSAP}vh`, ease: "easeInOut" }
		);
	});

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
		<main className="container mx-auto">
			<Script
				id="faq-schema"
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
			/>
			<section
				className="relative pt-12 lg:pt-18 xl:pt-[5rem] max-h-[75vh]"
				ref={sliderRef}>
				<SliderWrapper artPiece={artPiece} />
			</section>
			<section
				className="relative z-10 mobile-spacing mt-20 bg-white h-full"
				ref={contentRef}>
				<div className="pt-6">
					<BreadcrumbsWrapper activeIndex={2} className="mb-3">
						<BreadcrumbsLink>Категорії</BreadcrumbsLink>
						<BreadcrumbsLink>Живопис</BreadcrumbsLink>
						<BreadcrumbsLink>{artPiece.title}</BreadcrumbsLink>
					</BreadcrumbsWrapper>
					<LinkBackTo path="/" className="mb-8">
						назад до Категорій
					</LinkBackTo>
				</div>
				<div className="grid grid-cols-1 gap-12 gap-y-0 lg:grid-cols-[6fr_3fr] lg:grid-rows-[auto_auto]">
					<article className="order-1 lg:order-none lg:col-start-1 mb-9 xl:mb-6">
						<h1 className="font-namu text-8 md:text-12 lg:text-14 xl:text-20 text-black leading-none mb-2 -ml-1">
							{artPiece.title}
						</h1>
						<Link
							to={`authors/${artPiece.author.id}`}
							className="flex gap-2 items-center">
							<h3 className="font-fixel font-medium leading-0 lg:font-normal text-4 md:text-5 lg:text-6 text-gray-950 ">
								{artPiece.author.fullname}
							</h3>
							<LinkTo className="inline-block fill-gray-950" />
						</Link>
					</article>
					<article className="order-3 mb-8 lg:col-start-1 lg:row-span-2 lg:mb-0 lg:order-none space-y-4">
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
					<aside className="order-2 lg:order-none lg:col-start-2 lg:row-start-1 flex flex-col justify-start w-full">
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
							<div className="columns-1 sm:columns-2 lg:columns-auto space-y-8">
								<CardPurchase card={artPiece} variable="dark" />
							</div>
						</div>
					</aside>
				</div>
			</section>
		</main>
	);
}

export default ProductPage;

// export default React.memo(ProductPage, (prevProps, nextProps) => {
// 	return (
// 		prevProps.artPiece.id === nextProps.artPiece.id &&
// 		prevProps.artPiece.price === nextProps.artPiece.price &&
// 		prevProps.artPiece.title === nextProps.artPiece.title
// 	);
// });
