import { TArtPiece } from "~/types/art";

export type ProductPage = {
	artPiece: TArtPiece;
	ACCORDION_ITEMS: any[]; // Замість any[] можна вказати конкретний тип, якщо відомо
	ART_DETAIL_LABELS: string[]; // Замість string[] можна вказати конкретний тип, якщо відомо
};
