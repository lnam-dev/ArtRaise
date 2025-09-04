import ArrowExpand from "~/assets/arrow-expand.svg";
import SliderModal from "./slider-modal";

import { useModal } from "~/ui/hooks/useModal";

import type { TSliderItem } from "~/types/slider";
import type { TArtPiece } from "~/types";

interface SliderButtonExpandProps {
	className?: string;
	orientation?: TArtPiece["orientation"];
	initialSlide?: number;
	slides: TSliderItem[];
}

export default function SliderButtonExpand({
	className = "",
	orientation,
	initialSlide,
	slides,
}: SliderButtonExpandProps) {
	const { showModal } = useModal();

	const handleExpandButton = () => {
		showModal(
			<SliderModal
				initialSlide={initialSlide}
				slides={slides}
				orientation={orientation}
			/>
		);
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
