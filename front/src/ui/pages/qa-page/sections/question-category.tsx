import React from "react";

import { TFrequentCategory } from "~/types";

import Accordion from "~/ui/components/accordion/accordion";
import Underline from "~/ui/components/underline/underline";

type QuestionCategoryProps = {
	category: TFrequentCategory;
};

const QuestionCategory: React.FC<QuestionCategoryProps> = ({ category }) => {
	const { category: name, questions } = category;
	return (
		<li
			className={
				"relative grid grid-cols-4 col-span-full gap-x-6 gap-y-4 py-12"
			}>
			<h3
				className={
					"font-namu font-semibold text-5 md:text-6 text-black-950/65 col-span-full md:col-span-1 mb-2 md:mb-0"
				}>
				{name}
			</h3>
			<div className={"col-span-full md:col-start-2 md:col-span-3"}>
				{questions.map((question) => (
					<Accordion
						key={question.question}
						title={question.question}
						className="mt-4"
						size="bg">
						<div className="mt-2">
							<span className="font-fixel text-4 text-black-950">
								{question.answer}
							</span>
						</div>
					</Accordion>
				))}
			</div>
			<Underline className="hidden md:block" />
		</li>
	);
};

export default QuestionCategory;
