export type TAuthor = {
	id: number;
	artpieces: Pick<
		TArtPiece,
		"id" | "title" | "price" | "length_cm" | "width_cm"
	>[];
	events: TEvent[];
	fullname: string;
	bio_text: string;
	image_author: string;
	style: string;
	theme: string;
	artpieces_count: number;
	expression_type: string;
};
export type TArtPiece = {
	id: number;
	title: string;
	price: string;
	type: string;
	material: string;
	theme: string;
	style: string;
	length_cm: string;
	width_cm: string;
	height_cm: string | null;
	creating_date: string;
	description: string;
	certificate: string;
	image_artpiece: string;
	orientation: "landscape" | "portrait" | "square";
	author: {
		id: number;
		fullname: string;
		bio_text: string;
		image_author: string;
	};
	category: {
		name_en: string;
		name_ua: string;
		slug: string;
	};
};

type TEventAuthor = Pick<TAuthor, "id" | "fullname"> & {
	artpieces_count: number;
};

export type TEvent = {
	id: number;
	authors: TEventAuthor[];
	title: string;
	location_name: string;
	location_details: string;
	ticket_price: string; //mb there need number
	description: string;
	start_date: string; //there need mb date
	end_date: string;
};
