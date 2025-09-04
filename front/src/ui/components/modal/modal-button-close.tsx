import Close from "~/assets/close.svg";
import { useModal } from "~/ui/hooks/useModal";
import "./modal.scss";

interface ModalButtonCloseProps {
	variable?: "light" | "dark";
}

const ModalButtonClose = ({ variable = "dark" }: ModalButtonCloseProps) => {
	const { hideModal } = useModal();
	return (
		<button onClick={hideModal} className={`button_close z-50`}>
			<Close
				className={`button_close__icon button_close__icon--${variable} h-6 w-6 xl:h-8 xl:w-8 `}
			/>
		</button>
	);
};

export default ModalButtonClose;
