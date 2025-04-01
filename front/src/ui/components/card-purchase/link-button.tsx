"use client";
import Button from "../button/button";
import { useAppContext } from "~/ui/app-context/provider";

interface LinkButtonProps extends React.ComponentProps<typeof Button> {
	cardId: number;
	children: React.ReactNode;
}

export default function LinkButton({
	cardId,
	children,
	...props
}: LinkButtonProps) {
	const productPath = `/product/${cardId}`;
	const { path } = useAppContext();

	return (
		<Button href={path(productPath)} {...props}>
			{children}
		</Button>
	);
}
