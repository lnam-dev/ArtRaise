import Image from "next/image";
import ButtonArrow from "~/ui/components/button/button-arrow";
import imageFallback from "~/utils/image-fallback";

export type AboutAuthorProps = {
	id: string | number | undefined;
	name?: string;
	bio?: string;
	imgSrc?: string;
};

// Контейнер автора: адаптивний, не виносимо зайвих констант згідно з проектним конвеншном
export default function AboutAuthor({
	id,
	name = "",
	bio,
	imgSrc,
}: AboutAuthorProps) {
	return (
		<section className="flex flex-col md:flex-row gap-4 h-full xl:h-[40vh] mt-4 items-stretch">
			<figure className="flex-shrink-0 h-full w-full md:w-auto flex items-center">
				<Image
					src={imageFallback(imgSrc)}
					alt={name}
					width={600}
					height={800}
					sizes="(max-width:768px) 60vw, 20vw"
					className="h-full md:w-auto w-full object-contain select-none xl:max-h-[40vh]"
					priority={false}
				/>
			</figure>
			<div className="flex flex-col gap-3 justify-between h-full min-w-0">
				<div>
					<h2 className="font-namu text-6 md:text-8 xl:text-12 line-clamp-2 break-words mb-4">
						{name}
					</h2>
					<p className="font-fixel text-4 leading-relaxed overflow-auto">
						{bio || "Інформація про автора відсутня."}
					</p>
				</div>
				{id !== undefined && (
					<ButtonArrow href={`authors/${id}`}>Переглянути автора</ButtonArrow>
				)}
			</div>
		</section>
	);
}
