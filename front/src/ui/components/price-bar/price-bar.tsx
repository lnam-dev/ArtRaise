"use client";
import Buy from "~/assets/buy.svg";
import Button from "../button/button";
import { TArtPiece } from "~/types";
import { useModal } from "~/ui/hooks/useModal";
import ModalOrderFill from "~/ui/components/modal/order/modal-order-fill";

interface PriceBarProps extends React.HTMLAttributes<HTMLElement> {
	title: string;
	artPiece: TArtPiece;
	href?: string;
}

const PriceBar = ({ title, artPiece, href, ...props }: PriceBarProps) => {
	const { showModal } = useModal();

	const handlePurchaseButton = () => {
		showModal(<ModalOrderFill artPiece={artPiece} />);
	};

	return (
		<div {...props}>
			<h4 className="font-fixel font-normal text-4 text-gray-700">{title}</h4>
			<p className="font-namu text-8  xl:text-12 leading-none mb-6">{`₴${parseInt(
				artPiece.price
			).toLocaleString("uk-UA")}`}</p>
			<Button href={href} className="w-full" onClick={handlePurchaseButton}>
				<Buy width={24} height={24} />
				<span>Придбати</span>
			</Button>
		</div>
	);
};

export default PriceBar;
