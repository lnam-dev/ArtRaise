"use client";

import React, { useRef } from "react";

import { THowToBuyPage } from "~/use-cases/contracts/how-to-buy-page";
import Underline from "~/ui/components/underline/underline";
import StartBuySection from "~/ui/pages/how-to-buy-page/StartBuySection";
import { useActiveStep } from "~/ui/hooks/useActiveStep";
import useDevice from "~/ui/hooks/useDevice/useDevice";

const HowToBuyPage: React.FC<THowToBuyPage> = ({ steps }) => {
	const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
	const { isDesktop } = useDevice();
	const { activeStepIndex, navigateToStep, setHoverIndex, clearHover } =
		useActiveStep(stepRefs, steps.length);

	return (
		<main className="container mx-auto grid grid-cols-1 gap-x-8 md:grid-cols-3 mt-20 font-namu mobile-spacing">
			<div className="md:sticky md:top-5">
				<h1 className="response-text-8 md:font-medium font-namu mb-4 xl:mb-10 font-bold">
					Як купити?
				</h1>
				<aside className=" response-text-6 font md:col-span-1 hidden md:inline">
					{steps.map((step, index) => (
						<p
							key={index}
							onClick={() => navigateToStep(index)}
							onMouseEnter={() => isDesktop && setHoverIndex(index)}
							onMouseLeave={() => isDesktop && clearHover()}
							className={`py-2 cursor-pointer transition-colors duration-300 ease-in-out hover:text-black ${
								index !== activeStepIndex ? "text-gray-700" : "text-black"
							}`}>
							{step.title}
						</p>
					))}
				</aside>
			</div>
			<ul
				className="flex flex-col response-text-6 md:col-span-2 gap-6 md:pt-32"
				onMouseLeave={() => isDesktop && clearHover()}>
				{steps.map((step, index) => {
					const isActive = index === activeStepIndex;
					return (
						<li
							key={step.id}
							ref={(elem) => {
								stepRefs.current[index] = elem;
							}}
							onMouseEnter={() => isDesktop && setHoverIndex(index)}
							onMouseLeave={() => isDesktop && clearHover()}
							className="scroll-mt-52 flex flex-col relative">
							<p
								className={`response-text-8 pb-3 md:pb-6 transition-colors duration-300 ease-in-out ${
									isActive ? "text-black" : "text-gray-700"
								}`}>
								{step.title}
							</p>
							<p
								className={`response-text-6 opacity-80 font-fixel pb-4 transition-colors duration-300 ease-in-out ${
									isActive ? "text-black" : "text-gray-700"
								}`}>
								{step.description}
							</p>
							<Underline className="bg" />
						</li>
					);
				})}
			</ul>
			<h3 className="col-span-full response-text-8 md:font-medium font-namu font-bold mt-10 md:mt-12">
				Спробуй сам
			</h3>
			<p className="col-span-full response-text-6 md:font-medium font-namu my-6 md:my-8">
				Ознайомтеся з широким вибором унікальних творів мистецтва на нашому
				сайті та оберіть той, який вразить вас найбільше! Рухайтесь по
				запропонованому алгоритму і у вас все точно вийде.
			</p>
			<StartBuySection />
		</main>
	);
};

export default HowToBuyPage;
