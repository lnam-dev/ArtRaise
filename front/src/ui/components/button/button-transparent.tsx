"use client";
import Link from "~/bridge/ui/Link";
import React from "react";
import usePath from "~/ui/hooks/usePath";

import Arrow from "~/assets/arrow-right.svg";

interface TransparentButtonProps {
	href: string;
	primaryText: string;
	secondaryText: string;
	description: string;
	className?: string;
}

const ButtonTransparent: React.FC<TransparentButtonProps> = ({
	href,
	primaryText,
	secondaryText,
	description,
	className = "",
}) => {
	const makePath = usePath();

	return (
		<Link
			to={href}
			className={`flex flex-row justify-between items-start md:items-center gap-6 bg-black-950/60 backdrop-blur-xl py-6 px-4 md:py-4 md:px-6 text-white tracking-wider z-10 ${className}`}>
			<div>
				<p className="font-fixel leading-none font-normal text-3 md:text-4">
					{primaryText}
				</p>
				<h3 className="font-namu text-5 md:text-8 mb-2">{secondaryText}</h3>
				<p className="font-fixel leading-none text-3 md:text-4 xl:text-5 font-normal">
					{description}
				</p>
			</div>
			<Arrow className="arrow fill-white" width={32} height={32} />
		</Link>
	);
};

export default ButtonTransparent;
