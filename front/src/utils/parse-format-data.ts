function parseFormatDate(start_date: string, end_date: string): string {
	// Очікуємо формат "YYYY-MM-DD"
	const format = (date: string) => {
		const [year, month, day] = date.split("-");
		return `${day}.${month}.${year}`;
	};

	return `${format(start_date)} — ${format(end_date)}`;
}

export default parseFormatDate;
