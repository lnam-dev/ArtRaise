import Image from "next/image";
import LinkButton from "./link-button";
import { TArtPiece } from "~/types";

interface CardPurchaseProps {
	card: TArtPiece;
}

export default function CardPurchase({ card, ...props }: CardPurchaseProps) {
	return (
		<article className="break-inside-avoid" {...props}>
			<figure>
				<Image
					src={card.image_artpiece ?? "/default.png"}
					alt={card.title} // Додано описовий alt
					layout="responsive"
					width={16}
					height={9}
					className="object-cover mb-2"
				/>
			</figure>
			<p className="font-fixel font-normal text-5 mb-1">
				{card.author.fullname}
			</p>
			<h3 className="font-fixel font-medium text-5 mb-1">{card.title}</h3>
			<p className="font-fixel font-normal text-4 text-gray-700 mb-6">
				{`${card.length_cm} см x ${card.width_cm} см`}
			</p>
			<p
				className="font-fixel font-medium text-5 mb-6"
				aria-label={`Ціна: ${card.price} гривень`}>
				&#8372;{card.price}
			</p>
			<LinkButton cardId={Number(card.id)} className="w-full" type="solid">
				Переглянути картину
			</LinkButton>
		</article>
	);
}
