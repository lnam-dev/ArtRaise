import {TArtPiece} from "~/types";
import ProductPage from "~/ui/pages/product-page/product-page";
import CertificatePage from "~/ui/pages/sertificate-page/certificate-page";

type Params = {
    params: Promise<{
        artpieceId: string;
    }>;
};

export const revalidate = 21600;
export const dynamic = "force-dynamic";

async function getData(id: string): Promise<TArtPiece> {
    try {
        const response = await fetch(`${process.env.API_URL}artpieces/${id}/`);
        if (!response.ok) {
            throw new Error(`Failed to fetch art pieces: ${response.status}`);
        }

        const artPiece = await response.json();
        return artPiece;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function generateStaticParams() {
    try {
        const response = await fetch(`${process.env.API_URL}artpieces/`);
        if (!response.ok) {
            throw new Error(`Failed to fetch art pieces: ${response.status}`);
        }
        const artPieces = await response.json();

        return artPieces.map((artPiece: any) => ({
            id: artPiece.id.toString(),
        }));
    } catch (error) {
        console.error(`Failed to generate static pages: ${error}`);
        return [];
    }
}

export default async ({params}: Params) => {
    const {artpieceId} = await params;
    const artPiece = await getData(artpieceId);
    return <CertificatePage artpiece={artPiece}/>;
};
