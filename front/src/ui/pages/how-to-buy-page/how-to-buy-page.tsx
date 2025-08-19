import React from "react";
import { THowToBuyPage } from "~/use-cases/contracts/how-to-buy-page";
import UnderLine from "~/ui/components/underline/underline";
import Button from "~/ui/components/button/button";
import { redirect } from "next/navigation";
import StartBuySection from "~/ui/pages/how-to-buy-page/StartBuySection";

const HowToBuyPage: React.FC<THowToBuyPage> = ({ steps }) => {
	return (
		<main
			className={
				"container mx-auto grid grid-cols-1 gap-x-8 md:grid-cols-3 pt-20 font-namu mobile-spacing"
			}>
			<h1
				className={
					"col-span-full response-text-8 md:font-medium font-namu my-10 font-bold"
				}>
				Як купити?
			</h1>
			<aside className={" response-text-6 font md:col-span-1 hidden md:inline"}>
				{steps.map((step, index) => (
					<p key={index} className={`py-2`}>
						{step.title}
					</p>
				))}
			</aside>
			<ul className={"flex flex-col response-text-6 md:col-span-2 gap-6"}>
				{steps.map((step, index) => (
					<li key={index} className={`:bg-red flex flex-col relative`}>
						<p className={"response-text-8 pb-3 md:pb-6"}>{step.title}</p>
						<p className={"response-text-6 opacity-80 font-fixel pb-4"}>
							{step.description}
						</p>
						<UnderLine className={"bg"} />
					</li>
				))}
			</ul>
			<h3
				className={
					"col-span-full response-text-8 md:font-medium font-namu font-bold mt-7"
				}>
				Спробуй сам
			</h3>
			<p
				className={
					"col-span-full response-text-6 md:font-medium font-namu my-8"
				}>
				Ознайомтеся з широким вибором унікальних творів мистецтва на нашому
				сайті та оберіть той, який вразить вас найбільше! Рухайтесь по
				запропонованому алгоритму і у вас все точно вийде.
			</p>
			<StartBuySection />
		</main>
	);
};

export default HowToBuyPage;
