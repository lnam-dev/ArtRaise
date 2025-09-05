import { TArtPiece } from "~/types/art";
import { TPagination } from "~/types/pagination";

export interface CategoryPage {
	artPieces: TArtPiece[];
	categories: string;
	pagination?: TPagination | null;
}
