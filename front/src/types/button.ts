export interface TButtonProps extends React.ComponentPropsWithoutRef<"button"> {
	children: React.ReactNode;
	variant?: "dark" | "light" | "disabled";
	className?: string;
	href?: string;
}
