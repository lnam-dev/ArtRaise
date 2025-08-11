import React from "react";
import Image from "next/image";

import imageFallback from "~/utils/image-fallback";
import type { TCategory } from "~/types/categories";

import { TButtonProps } from "~/types/button";

import ButtonArrow from "~/ui/components/button/button-arrow";

import "./card.scss";

interface CardPurchaseProps extends React.HTMLAttributes<HTMLElement> {
	card: TCategory;
	variant?: TButtonProps["variant"];
}

const CardCategories = ({
	card,
	variant = "dark",
	...props
}: CardPurchaseProps) => {
	const validationDescription = (() => {
		switch (card.count) {
			case 0:
				return "Немає робіт";
			case 1:
				return "1 робота";
			default:
				return `${card.count} робіт`;
		}
	})();

	const isAvailable = card.count > 0 && true;

	return (
		<article className={`card card--light`} {...props}>
			<figure className={`image image--light group`}>
				<Image
					src={imageFallback(card.image_url)}
					alt={card.description}
					layout="responsive"
					width={16}
					height={9}
					className="object-cover"
				/>
			</figure>
			<div className={`wrapper wrapper--light`}>
				<div className={`description description--light`}>
					<h3 className={`title title--light`}>{card.name_ua}</h3>
					<p className={`text-description text-description--light`}>
						{validationDescription}
					</p>
					<ButtonArrow
						ca
						href={isAvailable ? `categories/${card.slug}` : ""}
						className="w-full"
						variant={isAvailable ? variant : "disabled"}>
						Переглянути
					</ButtonArrow>
				</div>
			</div>
		</article>
	);
};

export default React.memo(CardCategories);
