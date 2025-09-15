"use client";
import { useState, useRef, useCallback, useLayoutEffect } from "react";

interface TurnaboutProps
	extends React.ComponentPropsWithoutRef<React.ElementType> {
	text: (string | undefined)[];
	tag: React.ElementType;
	type?: "vertical";
	currentIndex: number;
	duration?: number;
	animation?: string;
	wrapperClass?: string;
	textClass?: string;
}

const Turnabout: React.FC<TurnaboutProps> = ({
	text,
	tag: Tag,
	type = "vertical",
	currentIndex,
	duration = 500,
	animation = "ease-in-out",
	wrapperClass,
	textClass,
}) => {
	const refs = useRef<(HTMLDivElement | null)[]>([]);
	const [heights, setHeights] = useState<number[]>([]);

	const validatedIndex = currentIndex >= text.length ? 0 : currentIndex;

	const setRef = useCallback((el: HTMLDivElement | null, index: number) => {
		if (el) refs.current[index] = el;
	}, []);

	// Measure item heights before paint to avoid visible jump
	useLayoutEffect(() => {
		const newHeights = refs.current.map((el) => el?.offsetHeight || 0);
		setHeights(newHeights);
	}, [text]);

	const translateY = heights
		.slice(0, validatedIndex)
		.reduce((acc, h) => acc + h, 0);

	const placeholderText = text.reduce((longest, t) => {
		const a = longest || "";
		const b = t || "";
		return b.length > a.length ? b : a;
	}, "");

	return (
		<div className={`relative overflow-hidden ${wrapperClass}`}>
			{/* Invisible placeholder reserves space on first paint to prevent layout shift */}
			<Tag
				aria-hidden
				className={`${textClass} opacity-0 select-none pointer-events-none`}>
				{placeholderText}
			</Tag>
			<div className="absolute inset-0">
				<div
					className={`flex flex-col`}
					style={{
						transform: `translateY(-${translateY}px)`,
						transitionProperty: "transform",
						transitionDuration: `${duration}ms`,
						transitionTimingFunction: animation,
					}}>
					{text.map((textItem, index) => (
						<Tag
							key={index}
							ref={(el: any) => setRef(el, index)}
							className={textClass}>
							{textItem}
						</Tag>
					))}
				</div>
			</div>
		</div>
	);
};

export default Turnabout;
