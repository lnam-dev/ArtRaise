import { useLocale } from "next-intl";

export default function usePath() {
	const locale = useLocale();

	return (path: string) => {
		return `/${locale}${path}`;
	};
}
