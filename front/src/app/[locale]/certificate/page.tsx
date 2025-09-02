import {TArtPiece} from "~/types";
import LandingCertificatePage from "~/ui/pages/landing-certificate-page/landing-certificate-page";

export const revalidate = 86400; // page regenerates every 24 hours

async function getData(): Promise<TArtPiece[]> {
    const response = await fetch(`${process.env.API_URL}search?size_50&page=0/`);
    if (!response.ok) {
        throw new Error(`Failed to fetch art pieces: ${response.status}`);
    }
    const artpieces = (await response.json()).results
    return Array.isArray(artpieces) ? artpieces : [];
}

export default async function Page() {
    const artPieces = await getData();
     const filteredArtPieces = artPieces //todo filter by certificate existing
    return <LandingCertificatePage artpiecesWithCertificate={filteredArtPieces}/>;
}
