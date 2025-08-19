"use client";

import React from "react";

import { TQuestionAnswer } from "~/types";

import UnderLine from "~/ui/components/underline/underline";

type Props = {
	questionAnswer: TQuestionAnswer;
	type?: "default" | "openClose";
};

const QuestionAnswer: React.FC<Props> = ({ questionAnswer }) => {
	return (
		<li
			className={
				"relative grid grid-cols-4 col-span-full gap-x-6 gap-y-4 mb-4 md:text-5 py-12"
			}>
			<h3
				className={
					"font-fixel font-medium text-4 md:text-6 col-span-full md:col-span-2 xl:col-span-1"
				}>
				{questionAnswer.question}
			</h3>
			<p
				className={
					"font-fixel font-normal text-3 md:text-5 col-span-full md:col-span-2  xl:col-start-3 md:col-start-3"
				}>
				{questionAnswer.answer}
			</p>
			<UnderLine />
		</li>
	);
};
export default QuestionAnswer;
