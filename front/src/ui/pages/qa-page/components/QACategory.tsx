import React from "react";
import { TQuestionCategory } from "~/types";
import QuestionAnswer from "~/ui/pages/qa-page/components/QuestionAnswer";
import UnderLine from "~/ui/components/underline/UnderLine";

type Props = {
	category: TQuestionCategory;
};

const QaCategory: React.FC<Props> = ({ category }) => {
	const { questions, name } = category;
	return (
		<li
			className={
				"relative grid grid-cols-4 col-span-full gap-x-6 gap-y-4 py-5"
			}>
			<h3
				className={
					"font-semibold md:text-6 opacity-65 col-span-full md:col-span-1"
				}>
				{name}
			</h3>
			<ul className={"col-span-full md:col-start-2 md:col-span-3"}>
				{questions.map((question) => (
					<QuestionAnswer
						key={question.question}
						questionAnswer={question}
						type={"openClose"}
					/>
				))}
			</ul>
			<UnderLine />
		</li>
	);
};

export default QaCategory;
