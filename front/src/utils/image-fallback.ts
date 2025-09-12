const imageFallback = (src: string | undefined | null): string => {
	if (typeof src === "string") {
		const trimmed = src.trim();
		if (trimmed && trimmed !== "null" && trimmed !== "undefined")
			return trimmed;
	}
	return (process.env.DEFAULT_IMAGE as string) || "/default.png";
};

export default imageFallback;
