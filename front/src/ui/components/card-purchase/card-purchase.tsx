import React from "react";
import Image from "next/image";
import { TArtPiece } from "~/types";
import Button from "~/ui/components/button/button";
import classes from "./card-purchase.module.scss";
import Arrow from "~/assets/arrow-right.svg";
import Link from "~/bridge/ui/Link";

interface CardPurchaseProps {
	card: TArtPiece;
	variable?: "light" | "dark";
}

const CardPurchase = ({
	card,
	variable = "light",
	...props
}: CardPurchaseProps) => {
	const isLight = variable === "light";
	const Tag = isLight ? "div" : Link;
	const prop = !isLight ? { href: `products/${Number(card.id)}` } : null;
	return (
		<article
			className={isLight ? classes.card_light : classes.card_dark}
			{...props}>
			<figure className="relative w-full aspect-[16/9]">
				<Image
					src={card.image_artpiece ?? process.env.DEFAULT_IMAGE}
					alt={card.title}
					layout="responsive"
					width={16}
					height={9}
					className="object-cover"
				/>
			</figure>
			<Tag
				className={isLight ? classes.wrapper_light : classes.wrapper_dark}
				{...prop}>
				<div className="flex-1">
					<p
						className={
							isLight ? classes.fullname_light : classes.fullname_dark
						}>
						{card.author.fullname}
					</p>
					<h3 className={isLight ? classes.title : classes.title_dark}>
						{card.title}
					</h3>
					<p className={isLight ? classes.size_light : classes.size_dark}>
						{`${card.length_cm} см x ${card.width_cm} см`}
					</p>
					<p
						className={isLight ? classes.price_light : classes.price_dark}
						aria-label={`Ціна: ${card.price} гривень`}>
						&#8372;{card.price}
					</p>
					{isLight && (
						<Button
							href={`products/${Number(card.id)}`}
							className="w-full"
							variant="solid">
							Переглянути картину
						</Button>
					)}
				</div>
				{!isLight && <Arrow height={48} width={48} className="fill-white" />}
			</Tag>
		</article>
	);
};

export default React.memo(CardPurchase);
