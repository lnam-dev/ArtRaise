import React from "react";
import { TQuestionCategory } from "~/types";
import QuestionCategory from "~/ui/pages/qa-page/sections/question-category";

type Props = {
	categories: TQuestionCategory[];
};

const QaCategoriesMapper: React.FC<Props> = ({ categories }) => {
	return (
		<ul className={"col-span-full"}>
			<h2
				className={`mt-12 mb-0 md:mb-12 md:mt-12 text-8 md:text-12 md:text-nowrap `}>
				Зазвичай запитують:
			</h2>
			<li>
				{categories.map((category, id) => {
					return <QuestionCategory key={category.name} category={category} />;
				})}
			</li>
		</ul>
	);
};

export default QaCategoriesMapper;
