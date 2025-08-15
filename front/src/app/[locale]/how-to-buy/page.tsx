import React from "react";
import HowToBuyPage from "~/ui/pages/how-to-buy-page/how-to-buy-page";
import { HOW_TO_BUY_DATA } from "~/use-cases/contracts/how-to-buy-page";

export const revalidate = 21600;
export const dynamic = "force-static";

const Page = () => {
	return <HowToBuyPage steps={HOW_TO_BUY_DATA.steps} />;
};

export default Page;
