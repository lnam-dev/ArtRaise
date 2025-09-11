const imageFallback = (src: string | undefined | null) => {
	return src ?? process.env.VITE_DEFAULT_IMAGE;
};

export default imageFallback;
