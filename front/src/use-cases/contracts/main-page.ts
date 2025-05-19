import { TArtPiece } from "~/types/art";
import { TSlide } from "~/types/slider";

export type MainPage = {
	slides: Array<TSlide>;
	artPieces: Array<TArtPiece>;
};
