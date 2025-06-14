"use client";

import React from "react";
import Link from "~/bridge/ui/Link";
import useDevice from "~/ui/hooks/useDevice";
import SearchMobile from "~/assets/search-mobile.svg";
import SearchPC from "~/assets/search-pc.svg";
import Arrow from "~/assets/arrow-right-mobile-menu.svg";
import HeaderSwitchLang from "./header-switch-lang";
import Burger from "~/assets/burger-menu.svg";
import { usePathname } from "next/navigation";

import "./header.scss";

export const Header = () => {
	const { isDesktop } = useDevice();
	const currentPath = usePathname();
	const isActive = (path: string) =>
		path === currentPath.split("/").filter(Boolean)[1];

	return (
		<header className="flex w-full h-10 xl:h-[3.5rem] lg:h-[3.75rem] bg-gray-950/90 backdrop-blur-sm text-white fixed top-0 left-0 z-50">
			<div className="w-full relative xl:static">
				<div className="flex container pr-4 xl:pr-0 mx-auto h-full w-full static 2xl:relative">
					<Link
						to="/"
						className="font-fixel font-medium text-[3.25rem] inline-block leading-none tracking-[-0.05em] md:w-[10rem] lg:text-[4rem] xl:text-[4.65rem] xl:after:content-['©'] absolute left:0 xl:-left-1 -top-2">
						ARTRAISE
					</Link>
					<nav className="flex flex-row absolute left-1/2 transform -translate-x-1/2 h-full">
						<Link
							to={"authors"}
							className={`link ${isActive("authors") ? "link--active" : ""}`}>
							Автори
						</Link>
						<Link
							to={"categories"}
							className={`link ${
								isActive("categories") ? "link--active" : ""
							}`}>
							Категорії
						</Link>
						<Link
							to={"about-fund"}
							className={`link ${
								isActive("about-fund") ? "link--active" : ""
							}`}>
							Про фонд
						</Link>
						<Link
							to={"how-to-buy"}
							className={`link ${
								isActive("how-to-buy") ? "link--active" : ""
							}`}>
							Як купити?
						</Link>
						<Link
							to={"questions-and-answers"}
							className={`link ${
								isActive("questions-and-answers") ? "link--active" : ""
							}`}>
							Q&A
						</Link>
					</nav>
					<div className="flex items-center h-full gap-4 lg:gap-10 ml-auto">
						<Link to={"/search"} className="hover_button__light">
							{!isDesktop ? <SearchMobile /> : <SearchPC />}
						</Link>
						{/* {isDesktop && <HeaderSwitchLang />} */}
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
			</div>
		</header>
	);
};
