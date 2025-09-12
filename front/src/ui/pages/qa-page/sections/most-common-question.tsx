import React from "react";
import Image from "next/image";

import ButtonTransparent from "~/ui/components/button/button-transparent";

const MostCommonQuestion = () => {
	return (
		<div className="col-span-full flex relative items-center justify-center md:justify-start overflow-hidden mb-12 md:mb-14">
			<figure className="relative w-full aspect-[5/1] max-h-[80vh]">
				<Image
					src="/QA/QAPageBackGround.png"
					alt="Фонове зображення для сторінки Q&A"
					fill
					className="object-cover object-center"
					loading="lazy"
					sizes="100vw"
					priority={false}
				/>
			</figure>
			<ButtonTransparent
				href="/how-to-buy"
				primaryText="Звісно, найчастіше питання:"
				secondaryText="« Як купити картину? »"
				description="Тицяй сюди якщо не знаєш як придбати товар!"
				className="absolute mx-4 md:ml-[10%]"
			/>
		</div>
	);
};

export default MostCommonQuestion;
