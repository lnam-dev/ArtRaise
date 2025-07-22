"use client";
import { useState } from "react";
import Heart from "~/assets/heart.svg";
import clases from "./card-purchase.module.scss";

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
