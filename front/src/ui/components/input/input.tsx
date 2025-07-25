import React from "react";

interface InputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "children"> {
	children?: (style: string) => React.ReactNode;
	className?: string;
}

const Input = ({ className, children, ...props }: InputProps) => {
	const style =
		"font-fixel font-normal text-4 h-12 xl:h-14 border-1 lg:border-2 w-full px-3 rounded-none border-gray-700 hover:outline-none hover:border-gray-950 hover:text-gray-900 active:outline-none active:border-gray-950 active:text-black-1000 focus:outline-none focus:border-focus";

	if (children) {
		return <>{children(style)}</>;
	}
	return <input className={`${style} ${className}`} {...props} />;
};

export default Input;
