const defaultTheme = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		...defaultTheme,
		// Overriding fontFamily to use @next/font loaded families
		fontFamily: {
			sans: "var(--font-sans)",
			mono: "var(--font-mono)",
			serif: "var(--font-serif)",
		},
	},
	plugins: [],
};
