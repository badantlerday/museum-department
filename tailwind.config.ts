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
	},
  plugins: [require('@tailwindcss/typography')({ className: 'tailwind-text-styles',})],
}
export default config
