import React, { FC } from "react";
import { TAuthor } from "~/types";
import Image from "next/image";
import Arrow from "~/assets/arrow-right.svg";
import { redirect } from "next/navigation";
import useLocation from "~/bridge/ui/useLocation";
import usePath from "~/ui/hooks/usePath";
import ImageWithFallback from "~/ui/components/imageWithFallback/image-with-fallback";

type Props = {
	author: TAuthor;
};
const AuthorCard: FC<Props> = ({ author }) => {
	const pathMaker = usePath()
	const { fullname, image_author, artpieces } = author;
	return (
		<figure
			className={
				"flex flex-shrink flex-col w-full h-full bg-gray-950 break-inside-avoid"
			}
			onClick={() => {
				redirect(pathMaker(`/authors/${author.id}`));
			}}>
			<div className="relative block w-full text-white/90 font-namu">
				{" "}
				{/* Aspect ratio for consistent image size */}
				<ImageWithFallback
					src={`${image_author}`}
					alt="Author"
					fallbackSrc={`/default.png`}
					className={"inline-block w-full h-auto aspect-[16/9] object-cover"}
				/>
				<div
					className={
						"flex flex-row justify-between px-4 items-center cursor-pointer"
					}>
					<div className={"px-6 py-4 text-5"}>
						<h3 className={""}>{fullname}</h3>
						<p className={"text-4 font-light"}>{`${
							artpieces?.length ?? 0
						} роботи`}</p>
					</div>
					<Arrow className={"inline-block fill-white"} height={30} width={30} />
				</div>
			</div>
		</figure>
	);
};

export default AuthorCard;
