"use client";

import Link from "~/bridge/ui/Link";
import { SearchBar } from "../../search/search-bar";
import { BasketButton } from "../basket-button";
import { TopicNavigation } from "../topic-navigation";
import { useEffect, useState } from "react";
import { useAppContext } from "../../../app-context/provider";
import { Image } from "@crystallize/reactjs-components";
import { Price } from "../../price";
import { LanguageSwitcher } from "../language-switcher";
import { Tree } from "../../../../use-cases/contracts/Tree";
import { TenantLogo } from "../../../lib/tenant-logo";
import useLocation from "~/bridge/ui/useLocation";
import items from "razorpay/dist/types/items";

import Account from "~/assets/account.svg";
import SearchMobile from "~/assets/search-mobile.svg";
import SearchPC from "~/assets/search-pc.svg";
import Arrow from "~/assets/arrow-right-mobile-menu.svg";

import "./module.header.scss";

export const Header: React.FC<{
	navigation: {
		folders: Tree[];
		topics: Tree[];
	};
}> = ({ navigation }) => {
	const { path } = useAppContext();
	const location = useLocation();
	const [isOpen, setIsOpen] = useState(false);
	const [isSmall, setIsSmall] = useState(false);
	const [language, setLanguage] = useState("UA");

	const changeLanguage = (lang: string) => {
		setLanguage(lang);
		localStorage.setItem("language", lang);
	};

	const paths = [
		{ path: "/authors", name: language === "UA" ? "Автори" : "Authors" },
		{
			path: "/categories",
			name: language === "UA" ? "Категорії" : "Categories",
		},
		{
			path: "/about-fond",
			name: language === "UA" ? "Про Фонд" : "About the Fund",
		},
		{
			path: "/how-to-buy",
			name: language === "UA" ? "Як купити?" : "How to buy?",
		},
		{
			path: "/qa",
			name: "Q&A",
		},
	];

	useEffect(() => {
		setIsOpen(false);
	}, [location.pathname]);

	useEffect(() => {
		const checkSize = () => setIsSmall(window.innerWidth < 640);
		checkSize(); // Викликаємо одразу
		window.addEventListener("resize", checkSize);
		return () => window.removeEventListener("resize", checkSize);
	}, []);

	useEffect(() => {
		const savedLanguage = localStorage.getItem("language");
		if (savedLanguage) {
			setLanguage(savedLanguage);
		}
	}, []);

	return (
		<header className="header">
			<div className="sectionPC">
				{/* Логотип */}
				<Link to={path("/")} className="logoHeader">
					ARTRAISE{isSmall ? "" : "©"}
				</Link>

				{/* Меню */}
				<nav className="navigationPC">
					{paths.map((item) => (
						<Link
							key={item.path}
							to={path(item.path)}
							className={`navigationPCLink
              ${
								location.pathname === path(item.path)
									? "border-b-4"
									: "border-transparent"
							}`}>
							{item.name}
						</Link>
					))}
				</nav>

				{/* Панель управління (пошук, обране, акаунт, перемикач мови) */}
				<div className="controlPanel">
					{isSmall ? (
						<Link to={path("/search")} className="opacity75">
							<SearchMobile />
						</Link>
					) : (
						<Link to={path("/search")} className="opacity75">
							<SearchPC />
						</Link>
					)}

					<div className="accountAndLanguageSection">
						<Link to={path("/cart")} className="opacity75">
							<Account />
						</Link>

						{/* <LanguageSwitcher /> */}
						{/* Кнопка переключення мови */}
						<div className="languageSwitcher">
							<button
								className={`${
									language === "UA" ? "text-white" : "text-[#62636D]"
								}`}
								onClick={() => changeLanguage("UA")}>
								UA
							</button>

							<button
								className={`${
									language === "EN" ? "text-white" : "text-[#62636D]"
								}`}
								onClick={() => changeLanguage("EN")}>
								EN
							</button>
						</div>
					</div>

					{/* Кнопка мобільного меню */}
					<button
						onClick={() => setIsOpen(!isOpen)}
						className="buttonMobileMenu">
						{!isOpen ? (
							<svg
								className="block h-6 w-6"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								aria-hidden="true">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
						) : (
							<svg
								className="block h-6 w-6 max-sm:w-[24px] max-sm:h-[24px]"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								aria-hidden="true">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						)}
					</button>
				</div>
			</div>

			{/* Мобільне меню */}
			{isOpen && (
				<nav className="mobileMenu">
					<div className="languageSitcherMobileMenu">
						<button
							className={`${language === "UA" ? "text-[#000]" : ""}`}
							onClick={() => changeLanguage("UA")}>
							UA
						</button>

						<button
							className={`${language === "EN" ? "text-[#000]" : ""}`}
							onClick={() => changeLanguage("EN")}>
							EN
						</button>
					</div>

					<div className="mobileMenuFirstSection">
						<div className="authors">
							<Link to={path("/authors")}>Автори</Link>
							<Arrow />
						</div>

						<div className="categories">
							<Link to={path("/categories")}>Категорії</Link>
							<Arrow />
						</div>
					</div>

					<hr className="border-[#B9BBC8]" />

					<div className="mobileMenuSecondSection">
						<div className="howToBuy">
							<Link to={path("/how-to-buy")}>Як купити?</Link>
							<Arrow />
						</div>

						<div className="qa">
							<Link to={path("/qa")}>Q&A</Link>
							<Arrow />
						</div>

						<div className="aboutFound">
							<Link to={path("/about-fond")}>Про фонд</Link>
							<Arrow />
						</div>
					</div>
				</nav>
			)}
		</header>
	);
};
