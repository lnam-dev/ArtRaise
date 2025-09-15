"use client";
import {
	useState,
	useRef,
	useCallback,
	useLayoutEffect,
	useEffect,
} from "react";

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
	// Use HTMLElement to support any tag type
	const refs = useRef<(HTMLElement | null)[]>([]);
	const [heights, setHeights] = useState<number[]>([]);
	const [currentHeight, setCurrentHeight] = useState<number>(0);
	// Keep latest text in a ref for effects that shouldn't re-register
	const textRef = useRef<(string | undefined)[]>(text);
	useEffect(() => {
		textRef.current = text;
	}, [text]);

	const count = text.length;
	const validatedIndex = count
		? Math.max(0, Math.min(currentIndex, count - 1))
		: 0;

	const setRef = useCallback((el: HTMLElement | null, index: number) => {
		if (el) refs.current[index] = el;
	}, []);

	// Measure item heights before paint to avoid visible jump
	useLayoutEffect(() => {
		// Measure only for current text items to avoid stale refs
		const source = textRef.current;
		const newHeights = source.map((_, i) => refs.current[i]?.offsetHeight || 0);
		setHeights(newHeights);
		const nextH = newHeights[validatedIndex] || 0;
		setCurrentHeight(nextH);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [validatedIndex, text.length]);

	// Recalculate on window resize (debounced) and after fonts load to adapt to line-wrap changes
	useEffect(() => {
		let t: number | null = null;
		const recalc = () => {
			const source = textRef.current;
			const newHeights = source.map(
				(_, i) => refs.current[i]?.offsetHeight || 0
			);
			setHeights(newHeights);
			const nextH = newHeights[validatedIndex] || 0;
			setCurrentHeight(nextH);
		};
		const onResize = () => {
			if (t) window.clearTimeout(t);
			t = window.setTimeout(recalc, 120);
		};
		window.addEventListener("resize", onResize);
		// Re-measure after fonts are ready (if supported)
		if (typeof document !== "undefined" && (document as any).fonts?.ready) {
			(document as any).fonts.ready.then(() => recalc());
		}
		return () => {
			window.removeEventListener("resize", onResize);
			if (t) window.clearTimeout(t);
		};
		// Run once on mount; recalc uses refs to access latest data
	}, []);

	const translateY = heights
		.slice(0, validatedIndex)
		.reduce((acc, h) => acc + h, 0);

	return (
		<div
			className={`relative overflow-hidden ${wrapperClass}`.trim()}
			style={{
				height: currentHeight ? `${currentHeight}px` : undefined,
				minHeight: "1em",
				transitionProperty: "height",
				transitionDuration: `${duration}ms`,
				transitionTimingFunction: animation,
			}}>
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
							{textItem ?? ""}
						</Tag>
					))}
				</div>
			</div>
		</div>
	);
};

export default Turnabout;
