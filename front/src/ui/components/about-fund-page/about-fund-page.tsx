"use client";

import React, { FC } from "react";
import TextTemplatePage from "../text-template-page/text-template-page";
import AboutFundImgWrapper from "../about-fund-img-wrapper/about-fund-img-wrapper";
import { TSliderBaseProps } from "~/types/slider";
import ImageLinkToQA from "~/ui/pages/how-to-buy-page/image-link-to-qa";

interface AboutFundPageProps {
	slider: TSliderBaseProps;
	htmlContent: string;
	jsxContent: React.ReactNode;
	sections: string[];
}

const AboutFundPage: FC<AboutFundPageProps> = ({
	slider,
	htmlContent,
	jsxContent,
	sections,
}) => {
	return (
		<>
			<TextTemplatePage
				slider={slider}
				htmlContent={htmlContent}
				jsxContent={jsxContent}
				sections={sections}
				rightColumnTitle="Фотографії"
				rightColumnTitleClass="font-namu text-[36px] font-normal mb-[38px] text-left pl-0 ml-0"
			/>
			<div className="mx-auto px-4 sm:px-6 lg:px-[48px] my-12 max-w-[1200px]">
				<ImageLinkToQA />
			</div>
		</>
	);
};

export default AboutFundPage;
