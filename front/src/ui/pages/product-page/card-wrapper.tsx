"use client";

import { FC } from "react";
import { TSlide } from "~/types/slider";

import SliderClassic from "~/ui/components/slider/slider-classic";
import LinkTo from "~/assets/link-to.svg";
import Link from "~/bridge/ui/Link";
import usePath from "~/ui/hooks/usePath";

interface SliderWrapperProps {
	slides: TSlide[];
	author: any;
	className?: string;
}

const SliderWrapper: FC<SliderWrapperProps> = ({
	slides,
	author,
	...props
}) => {
	const path = usePath();
	return (
		<SliderClassic slides={slides} {...props}>
			{/* @ts-ignore */}
			{() => (
				<Link
					to={path(`author/${author.id}`)}
					className="flex gap-2 items-center">
					<p className="font-fixel font-medium leading-0 lg:font-normal text-4 md:text-5 lg:text-6 text-gray-950">
						{author.fullname}
					</p>
					<LinkTo className="inline-block fill-gray-950" />
				</Link>
			)}
		</SliderClassic>
	);
};

export default SliderWrapper;
