import Image from "next/image";
import imageFallback from "~/utils/image-fallback";

export default function CertificatePreview({
	src,
	title,
}: {
	src?: string;
	title: string;
}) {
	if (!src)
		return (
			<p className="font-fixel text-4 ">
				Для цього твору сертифікату не знайдено
			</p>
		);
	return (
		<figure className="flex-shrink-0 h-full w-full flex items-center">
			<Image
				src={imageFallback(src)}
				alt={`Сертифікат автентичності для ${title}`}
				width={600}
				height={800}
				sizes="(max-width:768px) 60vw, 20vw"
				className="h-full w-full object-contain object-left select-none max-h-[40vh]"
				priority={false}
			/>
		</figure>
	);
}
