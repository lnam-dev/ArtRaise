import {TArtPiece, TFindByTag} from "~/types/art";
import { TSliderItem } from "~/types/slider";

export type MainPage = {
	slides: TSliderItem[];
	artPieces: TArtPiece[];
	tagsFindBy: TFindByTag[];
};
