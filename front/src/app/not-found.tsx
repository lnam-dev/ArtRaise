import NotFoundPage from "~/ui/pages/not-found/not-found-page";

export const dynamic = "force-static";

export default async () => {
	return <NotFoundPage />;
};
