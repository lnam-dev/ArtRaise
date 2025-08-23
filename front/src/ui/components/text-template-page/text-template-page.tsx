"use client";

import React, { FC, useState } from "react";
import SliderWrapper from "../slider/slider-wrapper";
import QuickMenu from "../quick-menu/quick-menu";
import { TSliderBaseProps } from "~/types/slider";
import DOMPurify from "dompurify";

interface TextTemplatePageProps {
  slider: TSliderBaseProps;
  htmlContent: string; // приходить з адмінки
  jsxContent: React.ReactNode; // передається динамічно
  sections?: string[]; // секції для quick-menu
  rightColumnTitle?: string; // заголовок для правої колонки
  rightColumnTitleClass?: string; // ✅ додали сюди
}

const TextTemplatePage: FC<TextTemplatePageProps> = ({
  slider,
  htmlContent,
  jsxContent,
  sections = ["Секція 1", "Секція 2"],
  rightColumnTitle,
  rightColumnTitleClass,
}) => {
  const [currentSection, setCurrentSection] = useState(0);

  // Очищаємо HTML через DOMPurify для безпеки
  const sanitizedHtml = DOMPurify.sanitize(htmlContent);

  return (
    <div className="min-h-screen">
      <section className="w-full">
        <SliderWrapper {...slider} isShowLines={false} variant="fullscreen" />
      </section>

      {/* <section className="w-full py-8 bg-white">
        <div className="container mx-auto px-4">
          <QuickMenu
            variants={sections}
            onSelect={(variant) => {
              const index = sections.indexOf(variant);
              setCurrentSection(index);
            }}
          />
        </div>
      </section> */}

      <section className="w-full py-12">
        <div className="mx-0 pl-[48px] pr-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="section-1">
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
              />
            </div>

            <div className="section-2">
              {rightColumnTitle && (
                <h2
                  className={
                    rightColumnTitleClass ??
                    "text-xl font-semibold text-gray-800 mb-6"
                  }>
                  {rightColumnTitle}
                </h2>
              )}
              {jsxContent}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TextTemplatePage;
