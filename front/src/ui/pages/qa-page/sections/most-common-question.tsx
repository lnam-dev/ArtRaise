import React from "react";
import Image from "next/image";
import ButtonTransparent from "~/ui/components/button/button-transparent";

const MostCommonQuestion = () => {
	return (
		<div className="col-span-full flex relative items-center justify-center md:justify-start overflow-x-hidden  mb-12 md:mb-14">
			<figure>
				<Image
					src="/QA/QAPageBackGround.png"
					height={200}
					width={1500}
					alt="Фонове зображення для сторінки Q&A"
					className="object-cover"
					loading="lazy"
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
