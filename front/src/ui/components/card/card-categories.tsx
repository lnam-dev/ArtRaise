import React from "react";
import Image from "next/image";

import ButtonArrow from "~/ui/components/button/button-arrow";

import type { TCategories } from "~/types/categories";
import { TButtonProps } from "~/types/button";

import "./card.scss";

interface CardPurchaseProps extends React.HTMLAttributes<HTMLElement> {
	card: TCategories;
	variant?: TButtonProps["variant"];
}

const CardCategories = ({
	card,
	variant = "dark",
	...props
}: CardPurchaseProps) => {
	return (
		<article className={`card card--light`} {...props}>
			<figure className={`image image--light group`}>
				<Image
					src={card.imageSrc}
					alt={card.imageAlternative}
					layout="responsive"
					width={16}
					height={9}
					className="object-cover"
				/>
			</figure>
			<div className={`wrapper wrapper--light`}>
				<div className={`description description--light`}>
					<h3 className={`title title--light`}>{card.title}</h3>
					<p className={`text-description text-description--light`}>
						{card.description}
					</p>
					<ButtonArrow href={"#"} className="w-full" variant={variant}>
						Переглянути
					</ButtonArrow>
				</div>
			</div>
		</article>
	);
};

export default React.memo(CardCategories);
