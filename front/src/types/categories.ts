export interface TNewArrival {
	imageSrc: string;
	imageAlternative: string;
	title: string;
	description: string;
}

export interface TCategory {
	id: number;
	image_url?: string;
	description: string;
	name_en: string;
	name_ua: string;
	slug: string;
	count: number;
	is_available: boolean;
}

interface TMeta {
	total_categories: number;
	available_categories: number;
	total_artpieces: number;
	cache_generated_at: string;
}

export interface TCategories {
	categories: TCategory[];
	meta: TMeta;
}
