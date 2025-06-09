"use client";
import React from "react";
import Link from "~/bridge/ui/Link";
import { TButtonProps } from "~/types/button";
import "./button.scss";

export default function Button({
	children,
	variant = "dark",
	className,
	href,
	...props
}: TButtonProps) {
	const button = (
		<button className={`button button--${variant} ${className}`} {...props}>
			{children}
		</button>
	);
	return href ? <Link to={href}>{button}</Link> : button;
}
