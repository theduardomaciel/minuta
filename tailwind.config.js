/** @type {import('tailwindcss').Config} */

import colors from "./constants/colors.ts";

module.exports = {
	darkMode: "class",
	content: [
		"./app/**/*.{js,jsx,ts,tsx}",
		"./components/**/*.{js,jsx,ts,tsx}",
	],
	presets: [require("nativewind/preset")],
	theme: {
		extend: {
			colors: {
				neutral: "rgb(var(--neutral) / <alpha-value>)",
				primary: "rgb(var(--primary-100) / <alpha-value>)",
				secondary: "rgb(var(--primary-200) / <alpha-value>)",
			},
			borderColor: {
				default: "#6B6B6B",
			},
			fontFamily: {
				sans: ["Inter"],
				serif: ["SpaceMono"],
			},
			backgroundColor: {
				100: "rgb(var(--background-01) / <alpha-value>)",
				200: "rgb(var(--background-02) / <alpha-value>)",
				300: "rgb(var(--background-03) / <alpha-value>)",
				border: "#6B6B6B",
			},
		},
	},
	plugins: [
		({ addBase }) =>
			addBase({
				":root": {
					"--neutral": colors.dark.neutral,
					"--primary-100": colors.dark.primary[100],
					"--primary-200": colors.dark.primary[200],
					"--background-01": colors.dark.background[100],
					"--background-02": colors.dark.background[200],
					"--background-03": colors.dark.background[300],
				},
			}),
	],
};
