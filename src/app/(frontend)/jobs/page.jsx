// import { getStudios } from "@/sanity/lib/queries";
// import { sanityFetch } from "@/sanity/lib/client";
import StudioList from "@/components/StudioList";
// import { Suspense } from "react";

// https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
export async function generateMetadata({ params, searchParams }, parent) {
	
	return {
		title: "Jobs — Museum Departments",
	};
}

export default function Jobs({ params }) {
	// const studios = await sanityFetch({ query: getStudios })
	return (
		<>
        <h1 className="text-center text-7xl font-black mx-auto flex flex-col mt-56 mb-40 uppercase tracking-tight leading-[70px]">
          Jobs
        </h1>
		{/* <Suspense fallback={<div className="px-18 max-w-4xl mx-auto text-xs uppercase">Loading...</div>}> */}
			<StudioList />
		{/* </Suspense> */}
		</>
	);
}
