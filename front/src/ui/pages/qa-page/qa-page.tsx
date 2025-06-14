import React from "react";
import { TQAPage } from "~/use-cases/contracts/qa-page";
import BreadcrumbsWrapper from "~/ui/components/breadcrumbs/breadcrumbs-wrapper";
import BreadcrumbsLink from "~/ui/components/breadcrumbs/breadcrumbs-link";
import LinkBackTo from "~/ui/components/link/link-back-to";
import Image from "next/image";
import MostCommonQuestion from "~/ui/pages/qa-page/components/MostCommonQuestion";
import FrequentQuestionsMapper from "~/ui/pages/qa-page/components/FrequentQuestionsMapper";
import QACategoriesMapper from "~/ui/pages/qa-page/components/QACategoriesMapper";
import CallToActionSection from "~/ui/components/cta-section/cta-section";

type Props = TQAPage;

const QAPage: React.FC<Props> = ({frequentlyAskedQuestions, questionsCategories}) => {
    return (
        <div
            className={
                "font-namu mt-16 grid grid-cols-4 gap-x-[3rem] w-full h-fit auto-rows-auto px-[3vw] max-w-screen-2xl ml-auto container mx-auto"
            }>
            <BreadcrumbsWrapper activeIndex={2} className="col-span-full mt-9 pl-0">
                <BreadcrumbsLink>Головна</BreadcrumbsLink>
                <BreadcrumbsLink>Зазвичай запитують</BreadcrumbsLink>
            </BreadcrumbsWrapper>
            <LinkBackTo path="/" className="mt-4 text-nowrap mb-6 pl-10 opacity-70">
                до головної
            </LinkBackTo>
            <MostCommonQuestion/>
            <FrequentQuestionsMapper frequentQuestions={frequentlyAskedQuestions}/>
            <QACategoriesMapper categories={questionsCategories}/>
            <CallToActionSection className={"col-span-full"}/>
        </div>
    );

};

export default QAPage;
