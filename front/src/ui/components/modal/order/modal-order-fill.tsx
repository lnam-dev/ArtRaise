import { TArtPiece } from "~/types";
import CardPurchase from "../../card-purchase/card-purchase";
import ModalOrderFillForm from "./modal-order-fill-form";
import ModalButtonClose from "../modal-button-close";
import useDevice from "~/ui/hooks/useDevice/useDevice";

interface ModalFillOrderProps {
	artPiece: TArtPiece;
}

const ModalOrderFill: React.FC<ModalFillOrderProps> = ({ artPiece }) => {
	const { isMobile } = useDevice();
	return (
		<section
			role="dialog"
			aria-modal="true"
			aria-labelledby="modal-title"
			aria-describedby="modal-description"
			className="flex flex-row bg-white w-fit h-fit relative xl:max-w-[90vw] xl:max-h-[90vh]">
			<ModalButtonClose variable="light" />
			{!isMobile && (
				<div className="flex-grow-1 overflow-auto scrollbar-hide bg-black-1000">
					<CardPurchase card={artPiece} variable="modal" />
				</div>
			)}
			<div className="px-6 py-8 xl:p-8 flex-grow-2">
				<ModalOrderFillForm className="mb-9" />
			</div>
		</section>
	);
};
export default ModalOrderFill;
