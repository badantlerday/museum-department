import BecomeAPatron from '@/components/BecomeAPatron';
// https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
export async function generateMetadata({ params, searchParams }, parent) {
	return {
		title: "Become a Patron",
	};
}

// export function generateStaticParams() {
// 	// return ["/become-a-patron"];
// 	const pageSlug = "become-a-patron";
// 	return [
// 		{
// 		  slug: pageSlug,
// 		},
// 	  ];
//   }

export function generateStaticParams() {
	return ["/become-a-patron"];
  }

export default function BecomAPatron() {	

	return (
		<>
		<BecomeAPatron />
		</>
	);
}