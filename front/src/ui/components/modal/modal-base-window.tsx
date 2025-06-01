import React from "react";
import { useEffect } from "react";
import Close from "~/assets/close.svg";

interface ModalBaseWindowProps {
	isActive: boolean;
	setIsActive: (isActive: boolean) => void;
	children?: React.ReactNode;
}

const ModalBaseWindow: React.FC<ModalBaseWindowProps> = ({
	isActive,
	setIsActive,
	children,
}) => {
	const closeWindow = () => setIsActive(false);

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
				<div className={"flex flex-col space-between w-fit h-fit relative"}>
					<button onClick={closeWindow} className="absolute top-6 right-6">
						<Close
							height={32}
							width={32}
							className={
								"transition ease-in duration-200 stroke-gray-900 hover:stroke-red-500"
							}
						/>
					</button>
					{children}
				</div>
			</div>
		)
	);
};

export default ModalBaseWindow;
