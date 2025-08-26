import React from "react";

import { TFrequentCategory } from "~/types";

import QuestionCategory from "./question-category";

type QaCategoriesMapperProps = {
	categories: TFrequentCategory[];
};

const QaCategoriesMapper: React.FC<QaCategoriesMapperProps> = ({
	categories,
}) => {
	return (
		<ul className={"col-span-full"}>
			<h2
				className={`mt-12 mb-10 md:mb-12 md:mt-12 text-8 md:text-12 md:text-nowrap `}>
				Часті питання:
			</h2>
			<React.Fragment>
				{categories.map((category) => {
					return (
						<QuestionCategory key={category.category} category={category} />
					);
				})}
			</React.Fragment>
		</ul>
	);
};

export default QaCategoriesMapper;
