"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

interface TurnaboutUniversalProps {
	items: React.ReactNode[];
	currentIndex: number;
	wrapperClass?: string;
	duration?: number;
	animation?: string;
	itemClass?: string;
}

const TurnaboutUniversal: React.FC<TurnaboutUniversalProps> = ({
	items,
	currentIndex,
	wrapperClass = "",
	duration = 500,
	animation = "ease-in-out",
	itemClass,
}) => {
	const refs = useRef<(HTMLDivElement | null)[]>([]);
	const [heights, setHeights] = useState<number[]>([]);
	const [currentHeight, setCurrentHeight] = useState<number>(0);

	const count = items.length;
	const validatedIndex = count
		? Math.max(0, Math.min(currentIndex, count - 1))
		: 0;

	const setRef = useCallback((el: HTMLDivElement | null, index: number) => {
		if (el) refs.current[index] = el;
	}, []);

	useEffect(() => {
		const newHeights = items.map((_, i) => refs.current[i]?.offsetHeight || 0);
		setHeights(newHeights);
		const nextHeight = newHeights[validatedIndex] ?? 0;
		const id = window.setTimeout(() => setCurrentHeight(nextHeight), 10);
		return () => window.clearTimeout(id);
	}, [items, validatedIndex]);

	const translateY = heights
		.slice(0, validatedIndex)
		.reduce((acc, h) => acc + h, 0);

	const isEmptyString = (node: React.ReactNode) =>
		typeof node === "string" && node.trim() === "";

	const renderItemContent = (node: React.ReactNode) =>
		isEmptyString(node) ? (
			<span className="invisible select-none">&#160;</span>
		) : (
			node
		);

	return (
		<div
			className={`relative overflow-hidden transition-[height] duration-300 ease-in-out ${wrapperClass}`}
			style={{ height: `${currentHeight}px`, minHeight: "1em" }}>
			<div
				className={`flex flex-col transition-transform duration-[${duration}ms] ${animation}`}
				style={{ transform: `translateY(-${translateY}px)` }}>
				{items.map((node, idx) => (
					<div key={idx} ref={(el) => setRef(el, idx)} className={itemClass}>
						{renderItemContent(node)}
					</div>
				))}
			</div>
		</div>
	);
};

export default TurnaboutUniversal;
