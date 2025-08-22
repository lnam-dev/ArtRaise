import { MainPage as TMainPage } from "~/use-cases/contracts/main-page";
import SearchBar from "../../components/search-bar/search-bar";
import SegmentTitle from "../../components/segment-title/segment-title";
import CardPurchase from "../../components/card/card-purchase";
import CertificatesSection from "../../components/certificatesSection/certificate-section";
import AboutFund from "../../components/partners-section/about-fund";
import CallToActionSection from "../../components/cta-section/cta-section";
import MainSliderWrapper from "./main-slider-wrapper";

export default ({ artPieces, slides }: TMainPage) => {
	return (
		<main>
			<MainSliderWrapper className="mb-12 lg:mb-8" slides={slides} />
			<div className="container mx-auto min-h-[100vh]">
				<SearchBar className="mb-12" />
				<article className="mobile-spacing">
					<section className="mb-10">
						<SegmentTitle
							className="mb-10"
							link={{ to: "/", name: "всі нові надходження" }}>
							Нові надходження
						</SegmentTitle>
						<div className="columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4 space-y-12">
							{artPieces.slice(0,7).map((obj) => (
								<CardPurchase key={obj.id} card={obj} />
							))}
						</div>
					</section>
					<AboutFund className="mb-10" />
					<CertificatesSection />
					<SegmentTitle className="mb-10" />
					<CallToActionSection />
				</article>
			</div>
		</main>
	);
};
