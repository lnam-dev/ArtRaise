export function getRandomUniqueData<T>(
	array: readonly T[],
	count: number
): T[] {
	if (!Array.isArray(array) || array.length === 0) return [];
	const safeCount = Math.min(Math.max(0, Math.floor(count)), array.length);
	if (safeCount === 0) return [];

	const copy = array.slice();
	const n = copy.length;

	for (let i = 0; i < safeCount; i++) {
		const r = i + Math.floor(Math.random() * (n - i));
		[copy[i], copy[r]] = [copy[r], copy[i]];
	}

	return copy.slice(0, safeCount);
}

export default getRandomUniqueData;
