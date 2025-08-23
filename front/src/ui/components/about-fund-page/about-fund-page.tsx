"use client";

import React, { FC } from "react";
import TextTemplatePage from "../text-template-page/text-template-page";
import AboutFundImgWrapper from "../about-fund-img-wrapper/about-fund-img-wrapper";
import { TSliderBaseProps } from "~/types/slider";

interface AboutFundPageProps {
  slider: TSliderBaseProps;
  htmlContent: string; // HTML з адмінки для Section 1
}

const AboutFundPage: FC<AboutFundPageProps> = ({ slider, htmlContent }) => {
  // JSX контент для Section 2 (тільки фотографії без заголовка)
  const jsxContent = (
    <div className="space-y-6">
      {/* Перша фотографія - Зустріч випускників */}
      <AboutFundImgWrapper
        src="/4photo.jpg"
        alt="Зустріч випускників та студентів - три молоді люди за столом з виробами на ярмарку"
        buttonText=""
        onButtonClick={() => {}}
      />
      
      {/* Друга фотографія - Кадри: Аліна Кіндяк */}
      <AboutFundImgWrapper
        src="/certificate-1.png"
        alt="Кадри: Аліна Кіндяк - світла кімната з меблями та природним освітленням"
        buttonText=""
        onButtonClick={() => {}}
      />
    </div>
  );

  // Секції для quick-menu
  const sections = [
    "Інформація",
    "Фотографії"
  ];

  return (
   <TextTemplatePage
  slider={slider}
  htmlContent={htmlContent}
  jsxContent={jsxContent}
  sections={sections}
  rightColumnTitle="Фотографії"
  rightColumnTitleClass="font-namu text-[36px] font-normal mb-[30px] text-left pl-0 ml-0"
/>


  );
};

export default AboutFundPage;