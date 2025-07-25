"use client";
import React, { useState, isValidElement, ReactNode } from "react";
import Arrow from "~/assets/arrow-up-right.svg";

interface AccordionProps {
	title: string;
	children: ReactNode | string;
	size?: "sm" | "bg";
}

const textComponent = (children: string) => {
	return (
		<p className="font-fixel font-normal text-black text-[0.875rem] mt-2">
			{children}
		</p>
	);
};

const Accordion = ({ title, children, size = "sm" }: AccordionProps) => {
	let style;
	switch (size) {
		case "sm":
			style = "py-[0.625rem]";
			break;
		case "bg":
			style = "pb-4 pt-2 lg:pb-5 lg:pt-3";
			break;
	}
	const [isOpen, setIsOpen] = useState(false);

	const handleToggle = () => setIsOpen(!isOpen);

	return (
		<div className={`border-bottom ${style}`}>
			<button
				className="flex justify-between items-center gap-2 w-full"
				onClick={handleToggle}>
				<span
					className={`font-fixel font-medium ${
						size === "bg" ? "text-4 lg:text-5" : "text-4"
					} text-left`}>
					{title}
				</span>
				<div className="w-6 h-6">
					<Arrow
						className={`transition-transform duration-200 ${
							isOpen! ? "rotate-90" : null
						}`}
						width={24}
						height={24}
					/>
				</div>
			</button>
			<div
				className={`overflow-y-hidden w-fit transition-all ${
					isOpen ? "max-h-96" : "max-h-0"
				} duration-300`}>
				{isValidElement(children)
					? children
					: textComponent(children as string)}
			</div>
		</div>
	);
};

export default Accordion;
