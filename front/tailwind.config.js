import colors from "tailwindcss/colors";

module.exports = {
	mode: "jit",
	content: ["./src/**/*.{ts,tsx,jsx,js}"],
	theme: {
		container: {
			center: false,
			screens: {
				xl: "81.25rem", // 1300px / 16
				"2xl": "96rem", // 1536px / 16
			},
		},
		screens: {
			sm: "40rem", // 640px
			md: "48rem", // 768px
			lg: "64rem", // 1024px
			xl: "84rem", // 1344px
			"2xl": "100rem", // 1600px
		},
		spacing: {
			auto: "auto",
			full: "100%",
			screenWidth: "100vw", //1920px
			screenHeight: "100vh", //1920px
			min: "min-content",
			max: "max-content",
			layout: "1600px",
			content: "1040px",
			card: "730px",
		},
		fontSize: {
			0.5: "0.125rem", //2px
			1: "0.25rem", //4px
			1.5: "0.375rem", //6px
			2: "0.5rem", //8px
			2.5: "0.625rem", //10px
			3: "0.75rem", //12px
			3.5: "0.875rem", //14px
			4: "1rem", //16px
			5: "1.25rem", //20px
			6: "1.5rem", //24px
			7: "1.75rem", //28px
			8: "2rem", //32px
			9: "2.25rem", //36px
			10: "2.5rem", //40px
			11: "2.75rem", //44px
			12: "3rem", //48px
			14: "3.5rem", //56px
			16: "4rem", //64px
			20: "5rem", //80px
			24: "6rem", //96px
		},
		extend: {
			colors: {
				white: colors.white,
				gray: {
					100: "rgba(240, 240, 244, 1)", //HOVER
					300: "rgba(209,209,209,1)", // FOOTER USED
					500: "rgba(185, 187, 200, 1)", //BORDERS
					700: "rgba(98, 99, 109, 1)", //SOLID
					900: "rgba(45, 45, 45, 1)",
					950: "rgba(35, 35, 39, 1)",
				},
				black: {
					950: "rgba(31, 31, 31, 1)",
					1000: "rgba(19, 19, 21, 1)",
				},
				focus: "#687CB0",
				error: "#FF2424",
			},
			backgroundImage: {
				"gradient-light":
					"linear-gradient(180deg, rgba(255, 255, 255, 0.80) 0%, rgba(255, 255, 255, 1) 100%)",
			},
			spacing: {
				0: "0px",
				0.5: "0.125rem", //2px
				1: "0.25rem", //4px
				1.5: "0.375rem", //6px
				2: "0.5rem", //8px
				2.5: "0.625rem", //10px
				3: "0.75rem", //12px
				3.5: "0.875rem", //14px
				4: "1rem", //16px
				5: "1.25rem", //20px
				6: "1.5rem", //24px
				7: "1.75rem", //28px
				8: "2rem", //32px
				9: "2.25rem", //36px
				10: "2.5rem", //40px
				11: "2.75rem", //44px
				12: "3rem", //48px
				14: "3.5rem", //56px
				16: "4rem", //64px
				18: "4.5rem", //72px
				20: "5rem", //80px
				24: "6rem", //96px
				28: "7rem", //112px
				32: "8rem", //128px
				36: "9rem", //144px
				40: "10rem", //160px
				44: "11rem", //176px
				48: "12rem", //192px
				52: "13rem", //208px
				56: "14rem", //224px
				60: "15rem", //240px
				64: "16rem", //256px
				72: "18rem", //288px
				80: "20rem", //320px
				96: "24rem", //384px
				106: "28rem",
				128: "32rem",
				144: "36rem",
				1660: "1600px",
			},
			borderRadius: {
				"4xl": "2rem",
				full: "1000px",
			},
		},
		borderWidth: {
			1: "1px",
			2: "2px",
			3: "3px",
			4: "4px",
			5: "5px",
		},
		boxShadow: {
			DEFAULT: "0 4px 8px rgba(0, 0, 0, 0.15)",
			line: "inset 0 -4px 0 0 rgb(255,255,255)",
			sm: "0 4px 4px rgba(0, 0, 0, 0.25)",
		},
		fontFamily: {
			text: ["Raleway", "sans-serif"],
			fixel: ["fixel", "sans-serif"],
			namu: ["namu", "sans-serif"],
			museo: ['"Museo Sans Cyr"', "sans-serif"],
		},
	},
};
