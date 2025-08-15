export function debounce<T extends (...args: any[]) => void>(
	func: T,
	wait: number
) {
	let timeout: NodeJS.Timeout;

	return function (...args: Parameters<T>) {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			func(...args);
		}, wait);
	};
}
