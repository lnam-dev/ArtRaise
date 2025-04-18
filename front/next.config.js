/** @type {import('next').NextConfig} */
const withImages = require("next-images");

const nextConfig = withImages({
	webpack: (config) => {
		config.resolve.symlinks = false;

		// Видаляємо існуючі правила для SVG, щоб уникнути конфліктів
		config.module.rules = config.module.rules.filter((rule) => {
			if (rule.test && rule.test.toString().includes("svg")) {
				return false;
			}
			return true;
		});

		// Додаємо правило для обробки SVG через @svgr/webpack
		config.module.rules.push({
			test: /\.svg$/,
			use: ["@svgr/webpack"],
		});

		return config;
	},
	reactStrictMode: true,
	serverExternalPackages: ["your-package"],
	images: {
		domains: ["localhost"], // Додаємо localhost як дозволений домен для зображень
	},
	async redirects() {
		return [
			{
				source: "/",
				destination: "/en",
				permanent: true,
			},
		];
	},
});

module.exports = nextConfig;
