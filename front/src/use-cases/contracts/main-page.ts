import { Grid } from "./Grid";
import { Item } from "./Item";
import { SEO } from "./SEO";
import { TArtPiece } from "~/types/art";
import { TSlide } from "~/types/slider";

export type MainPage = {
	// grids: Array<Grid>;
	// seo: SEO;
	slides: Array<TSlide>;
	artPieces: Array<TArtPiece>;
};
