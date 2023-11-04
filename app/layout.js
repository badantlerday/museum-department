import localFont from "next/font/local";
import "./globals.css";

const serif = localFont({
	src: [
		{
			path: "../public/fonts/Plantin/PlantinMTProLight.ttf",
			weight: "300",
			style: "normal",
		},
	],
	display: "swap",
	variable: "--font-serif",
});
const mono = localFont({
	src: [
		{
			path: "../public/fonts/Prestige/Prestige12PitchBT-Roman.woff2",
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
			path: "../public/fonts/Unica77/Unica77LLWeb-Regular.woff2",
			weight: "400",
			style: "normal",
		},
		{
			path: "../public/fonts/Unica77/Unica77LLWeb-Medium.woff2",
			weight: "500",
			style: "normal",
		},
	],
	display: "swap",
	variable: "--font-sans",
});

export const metadata = {
	title: "Museum Department",
	description: "Curating Contemporary Culture",
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
