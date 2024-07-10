import BecomeAPatron from '@/components/BecomeAPatron';
// https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
export async function generateMetadata({ params, searchParams }, parent) {
	
	return {
		title: "Search",
	};
}

export function generateStaticParams() {
	return ["/search"];
  }

export default async function BecomAPatron({ params }) {
	// const { slug } = params;
	

	return (
		<>
		<BecomeAPatron />
		</>
	);
}
