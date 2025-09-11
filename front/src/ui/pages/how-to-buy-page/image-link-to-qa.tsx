import React from "react";
import Image from "next/image";

import ButtonTransparent from "~/ui/components/button/button-transparent";

const ImageLinkToQA = () => {
	return (
		<div className="col-span-full flex relative items-center justify-center md:justify-start overflow-hidden mb-12 md:mb-14">
			<figure
				className={"relative w-full aspect-[5/1] max-h-[80vh]"}
				data-orientation={"landscape"}
				data-target-aspect={5 / 1}>
				<Image
					src="/how-to-buy/kozlov_store.webp"
					alt="Фонове зображення для сторінки Q&A"
					fill
					className="object-cover object-center"
					loading="lazy"
					sizes="100vw"
					priority={false}
				/>
			</figure>
			<ButtonTransparent
				href="/questions-and-answers"
				primaryText="Маєте інші питання?"
				secondaryText="« Найчастіші питання »"
				description="\tТицяй сюди якщо шукаєш відповіді!"
				className="absolute mx-4 md:ml-[10%]"
			/>
		</div>
	);
};

export default ImageLinkToQA;
