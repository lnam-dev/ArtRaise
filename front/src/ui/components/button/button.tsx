"use client";
import React from "react";
import Link from "~/bridge/ui/Link";
import { TButtonProps } from "~/types/button";
import classes from "./button.module.scss";

export default function Button({
	children,
	variant = "dark",
	className,
	href,
	...props
}: TButtonProps) {
	const isDark = variant === "dark";
	const button = (
		<div className="disabled">
			<button
				className={`${
					isDark ? classes.button_dark : classes.button_light
				} ${className}`}
				{...props}>
				{children}
			</button>
		</div>
	);
	return href ? <Link to={href}>{button}</Link> : button;
}
