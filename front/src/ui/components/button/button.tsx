"use client";

import React from "react";
import Link from "next/link";
import Arrow from "~/assets/arrow-right.svg";

interface ButtonProps {
	children: React.ReactNode;
	variant?: "solid";
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

	switch (variant) {
		case "solid":
			style = `font-fixel font-medium text-4 text-white bg-black h-14 transition-all duration-300 hover:bg-gray-950.9`;
			break;
	}

	const button = (
		<button className={`${style} ${className} relative`} {...props}>
			<span>{children}</span>
			{includeArrow && (
				<Arrow
					className="fill-white absolute right-4 top-1/2 transform -translate-y-1/2"
					width={32}
					height={32}
				/>
			)}
		</button>
	);

	return href ? <Link href={href}>{button}</Link> : button;
}
