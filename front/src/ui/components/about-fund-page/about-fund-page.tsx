"use client";

import React, { FC } from "react";
import TextTemplatePage from "../text-template-page/text-template-page";
import AboutFundImgWrapper from "../about-fund-img-wrapper/about-fund-img-wrapper";
import { TSliderBaseProps } from "~/types/slider";

interface AboutFundPageProps {
  slider: TSliderBaseProps;
  htmlContent: string;
}

const AboutFundPage: FC<AboutFundPageProps> = ({ slider, htmlContent }) => {
  const jsxContent = (
    <div className="space-y-6">
      <AboutFundImgWrapper
        src="/AboutFundPage-1.jpg"
        alt="Зустріч випускників та студентів - три молоді люди за столом з виробами на ярмарку"
        buttonText=""
        onButtonClick={() => {}}
      />

      <AboutFundImgWrapper
        src="/AboutFundPage-2.jpg"
        alt="Кадри: Аліна Кіндяк - світла кімната з меблями та природним освітленням"
        buttonText=""
        onButtonClick={() => {}}
      />

    <AboutFundImgWrapper
        src="/AboutFundPage-3.jpg"
        alt="Кадри: Аліна Кіндяк - світла кімната з меблями та природним освітленням"
        buttonText=""
        onButtonClick={() => {}}
    />
    </div>
  );

  const sections = ["Інформація", "Фотографії"];

  return (
    <TextTemplatePage
      slider={slider}
      htmlContent={htmlContent}
      jsxContent={jsxContent}
      sections={sections}
      rightColumnTitle="Фотографії"
      rightColumnTitleClass="font-namu text-[36px] font-normal mb-[38px] text-left pl-0 ml-0"
    />
  );
};

export default AboutFundPage;
