"use client";
import Button from "../button/button";
import React from "react";
import { useAppContext } from "~/ui/app-context/provider";

interface LinkButtonProps extends React.ComponentProps<typeof Button> {
	href?: string;
	children: React.ReactNode;
}

export default function LinkButton({
	href = "#",
	children,
	...props
}: LinkButtonProps) {
	const { path } = useAppContext();

	return (
		<Button href={path(href)} {...props}>
			{children}
		</Button>
	);
}
