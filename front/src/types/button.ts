export interface TButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	variant?: "dark" | "light";
	className?: string;
	href?: string;
}
