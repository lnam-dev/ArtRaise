import Close from "~/assets/close.svg";
import { useModal } from "~/ui/hooks/useModal";
import "./modal.scss";

interface ModalButtonCloseProps {
	variable?: "light" | "dark";
}

const ModalButtonClose = ({ variable = "dark" }: ModalButtonCloseProps) => {
	const { hideModal } = useModal();
	return (
		<button onClick={hideModal} className={`button_close`}>
			<Close
				height={32}
				width={32}
				className={`button_close__icon button_close__icon--${variable}`}
			/>
		</button>
	);
};

export default ModalButtonClose;
