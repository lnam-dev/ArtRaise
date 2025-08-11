export interface TNewArrival {
	imageSrc: string;
	imageAlternative: string;
	title: string;
	description: string;
}

export interface TCategory {
	image_url?: string;
	value: string;
	label_en: string;
	label_ua: string;
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
