import { groq } from "next-sanity";
import { client } from "../../sanity/lib/client";
import Studio from "../../components/pages/studio/Studio";
import dynamic from "next/dynamic";
import PreviewStudio from "../../components/pages/studio/PreviewStudio";
import { getClient } from "../../sanity/lib/getClient";
import Header from "../../components/Header";

const PreviewProvider = dynamic(() =>
	import("../../components/PreviewProvider")
);

export const postQuery = groq`*[_type == "studio" && slug.current == $slug][0]{
  name
}`;

export const getStaticPaths = async () => {
	const paths = await client.fetch(
		groq`*[_type == "studio" && defined(slug.current)][]{
      "params": { "slug": slug.current }
    }`
	);

	return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
	const preview = context.draftMode || false;
	const previewToken = preview ? process.env.SANITY_READ_TOKEN : ``;
	const client = getClient(previewToken);
	const data = await client.fetch(postQuery, context.params);

	// if (!data) {
	// 	return {
	// 		notFound: true,
	// 	};
	// }

	return { props: { data, preview, previewToken } };
};

export default function StudioPage({ data, preview, previewToken }) {
	if (preview && previewToken) {
		return (
			<PreviewProvider previewToken={previewToken}>
				{/* <div className="bg-black text-white font-medium p-2 text-center text-xs uppercase">
					<Link href="/api/exit-preview">Exit preview</Link>
				</div> */}
				<PreviewStudio studio={data} />
			</PreviewProvider>
		);
	}
	return (
		<>
			<Header />
			<main className="px-20 mx-auto p-36">
				<div className="text-sm uppercase tracking-wider">Studio</div>
				<h1 className="text-6xl font-medium">{data.name}</h1>
			</main>
			{/* <Studio studio={data} /> */}
		</>
	);
}
