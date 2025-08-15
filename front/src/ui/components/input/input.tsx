import React, { forwardRef } from "react";

const INPUT_BASE_STYLES =
	"font-fixel font-normal text-4 h-12 xl:h-14 border-1 lg:border-2 w-full px-3 rounded-none border-gray-700";
const INPUT_HOVER_STYLES =
	"hover:outline-none hover:border-gray-950 hover:text-gray-900";
const INPUT_ACTIVE_STYLES =
	"active:outline-none active:border-gray-950 active:text-black-1000";
const INPUT_FOCUS_STYLES = "focus:outline-none focus:border-focus";

interface InputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "children"> {
	children?: (style: string) => React.ReactNode;
	className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className = "", children, ...props }, ref) => {
		const styles = `${INPUT_BASE_STYLES} ${INPUT_HOVER_STYLES} ${INPUT_ACTIVE_STYLES} ${INPUT_FOCUS_STYLES}`;

		const renderChildren = () => {
			return children ? <>{children(styles)}</> : null;
		};

		const renderInput = () => {
			return (
				<input ref={ref} className={`${styles} ${className}`} {...props} />
			);
		};

		return children ? renderChildren() : renderInput();
	}
);

export default Input;
