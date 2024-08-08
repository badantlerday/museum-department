
// import dynamic from 'next/dynamic'
// import {draftMode} from 'next/headers'
// import {token} from '@/lib/sanity.fetch'
// import Footer from "@/components/Footer";
import FooterSmall from "@/components/FooterSmall";
import Header from "@/components/Header";
import { Toaster } from 'sonner';
// import { VisualEditing } from "next-sanity";

import localFont from "next/font/local";
import '../globals.css'

const serif = localFont({
	src: [
		{
			path: "../../public/fonts/Caslon/CaslonIonic-Light-Trial.woff2",
			weight: "300",
			style: "normal",
		},
		{
			path: "../../public/fonts/Caslon/CaslonIonic-Regular-Trial.woff2",
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
			path: "../../public/fonts/Prestige/Prestige12PitchBT-Roman.woff2",
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
			path: "../../public/fonts/Unica77/Unica77LLWeb-Light.woff2",
			weight: "300",
			style: "normal",
		},
		{
			path: "../../public/fonts/Unica77/Unica77LLWeb-Regular.woff2",
			weight: "400",
			style: "normal",
		},
		{
			path: "../../public/fonts/Unica77/Unica77LLWeb-Medium.woff2",
			weight: "500",
			style: "normal",
		},
		{
			path: "../../public/fonts/Unica77/Unica77LL-Bold.woff2",
			weight: "700",
			style: "normal",
		},
		{
			path: "../../public/fonts/Unica77/Unica77LL-Black.woff2",
			weight: "900",
			style: "normal",
		},
	],
	display: "swap",
	variable: "--font-sans",
});


export default function RootLayout({children}) {
	return (
	  <html lang="en">
		<body className={`${sans.variable} ${mono.variable} ${serif.variable}`}>
		  <Header />
			{children}
		  <FooterSmall />
		  <Toaster
		  toastOptions={{
		  }}
		  />
		  {/* {draftMode().isEnabled && <VisualEditing />} */}
		</body>
	  </html>
	)
  }