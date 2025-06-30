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
	const Tag = href ? Link : "button";
	const linkProps = href ? { to: href } : null;

	return (
		<Tag
			className={`button button--${variant} ${className}`}
			{...linkProps}
			{...props}>
			{children}
		</Tag>
	);
}
