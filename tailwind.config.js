/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

const generateGrid = (size) => {
	const gridColumn = {};
	const gridTemplateColumns = {};
	const gridRow = {};
	const gridTemplateRows = {};
	const gridRowStart = {};
	const gridRowEnd = {};
	const gridColumnStart = {};
	const gridColumnEnd = {};

	for (let i = 1; i <= size; i++) {
		const spanKey = `span-${i}`;
		gridColumn[spanKey] = `span ${i} / span ${i}`;
		gridTemplateColumns[i] = `repeat(${i}, minmax(0, 1fr))`;
		gridTemplateRows[i] = `repeat(${i}, minmax(0, 1fr))`;
		gridRowStart[i] = `${i}`;
		gridRowEnd[i] = `${i}`;
		gridColumnStart[i] = `${i}`;
		gridColumnEnd[i] = `${i}`;
	}

	return {
		gridColumn,
		gridTemplateColumns,
		gridRow,
		gridTemplateRows,
		gridRowStart,
		gridRowEnd,
		gridColumnStart,
		gridColumnEnd,
	};
};

module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		...defaultTheme,
		// Overriding fontFamily to use @next/font loaded families
		fontFamily: {
			sans: "var(--font-sans)",
			mono: "var(--font-mono)",
			serif: "var(--font-serif)",
		},
		extend: {
			...generateGrid(24),
			letterSpacing: {
				wide: "3%",
			},
			colors: {
				"md-grey-100": "#FAFBF7",
				"md-grey-200": "#E6E6E6",
				"md-grey-300": "#AAAAAA",
				"md-grey-400": "#666666",
				"md-grey-500": "#555555",
				"md-grey-600": "#1B1B1B",
				"md-black": "#1B1B1B",
			},
			spacing: {
				17: "4.25rem",
				18: "4.5rem",
				19: "4.75rem",
			},
			keyframes: {
				fadeIn: {
					"0%": { opacity: "0" },
					"100%": { opacity: "100%" },
				},
			},
			animation: {
				fadeIn: "fadeIn 0.5s ease forwards",
			},
		},
	},
	plugins: [
		require("@tailwindcss/typography")({ className: "tailwind-text-styles" }),
	],
};
