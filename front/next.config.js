const createNextIntlPlugin = require("next-intl/plugin");
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = withNextIntl({
	webpack(config) {
		config.resolve.symlinks = false;

		// Видаляємо старі svg rule (якщо є)
		config.module.rules = config.module.rules.filter((rule) => {
			if (rule.test && rule.test.toString().includes("svg")) {
				return false;
			}
			return true;
		});

		// Додаємо SVGR
		config.module.rules.push({
			test: /\.svg$/,
			use: ["@svgr/webpack"],
		});

		return config;
	},
	reactStrictMode: true,
	images: {
		domains: ["localhost", "artraise-media.fra1.cdn.digitaloceanspaces.com"],
		remotePatterns: [
			{
				protocol: "http",
				hostname: "localhost",
			},
			{
				protocol: "https",
				hostname: "artraise-dev-pidyo.ondigitalocean.app",
			},
			{
				protocol: "https",
				hostname: "artraise-media.fra1.cdn.digitaloceanspaces.com",
			},
		],
	},
	devIndicators: {
		allowedDevOrigins: ["http://192.168.31.89"],
	},
	async redirects() {
		return [
			{
				source: "/",
				destination: "/ua",
				permanent: false,
			},
		];
	},
});

module.exports = nextConfig;
