// https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
export async function generateMetadata({ params, searchParams }, parent) {
	
	return {
		title: "About — Museum Departments",
	};
}

export default function About({ params }) {
	

	return (
		<>
        <h1 className="text-center text-7xl font-black mx-auto flex flex-col mt-56 mb-40 uppercase tracking-tight leading-[70px]">
          <span>About</span><span>museum department</span>
        </h1>
		</>
	);
}
