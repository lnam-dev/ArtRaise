// import { CrystallizeAPI } from "~/use-cases/crystallize/read";
// import { getContext } from "~/use-cases/http/utils";
// import { isValidLanguageMarket } from "~/use-cases/LanguageAndMarket";
// import { getStoreFront } from "~/use-cases/storefront.server";
// import { headers } from "next/headers";
// import dataFetcherForShapePage from "~/use-cases/dataFetcherForShapePage.server";

import MainPage from "~/ui/pages/main-page";
import { MainPage as TMainPage } from "~/use-cases/contracts/main-page";
import axios from "axios";

const SLIDES = [
	{
		imgSrc: "/slider/img-1.png",
		title: "Sculpture Month",
		subtitle: "1 — 30.04.2025",
		description: "LNAA Gallery",
	},
	{
		imgSrc: "/slider/img-2.png",
		title: "Girl with a Pearl Earring",
		subtitle: "Johannes Vermeer",
	},
	{
		imgSrc: "/slider/img-3.png",
		title: "The great wave of Kanagawa",
		subtitle: "Katsushika Hokusai",
	},
	{
		imgSrc: "/slider/img-4.png",
		title: "The Lovers",
		subtitle: "Rene Magrita",
	},
	{
		imgSrc: "/slider/img-5.png",
		title: "The Gulf Stream",
		subtitle: "Rene Magrita",
	},
];
// async function getData() {// const requestContext = getContext({
//  url: `${process.env.APP_URL}/en`,//  headers: headers(),
// });// if (!isValidLanguageMarket(requestContext.language, requestContext.market)) {
//  // HOW?// }
// const { secret } = await getStoreFront(requestContext.host);// const api = CrystallizeAPI({
//  apiClient: secret.apiClient,//  language: requestContext.language,
// });// const path = "/frontpage";
// //Todo: get user from request// //const user = await authenticatedUser(request);
// const user: [] = [];// const data = await dataFetcherForShapePage(
//  "landing-page",//  path,
//  requestContext,//  {},
//  user
// );// return {
//  data,// };
// }
export const revalidate = 21600;
async function getData(): Promise<TMainPage> {
	try {
		const response = await axios.get(`${process.env.API_URL}artpieces/`);
		const artPieces = response.data;
		return { artPieces, slides: SLIDES };
	} catch (error) {
		console.error(`Помилка при завантаженні мистецьких творів: ${error}`);
		return {
			artPieces: [],
			slides: SLIDES,
		};
	}
}
export default async () => {
	const data = await getData();
	return <MainPage data={data} />;
};
