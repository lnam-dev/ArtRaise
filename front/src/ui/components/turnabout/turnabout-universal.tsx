"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

interface TurnaboutUniversalProps {
	items: React.ReactNode[];
	currentIndex: number;
	wrapperClass?: string;
	duration?: number;
	animation?: string;
	itemClass?: string;
	minItemHeight?: number | string;
	placeholderChar?: string;
}

const TRACK_CLASS = "turnabout-track";
const ITEM_CLASS = "turnabout-item";
const EMPTY_CLASS = "is-empty";

const TurnaboutUniversal: React.FC<TurnaboutUniversalProps> = ({
	items,
	currentIndex,
	wrapperClass = "",
	duration = 500,
	animation = "ease-in-out",
	itemClass,
	minItemHeight,
	placeholderChar = "M",
}) => {
	const refs = useRef<(HTMLDivElement | null)[]>([]);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const [heights, setHeights] = useState<number[]>([]);
	const [currentHeight, setCurrentHeight] = useState<number>(0);
	const instanceId = useRef(
		`turnabout-${Math.random().toString(36).slice(2, 9)}`
	).current;

	const count = items.length;
	const validatedIndex = count
		? Math.max(0, Math.min(currentIndex, count - 1))
		: 0;

	const toCssLength = (val: number | string) =>
		typeof val === "number" ? `${val}px` : val;

	const resolveMinItemHeight = (): number => {
		if (typeof minItemHeight === "number") return minItemHeight;
		if (typeof minItemHeight === "string" && minItemHeight.endsWith("px"))
			return parseFloat(minItemHeight);
		const base = containerRef.current
			? parseFloat(getComputedStyle(containerRef.current).fontSize || "16")
			: 16;
		return base;
	};

	const setRef = useCallback((el: HTMLDivElement | null, index: number) => {
		if (el) refs.current[index] = el;
	}, []);

	useEffect(() => {
		const calcHeight = (i: number) => {
			const el = refs.current[i];
			const rect = el?.getBoundingClientRect();
			const h = rect?.height ?? 0;
			return h < 1 ? resolveMinItemHeight() : h;
		};
		const newHeights = items.map((_, i) => calcHeight(i));
		setHeights(newHeights);
		const nextHeight = newHeights[validatedIndex] ?? resolveMinItemHeight();
		const id = window.setTimeout(() => setCurrentHeight(nextHeight), 10);
		return () => window.clearTimeout(id);
	}, [items, validatedIndex]);

	const translateY = heights
		.slice(0, validatedIndex)
		.reduce((acc, h) => acc + h, 0);

	const isEmptyString = (node: React.ReactNode) =>
		typeof node === "string" && node.trim() === "";

	const renderItemContent = (node: React.ReactNode) =>
		isEmptyString(node) ? null : node;

	return (
		<div
			ref={containerRef}
			data-turnabout={instanceId}
			className={`relative overflow-hidden transition-[height] duration-300 ease-in-out ${wrapperClass}`}
			style={{ height: `${currentHeight}px`, minHeight: "1em" }}>
			<style
				dangerouslySetInnerHTML={{
					__html: `
[data-turnabout="${instanceId}"] .${ITEM_CLASS}{min-block-size:1lh;}
@supports not (min-block-size:1lh){
  [data-turnabout="${instanceId}"] .${ITEM_CLASS}{min-height:1em;line-height:inherit;}
}
[data-turnabout="${instanceId}"] .${EMPTY_CLASS}::before{
  content:"\\00a0";
  display:block;
  visibility:hidden;
  min-block-size:1lh;
}
@supports not (min-block-size:1lh){
  [data-turnabout="${instanceId}"] .${EMPTY_CLASS}::before{min-height:1em;}
}
					`,
				}}
			/>
			<div
				className={`flex flex-col transition-transform duration-[${duration}ms] ${animation} ${TRACK_CLASS}`}
				style={{ transform: `translateY(-${translateY}px)` }}>
				{items.map((node, idx) => {
					const isEmpty = isEmptyString(node);
					const mergedItemClass = [
						ITEM_CLASS,
						itemClass,
						isEmpty ? EMPTY_CLASS : "",
					]
						.filter(Boolean)
						.join(" ");
					return (
						<div
							key={idx}
							ref={(el) => setRef(el, idx)}
							className={mergedItemClass}
							style={
								minItemHeight
									? { minHeight: toCssLength(minItemHeight) }
									: undefined
							}>
							{renderItemContent(node)}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default TurnaboutUniversal;
