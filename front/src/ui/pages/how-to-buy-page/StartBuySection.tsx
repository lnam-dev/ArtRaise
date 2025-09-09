"use client";

import React from "react";
import { redirect } from "next/navigation";

import Button from "~/ui/components/button/button";
import ImageLinkToQA from "~/ui/pages/how-to-buy-page/image-link-to-qa";

const StartBuySection = () => {
	return (
		<section className={"col-span-full gap-4"}>
			<Button
				className={"w-full md:w-[40%] mb-12"}
				onClick={() => redirect("/ua/search")}>
				Переглянути витвори
			</Button>
			<ImageLinkToQA />
		</section>
	);
};

export default StartBuySection;
