const imageFallback = (src: string | undefined | null) => {
	return src ?? process.env.DEFAULT_IMAGE_URL ?? "/default.png";
};

export default imageFallback;
