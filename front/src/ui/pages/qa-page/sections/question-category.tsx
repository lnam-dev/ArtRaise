import React from "react";

import { TQuestionCategory } from "~/types";

import QuestionAnswer from "~/ui/pages/qa-page/sections/question-answer";
import Accordion from "~/ui/components/accordion/accordion";

import UnderLine from "~/ui/components/underline/underline";

type Props = {
	category: TQuestionCategory;
};

const QuestionCategory: React.FC<Props> = ({ category }) => {
	const { questions, name } = category;
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
			<ul className={"col-span-full md:col-start-2 md:col-span-3"}>
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
			</ul>
			<UnderLine className="hidden md:block" />
		</li>
	);
};

export default QuestionCategory;
