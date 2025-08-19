import React from "react";

type Props = {
	height?: number;
	className?: string;
};

const UnderLine: React.FC<Props> = ({ className }) => {
	return (
		<div
			className={`absolute bottom-0 left-0 w-full content-[''] border-bottom bg-gray-950 ${className}`}
		/>
	);
};

export default UnderLine;
