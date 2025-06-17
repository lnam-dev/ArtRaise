export type TQuestionAnswer = {
    question: string;
    answer: string;
}
export type TQuestionCategory = {
    name: string;
    questions: TQuestionAnswer[];
}