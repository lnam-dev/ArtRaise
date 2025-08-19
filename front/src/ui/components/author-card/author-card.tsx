import React, { FC } from "react";
import { TAuthor } from "~/types";
import Arrow from "~/assets/arrow-right.svg";
import { redirect } from "next/navigation";
import usePath from "~/ui/hooks/usePath";
import ImageWithFallback from "~/ui/components/imageWithFallback/image-with-fallback";
import {getRobotaWord} from "~/ui/components/author-card/helper";

type Props = {
	author: TAuthor;
	className?: string;
};
const AuthorCard: FC<Props> = ({ author,className }) => {
	const pathMaker = usePath()
	const { fullname, image_author, artpieces_count } = author;
	return (
		<figure
			className={
				"flex flex-shrink flex-col w-full h-full bg-gray-950 break-inside-avoid " + className
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
						<p className="text-4 font-light">
							{artpieces_count ?? 0} {getRobotaWord(artpieces_count ?? 0)}
						</p>
					</div>
					<Arrow className={"inline-block fill-white"} height={30} width={30} />
				</div>
			</div>
		</figure>
	);
};

export default AuthorCard;
