import React from "react";
import Image from "next/image";
import { TArtPiece } from "~/types";
import ButtonArrow from "~/ui/components/button/button-arrow";
import "./card-purchase.scss";
import Arrow from "~/assets/arrow-right.svg";
import CardHeart from "./card-heart";
import Link from "~/bridge/ui/Link";

interface CardPurchaseProps {
	card: TArtPiece;
	variable?: "light" | "dark" | "modal";
}

const CardPurchase = ({
	card,
	variable = "light",
	...props
}: CardPurchaseProps) => {
	const Tag = variable === "dark" ? Link : "div";
	const prop =
		variable === "dark" ? { href: `products/${Number(card.id)}` } : null;

	return (
		<article className={`card card--${variable}`} {...props}>
			<figure className={`image image--${variable} group`}>
				<Image
					src={card.image_artpiece}
					alt={card.title}
					layout="responsive"
					width={16}
					height={9}
					className="object-cover"
				/>
				{/* {!isLight && <CardHeart />} */}
			</figure>
			<Tag className={`wrapper wrapper--${variable}`} {...prop}>
				<div className={`description description--${variable}`}>
					<p className={`fullname fullname--${variable}`}>
						{card.author.fullname}
					</p>
					<h3 className={`title title--${variable}`}>
						{card.title}
						{card.creating_date != null && `, ${card.creating_date}`}
					</h3>
					<p className={`size size--${variable}`}>
						{`${parseInt(card.length_cm)} см × ${parseInt(card.width_cm)} см`}
					</p>
					<p
						className={`price price--${variable}`}
						aria-label={`Ціна: ${card.price} гривень`}>
						&#8372;{parseInt(card.price).toLocaleString("uk-UA")}
					</p>
					{variable === "light" && (
						<ButtonArrow
							href={`products/${Number(card.id)}`}
							className="w-full"
							variant="dark">
							Переглянути картину
						</ButtonArrow>
					)}
				</div>
				{variable === "dark" && (
					<Arrow height={48} width={48} className="fill-white" />
				)}
			</Tag>
		</article>
	);
};

export default React.memo(CardPurchase);
