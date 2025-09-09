import { useEffect, useRef, useState } from "react";
import useDevice from "~/ui/hooks/useDevice/useDevice";

type TRefArray = React.MutableRefObject<(HTMLLIElement | null)[]>;

export const useActiveStep = (stepRefs: TRefArray, stepsLength: number) => {
	const [activeStepIndex, setActiveStepIndex] = useState(0);
	const isManualNavigation = useRef(false);
	const resetTimer = useRef<number | null>(null);
	const { isDesktop } = useDevice();

	const navigateToStep = (index: number) => {
		isManualNavigation.current = true;
		setActiveStepIndex(index);
		const target = stepRefs.current[index];
		if (target) target.scrollIntoView({ behavior: "smooth" });
		if (resetTimer.current) window.clearTimeout(resetTimer.current);
		resetTimer.current = window.setTimeout(() => {
			isManualNavigation.current = false;
		}, 600);
	};

	const setHoverIndex = (index: number) => {
		if (!isDesktop) return;
		setActiveStepIndex(index);
	};

	const clearHover = () => {
		if (!isDesktop) return;
		setActiveStepIndex(Math.max(0, stepsLength - 1));
	};

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (isManualNavigation.current) return;
				if (typeof window !== "undefined" && window.scrollY <= 2) {
					setActiveStepIndex(0);
					return;
				}

				const anyIntersecting = entries.some((e) => e.isIntersecting);
				if (!anyIntersecting) {
					const last = stepRefs.current[stepsLength - 1];
					if (last) {
						const rect = last.getBoundingClientRect();
						if (rect.bottom <= 0) {
							setActiveStepIndex(Math.max(0, stepsLength - 1));
							return;
						}
					}
				}

				let candidateIndex = -1;
				let minTop = Number.POSITIVE_INFINITY;
				for (const entry of entries) {
					if (!entry.isIntersecting) continue;
					const index = stepRefs.current.indexOf(entry.target as HTMLLIElement);
					const top = entry.boundingClientRect.top;
					if (top >= 0 && top < minTop) {
						minTop = top;
						candidateIndex = index;
					}
				}

				if (candidateIndex === -1) {
					const indices = entries
						.filter((e) => e.isIntersecting)
						.map((e) => stepRefs.current.indexOf(e.target as HTMLLIElement))
						.filter((i) => i >= 0)
						.sort((a, b) => a - b);
					if (indices.length) candidateIndex = indices[0];
				}

				if (candidateIndex !== -1) setActiveStepIndex(candidateIndex);
			},
			{
				root: null,
				rootMargin: "0px 0px -40% 0px",
				threshold: [0.1, 0.25, 0.5, 0.75],
			}
		);

		stepRefs.current.forEach((el) => el && observer.observe(el));
		return () => {
			observer.disconnect();
			if (resetTimer.current) window.clearTimeout(resetTimer.current);
		};
	}, [stepsLength]);

	return { activeStepIndex, navigateToStep, setHoverIndex, clearHover };
};
