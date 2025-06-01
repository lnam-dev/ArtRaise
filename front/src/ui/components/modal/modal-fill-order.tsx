import { TArtPiece } from "~/types";
import CardPurchase from "../card-purchase/card-purchase";
import ModalFillOrderForm from "./modal-fill-order-form";

interface ModalFillOrderProps {
	artPiece: TArtPiece;
}

const ModalFillOrder: React.FC<ModalFillOrderProps> = ({ artPiece }) => {
	return (
		<section
			role="dialog"
			aria-modal="true"
			aria-labelledby="modal-title"
			aria-describedby="modal-description"
			className="flex flex-row bg-white">
			<div className="flex flex-row h-[50%]">
				<CardPurchase card={artPiece} variable="dark" includeButton={false} />
			</div>
			<div className="p-8">
				<ModalFillOrderForm className="mb-9" />
			</div>
		</section>
	);
};
export default ModalFillOrder;
