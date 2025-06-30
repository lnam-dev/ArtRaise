"use client";

interface SliderPaginationProps {
	mode?: "dark" | "light";
	className?: string;
	currentSlide: number;
	slidesLength: number | undefined;
}

export default function SliderPagination({
	mode = "light",
	slidesLength = 0,
	currentSlide,
	className,
}: SliderPaginationProps) {
	let style = { active: "", transparent: "" };

	switch (mode) {
		case "dark":
			style = { active: "bg-[#1f1f1f]", transparent: "bg-[#636363]" };
			break;
		case "light":
			style = { active: " bg-white ", transparent: "bg-gray-700" };
			break;
	}

	if (slidesLength <= 1) return;

	return (
		<div className={`flex flex-1 gap-4 items-center ${className}`}>
			{Array.from({ length: slidesLength }, (_, index) => (
				<div
					key={index}
					className={`h-2 transition-all duration-[600ms] ${
						index == currentSlide
							? `w-20 ${style.active}`
							: `w-2 ${style.transparent}`
					}`}></div>
			))}
			{}
		</div>
	);
}
