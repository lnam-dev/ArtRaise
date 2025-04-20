"use client";
import { useState, useEffect, useRef, useCallback } from "react";

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
	const containerRef = useRef<HTMLDivElement | null>(null);
	const [heights, setHeights] = useState<number[]>([]);
	const [currentHeight, setCurrentHeight] = useState<number>(0);

	const validatedIndex = currentIndex >= text.length ? 0 : currentIndex;

	const setRef = useCallback((el: HTMLDivElement | null, index: number) => {
		if (el) refs.current[index] = el;
	}, []);

	useEffect(() => {
		const newHeights = refs.current.map((el) => el?.offsetHeight || 0);
		setHeights(newHeights);

		setTimeout(() => {
			if (newHeights[validatedIndex] !== undefined) {
				setCurrentHeight(newHeights[validatedIndex]);
			}
		}, 10);
	}, [text, validatedIndex]);

	const translateY = heights
		.slice(0, validatedIndex)
		.reduce((acc, h) => acc + h, 0);

	return (
		<div
			ref={containerRef}
			className={`relative overflow-hidden transition-[height] duration-300 ease-in-out ${wrapperClass}`}
			style={{ height: `${currentHeight}px`, minHeight: "1em" }}>
			<div
				className={`flex flex-col transition-transform duration-[${duration}ms] ${animation}`}
				style={{ transform: `translateY(-${translateY}px)` }}>
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
	);
};

export default Turnabout;
