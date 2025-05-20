"use client";

import { useRouter, usePathname } from "next/navigation";
import classes from "./header.module.scss";

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
		<div className={classes.switch}>
			<button
				onClick={() => handleChangeLocale("ua")}
				className={`${classes.switch_language} ${
					currentLocale("ua") ? classes.switch_language__active : null
				}`}>
				UA
			</button>
			<button
				onClick={() => handleChangeLocale("en")}
				className={`${classes.switch_language} ${
					currentLocale("en") ? classes.switch_language__active : null
				}`}>
				EN
			</button>
		</div>
	);
};

export default HeaderSwitchLang;
