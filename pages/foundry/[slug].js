import { groq } from "next-sanity";
import { client } from "../../sanity/lib/client";
import dynamic from "next/dynamic";
import PreviewProject from "../../components/pages/project/PreviewProject";
import { getClient } from "../../sanity/lib/getClient";
import Header from "../../components/Header";
import Link from "next/link";
import Foundry from "../../components/pages/foundry/Foundry";
import Footer from "../../components/Footer";

const PreviewProvider = dynamic(() =>
	import("../../components/PreviewProvider")
);

export const projectQuery = groq`*[_type == "foundry" && slug.current == $slug][0]{
    name,
	slug
  }`;

export const getStaticPaths = async () => {
	const paths = await client.fetch(
		groq`*[_type == "foundry" && defined(slug.current)][]{
        "params": { "slug": slug.current }
      }`
	);

	return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
	const preview = context.draftMode || false;
	const previewToken = preview ? process.env.SANITY_READ_TOKEN : ``;
	const client = getClient(previewToken);
	const data = await client.fetch(projectQuery, context.params);

	return { props: { data, preview, previewToken } };
};

export default function ProjectPage({ data, preview, previewToken }) {
	// if (preview && previewToken) {
	// 	return (
	// 		<PreviewProvider previewToken={previewToken}>
	// 			<div className="bg-black text-white font-medium p-2 text-center text-xs uppercase hidden">
	// 				<Link href="/api/exit-preview">Exit preview</Link>
	// 			</div>
	// 			<PreviewProject project={data} />
	// 		</PreviewProvider>
	// 	);
	// }
	return (
		<>
			<Header />
			<Foundry foundry={data} />
			<Footer />
		</>
	);
}
