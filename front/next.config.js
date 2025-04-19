const createNextIntlPlugin = require("next-intl/plugin");
const withImages = require("next-images");

const withNextIntl = createNextIntlPlugin();

const nextConfig = withNextIntl(
	withImages({
		webpack: (config) => {
			config.resolve.symlinks = false;

			config.module.rules = config.module.rules.filter((rule) => {
				if (rule.test && rule.test.toString().includes("svg")) {
					return false;
				}
				return true;
			});

			config.module.rules.push({
				test: /\.svg$/,
				use: ["@svgr/webpack"],
			});

			return config;
		},
		reactStrictMode: true,
		serverExternalPackages: ["your-package"],
		images: {
			remotePatterns: [
				{
					protocol: "http",
					hostname: "localhost",
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
	})
);

module.exports = nextConfig;
