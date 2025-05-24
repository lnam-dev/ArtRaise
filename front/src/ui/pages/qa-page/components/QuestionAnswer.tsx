"use client"
import React, {useState} from 'react';
import {TQuestionAnswer} from "~/types";
import UnderLine from "~/ui/components/underline/UnderLine";
import Chevron from "~/assets/chevron-down.svg"

type Props = {
    questionAnswer: TQuestionAnswer;
    type?: "default" | "openClose";
}
const DefaultQA: React.FC<{ qa: TQuestionAnswer }> = ({qa}) => {
    return (
        <li className={"relative grid grid-cols-4 col-span-full gap-x-6 gap-y-4 mb-4 md:text-5 pb-18"}>
            <p className={"col-span-full md:col-span-2 xl:col-span-1 font-semibold"}>{qa.question}</p>
            <p className={"col-span-full md:col-span-2  xl:col-start-3 md:col-start-3"}>{qa.answer}</p>
            <UnderLine height={1} className={"bg-gray-950"}/>
        </li>
    )
}
const OpenCloseQA: React.FC<{ qa: TQuestionAnswer }> = ({qa}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    return (
        <li className={"w-full transition-all overflow-hidden md:text-5 mb-8"}>
            <div className={"relative col-span-full flex flex-row justify-between items-center pb-5 cursor-pointer"}
                 onClick={() => setIsOpen(!isOpen)}>
                <p className={"font-semibold"}>{qa.question}</p>
                <Chevron height={20} width={20}
                         className={`transition-all duration-500 ${isOpen ? "rotate-0" : "-rotate-180"}`}/>
                <UnderLine height={1}/>
            </div>
            <p className={`transition-all duration-500 ${isOpen ? "max-h-0" : "max-h-96"}`}>{qa.answer}</p>
        </li>
    )
}
const QuestionAnswer: React.FC<Props> = ({type, questionAnswer}) => {
    switch (type) {
        case "openClose":
            return <OpenCloseQA qa={questionAnswer}/>;
        case "default":
            return <DefaultQA qa={questionAnswer}/>;
        default:
            return <DefaultQA qa={questionAnswer}/>;

    }
}
export default QuestionAnswer;
