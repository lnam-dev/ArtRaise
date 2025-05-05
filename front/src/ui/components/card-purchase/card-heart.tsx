"use client";
import clases from "./card-purchase.module.scss";
import Heart from "~/assets/heart.svg";
import { useState } from "react";

const CardHeart = () => {
	const [isActive, setIsActive] = useState(false);
	const handleClick = () => {
		setIsActive((prevState) => !prevState);
	};
	return (
		<div className={clases.heart_dark} onClick={handleClick}>
			<Heart
				height={24}
				width={24}
				className={isActive ? clases.heart_solid : null}
			/>
		</div>
	);
};

export default CardHeart;
