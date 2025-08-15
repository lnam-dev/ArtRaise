"use client";

import { FC } from "react";
import parse from "html-react-parser";
import LinkInside from "~/bridge/ui/Link";
import LinkOutside from "next/link";

import { TLinkType, TSliderItem } from "~/types/slider";

import parseFormatData from "~/utils/parse-format-data";

import SliderFullscreen from "~/ui/components/slider/slider-fullscreen";
import TurnaboutUniversal from "../../components/turnabout/turnabout-universal";

import "~/styles/admin-content.scss";

interface SliderWrapperProps {
	slides: TSliderItem[];
	className?: string;
}

const MainSliderWrapper: FC<SliderWrapperProps> = ({ slides, ...props }) => {
	const renderSubtitle = (link_type: TLinkType, item: Partial<TSliderItem>) => {
		const info = item.linked_object_info;
		switch (link_type) {
			case "artpiece":
				return (
					info?.type === "artpiece" && (
						<LinkInside to={`products/${info.id}`}>
							<span>{info.author_name}</span>
						</LinkInside>
					)
				);
			case "author":
				return (
					info?.type === "author" && (
						<LinkInside to={item.link_url}>
							<span>{info.name}</span>
						</LinkInside>
					)
				);
			case "event":
				return (
					info?.type === "event" && (
						<LinkInside to={item.link_url}>
							<span>{parseFormatData(info.start_date, info.end_date)}</span>
						</LinkInside>
					)
				);
			case "custom":
				return (
					info?.type === "custom" && (
						<LinkOutside target="_blank" href={item.link_url ?? ""}>
							<span>{item.subtitle}</span>
						</LinkOutside>
					)
				);

			default:
				return "";
		}
	};

	const renderDescription = (
		link_type: TLinkType,
		item: Partial<TSliderItem>
	) => {
		const info = item.linked_object_info;
		switch (link_type) {
			case "event":
				return info?.type === "event" && parse(item.description ?? "");
			case "custom":
				return info?.type === "custom" && parse(item.description ?? "");
			case "artpiece":
			case "author":
			default:
				return "";
		}
	};

	return (
		<SliderFullscreen slides={slides} {...props}>
			{/* @ts-ignore */}
			{(currentSlideIdx) => (
				<>
					<TurnaboutUniversal
						currentIndex={currentSlideIdx}
						items={slides.map(({ link_type, ...rest }) =>
							renderSubtitle(link_type, rest)
						)}
						wrapperClass="mb-2 admin-content"
						animation="ease-in-out"
						duration={600}
					/>
					<TurnaboutUniversal
						currentIndex={currentSlideIdx}
						items={slides.map(({ link_type, ...rest }) =>
							renderDescription(link_type, rest)
						)}
						wrapperClass="mb-2 xl:mb-0 admin-content"
						animation="ease-in-out"
						duration={600}
					/>
				</>
			)}
		</SliderFullscreen>
	);
};

export default MainSliderWrapper;
