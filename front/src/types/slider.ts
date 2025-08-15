import { SwiperOptions } from "swiper/types";
import { TArtPiece } from "./art";

export type TSlide = {
	image_url: string;
	title: string;
	subtitle?: string;
	description?: string;
};

export interface TSliderClassicProps extends TSliderBaseProps {
	orientation: TArtPiece["orientation"];
}

export type TSliderBaseProps = React.HTMLAttributes<HTMLElement> & {
	slides: TSliderItem[];
	variant?: "classic" | "fullscreen";
	swiperProps?: SwiperOptions;
	wrapperStyle?: string;
	expandStyle?: string;
	unpackedSlides?: (slides: TSliderItem[]) => React.ReactNode;
	children?: (currentSlideIdx: number) => React.ReactNode;
	headerElements?: (currentSlideIdx: number) => React.ReactNode;
};

export type TLinkType = "artpiece" | "author" | "event" | "custom";

export interface TLinkedObjectInfoArtpiece {
	type: "artpiece";
	id: number;
	title: string;
	price: number;
	author_name: string;
}

export interface TLinkedObjectInfoAuthor {
	type: "author";
	id: number;
	name: string; // треба
	bio: string;
}

export interface TLinkedObjectInfoEvent {
	type: "event";
	id: number;
	title: string;
	start_date: string; // треба
	end_date: string; // треба
}

export interface TLinkedObjectInfoCustom {
	type: "custom";
	url: string;
}

export type TLinkedObjectInfo =
	| TLinkedObjectInfoArtpiece
	| TLinkedObjectInfoAuthor
	| TLinkedObjectInfoEvent
	| TLinkedObjectInfoCustom;

export interface TSliderItem {
	id: number;
	title: string; // треба
	subtitle: string; // треба
	description: string; // треба
	image_url: string; // треба
	order: number;
	is_active: boolean;
	link_url: string; // треба
	link_type: TLinkType; // треба link_type
	linked_object_id: number | null;
	linked_object_info: TLinkedObjectInfo; // треба
	created_at: string;
	updated_at: string;
}
