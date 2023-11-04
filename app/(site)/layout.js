import Footer from "@/components/Footer";
import Header from "@/components/Header";

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
