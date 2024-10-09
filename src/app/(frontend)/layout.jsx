import "@/app/globals.css";
import localFont from "next/font/local";
import { VisualEditing } from 'next-sanity'
import { draftMode } from 'next/headers'
import { Toaster } from 'sonner';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const serif = localFont({
	src: [
		{
			path: "../fonts/Caslon/CaslonIonic-Light-Trial.woff2",
			weight: "300",
			style: "normal",
		},
		{
			path: "../fonts/Caslon/CaslonIonic-Regular-Trial.woff2",
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
			path: "../fonts/Prestige/Prestige12PitchBT-Roman.woff2",
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
			path: "../fonts/Unica77/Unica77LLWeb-Light.woff2",
			weight: "300",
			style: "normal",
		},
		{
			path: "../fonts/Unica77/Unica77LLWeb-Regular.woff2",
			weight: "400",
			style: "normal",
		},
		{
			path: "../fonts/Unica77/Unica77LLWeb-Medium.woff2",
			weight: "500",
			style: "normal",
		},
		{
			path: "../fonts/Unica77/Unica77LL-Bold.woff2",
			weight: "700",
			style: "normal",
		},
		{
			path: "../fonts/Unica77/Unica77LL-Black.woff2",
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
        <Header />
        {draftMode().isEnabled && (
          <a
            className="fixed right-0 bottom-0 text-[9px] uppercase tracking-wide font-medium rounded-sm bg-md-grey-200 text-md-grey-600 py-2 px-3 m-4 z-50 hover:bg-black hover:text-white transition-colors"
            href="/api/draft-mode/disable"
          >
            Disable preview
          </a>
        )}  
        {children}
        {draftMode().isEnabled && <VisualEditing />}
        <Toaster toastOptions={{}} />
        <Footer />
      </body>
    </html>
  );
}

