import React from "react";

import { TQAPage } from "~/use-cases/contracts/qa-page";

import BreadcrumbsWrapper from "~/ui/components/breadcrumbs/breadcrumbs-wrapper";
import BreadcrumbsLink from "~/ui/components/breadcrumbs/breadcrumbs-link";
import LinkBackTo from "~/ui/components/link/link-back-to";

import MostCommonQuestion from "~/ui/pages/qa-page/sections/most-common-question";
import FrequentQuestionsMapper from "~/ui/pages/qa-page/sections/frequent-questions-mapper";
import QACategoriesMapper from "~/ui/pages/qa-page/sections/categories-mapper";
import CallToActionSection from "~/ui/components/cta-section/cta-section";

type Props = TQAPage;

const QAPage: React.FC<Props> = ({
	frequentlyAskedQuestions,
	questionsCategories,
}) => {
	return (
		<main
			className={
				"font-namu mt-12 xl:mt-16 grid grid-cols-4 gap-x-[3rem] w-full h-fit auto-rows-auto px-[3vw] max-w-screen-2xl ml-auto container mx-auto"
			}>
			<BreadcrumbsWrapper
				activeIndex={2}
				className="col-span-full mt-9 mb-4 pl-0">
				<BreadcrumbsLink to="/">Головна</BreadcrumbsLink>
				<BreadcrumbsLink>Зазвичай запитують</BreadcrumbsLink>
			</BreadcrumbsWrapper>
			<LinkBackTo path="/" className="mb-6">
				до головної
			</LinkBackTo>
			<MostCommonQuestion />
			<FrequentQuestionsMapper frequentQuestions={frequentlyAskedQuestions} />
			<QACategoriesMapper categories={questionsCategories} />
			<CallToActionSection
				QuestionAndAnswer={false}
				className={"col-span-full mt-10"}
			/>
		</main>
	);
};

export default QAPage;
