"use client";

import Link from "~/bridge/ui/Link";
import useDevice from "~/ui/hooks/useDevice";
import SearchMobile from "~/assets/search-mobile.svg";
import SearchPC from "~/assets/search-pc.svg";
import Arrow from "~/assets/arrow-right-mobile-menu.svg";
import HeaderSwitchLang from "./header-switch-lang";
import Burger from "~/assets/burger-menu.svg";

import React from "react";
import classes from "./header.module.scss";

export const Header = () => {
	const { isDesktop, isMobile } = useDevice();
	return (
		<header className="flex items-center w-full h-10 xl:h-[3.5rem] lg:h-[3.75rem] bg-gray-950/90 backdrop-blur-sm text-white fixed top-0 left-0 z-50">
			<div className="flex justify-between items-center container mx-auto h-full w-full">
				<Link
					to="/"
					className="font-fixel font-medium text-[3.25rem] tracking-[-0.05em] leading-[2.5rem] md:text-[2.75rem] md:leading-[2.55rem] md:h-[3.5rem] md:w-[10rem] md:mt-3 md:ml-6 lg:text-[4rem] lg:leading-[6.5rem] lg:h-[6rem] lg:-mt-2.5 lg:-ml-[0.875rem] xl:text-[5rem] xl:h-[6rem] xl:after:content-['©']">
					ARTRAISE
				</Link>
				{isDesktop && (
					<nav className="flex flex-row absolute left-1/2 transform -translate-x-1/2 h-full">
						<Link to={"authors"} className={classes.link}>
							Автори
						</Link>
						<Link to={"categories"} className={classes.link}>
							Категорії
						</Link>
						<Link to={"about-fund"} className={classes.link}>
							Про фонд
						</Link>
						<Link to={"how-to-buy"} className={classes.link}>
							Як купити?
						</Link>
						<Link to={"questions-and-answers"} className={classes.link}>
							Q&A
						</Link>
					</nav>
				)}
				<div className="flex items-center gap-4 lg:gap-10 ">
					<Link to={"/search"} className="hover_button__light">
						{isMobile ? <SearchMobile /> : <SearchPC />}
					</Link>
					{isDesktop && <HeaderSwitchLang />}
					{!isDesktop && <Burger />}
				</div>
			</div>

			{/* Мобільне меню
			{isOpen && (
				<nav className="lg:hidden bg-[#fff] p-7 absolute top-full left-0 w-full h-screen space-y-4">
					<div className="flex flex-col text-[#1F1F1F]  space-y-5">
						<div className="flex items-center justify-between cursor-pointer">
							<Link href={"/authors"}>Автори</Link>
							<Arrow />
						</div>

						<div className="flex items-center justify-between cursor-pointer">
							<Link href={"/categories"}>Категорії</Link>
							<Arrow />
						</div>
					</div>

					<hr className="border-[#B9BBC8]" />

					<div className="flex flex-col space-y-5 text-[#1F1F1F]">
						<div className="flex items-center justify-between cursor-pointer">
							<Link href={"/how-to-buy"}>Як купити?</Link>
							<Arrow />
						</div>

						<div className="flex items-center justify-between cursor-pointer">
							<Link href={"/qa"}>Q&A</Link>
							<Arrow />
						</div>

						<div className="flex items-center justify-between cursor-pointer">
							<Link href={"/about-fond"}>Про фонд</Link>
							<Arrow />
						</div>
					</div>
				</nav>
			)} */}
		</header>
	);
};
