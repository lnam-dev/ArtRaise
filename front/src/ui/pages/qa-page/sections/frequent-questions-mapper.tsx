import React from "react";

import { TFAQResponse } from "~/types";

import QuestionAnswer from "./question-answer";

type CommonQuestionProps = {
	commonQuestions: TFAQResponse["common"];
};

const CommonQuestionsMapper: React.FC<CommonQuestionProps> = ({
	commonQuestions,
}) => {
	return (
		<section className={"col-span-full"}>
			<h2
				className={`font-namu mb-0 md:mb-6 text-8 md:text-12 md:text-nowrap `}>
				Зазвичай запитують:
			</h2>
			<ul>
				{commonQuestions.map((question) => (
					<QuestionAnswer questionAnswer={question} key={question.id} />
				))}
			</ul>
		</section>
	);
};

export default CommonQuestionsMapper;
