import React from "react";
import { useEffect } from "react";

interface ModalBaseWindowProps {
	isActive: boolean;

	children?: React.ReactNode;
}

const ModalBaseWindow: React.FC<ModalBaseWindowProps> = ({
	isActive,
	children,
}) => {
	useEffect(() => {
		if (isActive) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [isActive]);

	return (
		isActive && (
			<div
				className={`fixed flex justify-center items-center z-50 -inset-x-0 -inset-y-0 bg-[rgba(0,0,0,0.8)] filter backdrop-blur-[24px]`}>
				<div
					className={
						"flex justify-center items-center w-full h-full px-4 xl:px-0"
					}>
					{children}
				</div>
			</div>
		)
	);
};

export default ModalBaseWindow;
