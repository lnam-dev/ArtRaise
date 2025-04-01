"use client";
import { useState } from "react";
import Arrow from "~/assets/arrow-up-right.svg";

interface FAQitemProps {
	question: string;
	answer: string;
}

export default function FAQitem({
	question,
	answer,
}: FAQitemProps): JSX.Element {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="border-b-1 lg:border-b-2 border-gray-500 py-[0.625rem] mb-8">
			<button
				className="flex justify-between items-center gap-2 w-full"
				onClick={() => setIsOpen(!isOpen)}>
				<span className="font-fixel font-medium text-4 text-left">
					{question}
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
				className={`overflow-hidden transition-all ${
					isOpen ? "max-h-40" : "max-h-0"
				} duration-300`}>
				<p className="font-fixel font-normal text-black text-[0.875rem] mt-2">
					{answer}
				</p>
			</div>
		</div>
	);
}
