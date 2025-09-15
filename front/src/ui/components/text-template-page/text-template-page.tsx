"use client";

import React, { FC, useState } from "react";
import SliderWrapper from "../slider/slider-wrapper";
import QuickMenu from "../quick-menu/quick-menu";
import { TSliderBaseProps } from "~/types/slider";
import DOMPurify from "dompurify";
import "./text-template-page.css";

interface TextTemplatePageProps {
  slider: TSliderBaseProps;
  htmlContent: string;
  jsxContent: React.ReactNode;
  sections?: string[];
  rightColumnTitle?: string;
  rightColumnTitleClass?: string;
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

  const sanitizedHtml = DOMPurify.sanitize(htmlContent);

  return (
    <div className='lg:px-0 px-[16px]'>
        <div className='md:hidden'>
            <div className="mt-[52px]">
                <nav className="flex items-center text-sm text-gray-400 space-x-2">
                    <a href="/" className="text-[12px] hover:text-gray-600 font-fixel">Головна</a>
                    <span>›</span>
                    <span className="text-[12px] text-[#000] font-medium font-fixel">Про фонд</span>
                </nav>

                <div className="mt-4">
                    <a href="/" className="flex items-center text-lg text-black hover:text-gray-700 font-fixel">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                        </svg>
                        назад до Головної сторінки
                    </a>
                </div>
            </div>
        </div>
        <section className="w-full h-[476px] object-cover text-template-page-slider">
            <SliderWrapper
                {...slider}
                variant="fullscreen"
                className="h-[476px]"
                wrapperStyle="h-[108px]"
            />
        </section>

        <section className="w-full lg:py-8 bg-white md:hidden pt-[0px] lg:pt-[48px] pb-[32px] -mt-[48px]">
            <div className="container mx-auto px-4">
                <QuickMenu
                    variants={sections}
                    onSelect={(variant) => {
                        const index = sections.indexOf(variant);
                        setCurrentSection(index);
                    }}
                />
            </div>
        </section>

        <section className="w-full lg:pb-[54px] lg:pt-[112px] lg:px-0 pt-[2px]">
            <div className="mx-0 lg:px-[48px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:hidden">
            {currentSection === 0 ? (
              <div className="section-1">
                <div
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
                />
              </div>
            ) : null}

            {currentSection === 1 ? (
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
            ) : null}
          </div>
          <div className="grid-cols-1 md:grid-cols-[1fr_546px] gap-6 md:grid hidden">
            <div className="section-1">
              <div
                className="text-[16px] text-template-page"
                dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
              />
            </div>

            <div className="section-2 -mt-[34px]">
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
