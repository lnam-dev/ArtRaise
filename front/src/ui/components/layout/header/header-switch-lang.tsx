"use client";

import { useRouter, usePathname } from "next/navigation";
import "./header.scss";

const HeaderSwitchLang = () => {
	const router = useRouter();
	const pathname = usePathname();
	const segments = pathname.split("/").filter(Boolean);
	const currentLocale = (locale: string) => locale === segments[0];

	const handleChangeLocale = (locale: string) => {
		if (segments.length > 0) {
			segments[0] = locale;
		} else {
			segments.unshift(locale);
		}
		router.push("/" + segments.join("/"));
	};

	return (
		<div className="switch">
			<button
				onClick={() => handleChangeLocale("ua")}
				className={`switch__button ${
					currentLocale("ua") ? "switch__button--active" : null
				}`}>
				UA
			</button>
			<button
				onClick={() => handleChangeLocale("en")}
				className={`switch__button ${
					currentLocale("en") ? "switch__button--active" : null
				}`}>
				EN
			</button>
		</div>
	);
};

export default HeaderSwitchLang;
