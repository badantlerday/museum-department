// PREVIW
// https://github.com/sanity-io/sanity-template-nextjs-app-router-personal-website/blob/main/app/(personal)/layout.tsx
import Footer from "@/components/Footer";
import Header from "@/components/Header";
// export const revalidate = 60;
export const metadata = {
	title: "Museum Department",
	description: "Curating Contemporary Culture",
};

export default function IndexRoute({ children }) {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	);
}
