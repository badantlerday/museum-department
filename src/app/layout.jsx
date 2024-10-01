import localFont from "next/font/local";
import "./globals.css";

const serif = localFont({
	src: [
		{
			path: "./fonts/Caslon/CaslonIonic-Light-Trial.woff2",
			weight: "300",
			style: "normal",
		},
		{
			path: "./fonts/Caslon/CaslonIonic-Regular-Trial.woff2",
			weight: "400",
			style: "normal",
		},
	],
	display: "swap",
	variable: "--font-serif",
});
const mono = localFont({
	src: [
		{
			path: "./fonts/Prestige/Prestige12PitchBT-Roman.woff2",
			weight: "300",
			style: "normal",
		},
	],
	display: "swap",
	variable: "--font-mono",
});
const sans = localFont({
	src: [
		{
			path: "./fonts/Unica77/Unica77LLWeb-Light.woff2",
			weight: "300",
			style: "normal",
		},
		{
			path: "./fonts/Unica77/Unica77LLWeb-Regular.woff2",
			weight: "400",
			style: "normal",
		},
		{
			path: "./fonts/Unica77/Unica77LLWeb-Medium.woff2",
			weight: "500",
			style: "normal",
		},
		{
			path: "./fonts/Unica77/Unica77LL-Bold.woff2",
			weight: "700",
			style: "normal",
		},
		{
			path: "./fonts/Unica77/Unica77LL-Black.woff2",
			weight: "900",
			style: "normal",
		},
	],
	display: "swap",
	variable: "--font-sans",
});

export const metadata = {
	title: "Museum Department",
	description: "Curating Contemporary Culture.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`${sans.variable} ${mono.variable} ${serif.variable}`}>
				{children}
			</body>
		</html>
	);
}
