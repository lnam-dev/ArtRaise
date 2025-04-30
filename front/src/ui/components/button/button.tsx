"use client";

import React from "react";
import Link from "~/bridge/ui/Link";
import Arrow from "~/assets/arrow-right.svg";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
	children: React.ReactNode;
	variant?: "solid" | "light";
	includeArrow?: boolean;
	className?: string;
	href?: string;
}

export default function Button({
	children,
	variant = "solid",
	includeArrow = true,
	className,
	href,
	...props
}: ButtonProps) {
	let style = "";
	let arrowColor = "";

	switch (variant) {
		case "solid":
			style = `font-fixel font-medium text-4 text-white bg-black h-14 transition-all duration-300 hover:bg-gray-950.9`;
			arrowColor = "#FFFFFF";
			break;
		case "light":
			style = `font-fixel font-medium text-[#62636D] bg-white h-14 `;
			arrowColor = "#1F1F1F";
			break;
	}

	const button = (
		<button className={`${style} ${className} relative w-full`} {...props}>
			<span>{children}</span>
			{includeArrow && (
				<Arrow
					className=" absolute right-4 top-1/2 transform -translate-y-1/2"
					width={32}
					height={32}
					style={{ fill: arrowColor }}
				/>
			)}
		</button>
	);

	return href ? <Link to={href}>{button}</Link> : button;
}
