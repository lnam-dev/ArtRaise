export interface TButtonProps extends React.ComponentPropsWithoutRef<"button"> {
	children: React.ReactNode;
	variant?: "dark" | "light";
	className?: string;
	href?: string;
}
