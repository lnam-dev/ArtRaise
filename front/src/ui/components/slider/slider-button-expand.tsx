import ArrowExpand from "~/assets/arrow-expand.svg";
import ModalFillOrder from "~/ui/components/modal/modal-fill-order";
import SliderModal from "./slider-modal";
import { useModal } from "~/ui/hooks/useModal";
import type { TSlide } from "~/types/slider";

interface SliderButtonExpandProps {
	className?: string;
	slides: TSlide[];
}

export default function SliderButtonExpand({
	className = "",
	slides,
}: SliderButtonExpandProps) {
	const { showModal } = useModal();

	const handleExpandButton = () => {
		showModal(<SliderModal slides={slides} />);
	};

	return (
		<div
			className={`flex bg-[#000212] shadow-sm bg-opacity-[64%] ${className}`}>
			<button className="all-unset p-3" onClick={handleExpandButton}>
				<ArrowExpand height="24" width="24" />
			</button>
		</div>
	);
}
