"use client";

import React, { FC } from "react";
import TextTemplatePage from "../../components/text-template-page";
import AboutFundImgWrapper from "../../components/about-fund-img-wrapper";
import { TSliderBaseProps } from "~/types/slider";
import "./about-fund-page.module.css";

interface AboutFundPageProps {
  slider: TSliderBaseProps;
  htmlContent: string; // HTML з адмінки
}

const AboutFundPage: FC<AboutFundPageProps> = ({ slider, htmlContent }) => {
  // Обробник кліку по кнопці на зображенні
  const handleImageButtonClick = () => {
    // Тут можна додати логіку для відкриття модального вікна або переходу
    console.log("Image button clicked");
  };

  // JSX контент для другої секції
  const jsxContent = (
    <div className="about-fund-page__content">
      <h2 className="about-fund-page__title">Фотографії</h2>

      <div className="about-fund-page__images-grid">
        {/* Перше зображення */}
        <AboutFundImgWrapper
          src="/slider/img-1.png"
          alt="Зустріч випускників та події"
          buttonText=""
          onButtonClick={handleImageButtonClick}
          className="about-fund-page__image-wrapper"
        />

        {/* Друге зображення */}
        <AboutFundImgWrapper
          src="/slider/img-2.png"
          alt="Академія мистецтв та студенти"
          buttonText=""
          onButtonClick={handleImageButtonClick}
          className="about-fund-page__image-wrapper"
        />
      </div>
    </div>
  );

  return (
    <TextTemplatePage
      slider={slider}
      htmlContent={htmlContent}
      jsxContent={jsxContent}
      sections={["Інформація", "Фотографії"]}
      rightColumnTitle="Фотографії"
    />
  );
};

export default AboutFundPage;
