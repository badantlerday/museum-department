const defaultTheme = require("tailwindcss/defaultTheme");
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
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
			colors: {
				'md-grey-100': '#FAFBF7',
				'md-grey-200': '#E6E6E6',
				'md-grey-300': '#AAAAAA',
				'md-black': '#1B1B1B',
			  },
		  },
	},
  plugins: [require('@tailwindcss/typography')({ className: 'tailwind-text-styles',})],
}
export default config
