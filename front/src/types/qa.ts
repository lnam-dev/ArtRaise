// export type TQuestionAnswer = {
//     question: string;
//     answer: string;
// }
// export type TQuestionCategory = {
//     name: string;
//     questions: TQuestionAnswer[];
// }

export interface TQuestionAnswer {
	id: number;
	question: string;
	answer: string;
	category: number | null;
	order: number;
	is_active: boolean;
	show_in_call_to_action: boolean;
	created_at: string;
}

export interface TFrequentCategory {
	category: string;
	questions: TQuestionAnswer[];
}

export interface TFAQResponse {
	common: TQuestionAnswer[];
	frequent: TFrequentCategory[];
}
