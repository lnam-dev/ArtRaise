import React from "react";
import { TQuestionAnswer } from "~/types";
import QuestionAnswer from "~/ui/pages/qa-page/sections/question-answer";

type Props = {
	frequentQuestions: TQuestionAnswer[];
};

const FrequentQuestionsMapper: React.FC<Props> = ({ frequentQuestions }) => {
	return (
		<section className={"col-span-full"}>
			<h2
				className={`font-namu mb-0 md:mb-6 text-8 md:text-12 md:text-nowrap `}>
				Зазвичай запитують:
			</h2>
			<ul>
				{frequentQuestions.map((question, index) => (
					<QuestionAnswer questionAnswer={question} key={index} />
				))}
			</ul>
		</section>
	);
};

export default FrequentQuestionsMapper;
