export interface TPagination {
	current_page: number;
	total_pages: number;
	total_items: number;
	has_next: boolean;
	has_previous: boolean;
	page_size: number;
}
