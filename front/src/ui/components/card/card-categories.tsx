import React from "react";
import Image from "next/image";
import { kebabCase } from "lodash";

import ButtonArrow from "~/ui/components/button/button-arrow";

import type { TCategory } from "~/types/categories";
import { TButtonProps } from "~/types/button";

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
					src={card.image_url || "/default.png"}
					alt={card.label_en}
					layout="responsive"
					width={16}
					height={9}
					className="object-cover"
				/>
			</figure>
			<div className={`wrapper wrapper--light`}>
				<div className={`description description--light`}>
					<h3 className={`title title--light`}>{card.label_ua}</h3>
					<p className={`text-description text-description--light`}>
						{validationDescription}
					</p>
					<ButtonArrow
						href={isAvailable ? `categories/${kebabCase(card.label_en)}` : ""}
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
