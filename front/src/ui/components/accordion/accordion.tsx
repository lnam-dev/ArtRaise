"use client";
import React, {
	useState,
	isValidElement,
	ReactNode,
	useRef,
	useId,
	useCallback,
} from "react";
import Arrow from "~/assets/arrow-up-right.svg";

interface AccordionProps {
	title: string;
	children: ReactNode | string;
	className?: string;
	size?: "sm" | "bg";
}

const textComponent = (children: string) => {
	return (
		<p className="font-fixel font-normal text-black text-3 xl:text-4 mt-2">
			{children}
		</p>
	);
};

const Accordion = ({
	title,
	children,
	className = "",
	size = "sm",
}: AccordionProps) => {
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
	const contentRef = useRef<HTMLDivElement | null>(null);
	const [height, setHeight] = useState<number | "auto" | 0>(0);
	const regionId = useId();

	const openSection = useCallback(() => {
		const el = contentRef.current;
		if (!el) return;
		setIsOpen(true);
		// Start from 0, then expand to scrollHeight
		setHeight(0);
		requestAnimationFrame(() => {
			setHeight(el.scrollHeight);
		});
	}, []);

	const closeSection = useCallback(() => {
		const el = contentRef.current;
		if (!el) return;
		// Lock current height, then collapse to 0
		const current = el.getBoundingClientRect().height;
		setHeight(current);
		requestAnimationFrame(() => {
			setHeight(0);
		});
		setIsOpen(false);
	}, []);

	const handleToggle = useCallback(() => {
		if (isOpen) closeSection();
		else openSection();
	}, [isOpen, closeSection, openSection]);

	return (
		<div className={`border-bottom duration-300  ${style} ${className}`}>
			<button
				className="flex justify-between items-center gap-2 w-full"
				onClick={handleToggle}
				aria-expanded={isOpen}
				aria-controls={regionId}>
				<span
					className={`font-fixel font-medium ${
						size === "bg" ? "text-4 lg:text-5" : "text-4"
					} text-left`}>
					{title}
				</span>
				<div className="w-6 h-6">
					<Arrow
						className={`transition-transform duration-300 ease-in-out ${
							isOpen ? "rotate-90" : ""
						}`}
						width={24}
						height={24}
					/>
				</div>
			</button>
			<div
				id={regionId}
				ref={contentRef}
				role="region"
				aria-labelledby={regionId}
				className="overflow-hidden w-full transition-[height] duration-300 ease-in-out"
				style={{ height: typeof height === "number" ? `${height}px` : height }}
				onTransitionEnd={(e) => {
					if (e.target !== e.currentTarget || e.propertyName !== "height")
						return;
					const el = contentRef.current;
					if (!el) return;
					if (isOpen) {
						// After expanding, switch to auto so content can grow naturally
						setHeight("auto");
					} else {
						// Ensure fully collapsed state
						setHeight(0);
					}
				}}>
				{isValidElement(children)
					? children
					: textComponent(children as string)}
			</div>
		</div>
	);
};

export default Accordion;
