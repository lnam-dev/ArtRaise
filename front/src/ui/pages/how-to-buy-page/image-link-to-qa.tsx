import React from "react";
import Image from "next/image";

import ButtonTransparent from "~/ui/components/button/button-transparent";

const ImageLinkToQA = () => {
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
				href="/questions-and-answers"
				primaryText="Маєте інші питання?"
				secondaryText="« Найчастіші питання »"
				description="	Тицяй сюди якщо шукаєш відповіді!"
				className="absolute mx-4 md:ml-[10%]"
			/>
		</div>
	);
};

export default ImageLinkToQA;
