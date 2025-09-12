import { useEffect, useRef, useState } from "react";

// Використання: const style = useSectionSpacing(sliderRef)
// Повертає { marginTop: <dynamic> } з урахуванням фактичної висоти hero/slider замість жорстких mt-[...]
export default function useSectionSpacing(
	sliderRef: React.RefObject<HTMLElement>
) {
	const [mt, setMt] = useState<string>("3.25rem"); // стартове значення як у дизайні для моб
	const lastSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });

	useEffect(() => {
		if (!sliderRef.current) return;
		const el = sliderRef.current;
		const base = { mobile: 3.25, md: 5.25, xl: 5.0 }; // xl:mt-20 -> 5rem
		const baselineHeroVh = 75; // очікувана базова висота

		const mqMd = window.matchMedia("(min-width: 768px)");
		const mqXl = window.matchMedia("(min-width: 1280px)");

		const calc = () => {
			const h = el.getBoundingClientRect().height;
			const w = window.innerWidth;
			if (h === 0) return;
			if (lastSize.current.h === h && lastSize.current.w === w) return; // debounce trivial
			lastSize.current = { h, w };
			const vh = (h / window.innerHeight) * 100;
			const ratio = Math.min(1, vh / baselineHeroVh); // якщо нижче 75vh — пропорційно зменшуємо відступ; якщо вище — не ростимо
			let target = base.mobile;
			if (mqXl.matches) target = base.xl;
			else if (mqMd.matches) target = base.md;
			const value = (target * ratio).toFixed(3) + "rem";
			setMt(value);
		};

		const ro = new ResizeObserver(() => calc());
		ro.observe(el);
		window.addEventListener("resize", calc);
		// спроби перерахунку після асинхронних зображень
		const id = requestAnimationFrame(calc);
		const id2 = window.setTimeout(calc, 350);

		return () => {
			ro.disconnect();
			window.removeEventListener("resize", calc);
			cancelAnimationFrame(id);
			clearTimeout(id2);
		};
	}, [sliderRef]);

	return { marginTop: mt } as const;
}
