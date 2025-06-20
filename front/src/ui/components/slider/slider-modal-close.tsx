import Close from "~/assets/close.svg";
import { useModal } from "~/ui/hooks/useModal";

const SliderModalClose = ({ className = "" }) => {
	const { hideModal } = useModal();
	return (
		<button
			className={`all-unset z-999 p-4 bg-black-1000/60 ${className}`}
			onClick={hideModal}>
			<Close height="32" width="32" className="stroke-white" />
		</button>
	);
};
export default SliderModalClose;
