import React from 'react';
import {TQuestionAnswer} from "~/types";
import QuestionAnswer from "~/ui/pages/qa-page/components/QuestionAnswer";

type Props = {
    frequentQuestions: TQuestionAnswer[];
}

const FrequentQuestionsMapper: React.FC<Props> = ({frequentQuestions}) => {
  return (
    <section className={"col-span-full"}>
      <h2 className={`my-8 md:my-18 text-8 md:text-12 md:text-nowrap `}>Зазвичай запитують:</h2>
        {
            frequentQuestions.map((question, index) => (
                <QuestionAnswer  questionAnswer={question} key={index} type={"default"}/>
            ))
        }
    </section>
  );
};

export default FrequentQuestionsMapper;
