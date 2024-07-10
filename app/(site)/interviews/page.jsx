export const revalidate = 60;
import { client } from "@/lib/sanity.client";
import MasonryGridLeftRight from "@/components/MasonryGridLeftRight";
import SectionHeader from "@/components/SectionHeader";
// import { Link } from "lucide-react";
import Link from "next/link";

export default async function Interviews() {

	const interviews = await client.fetch(`*[_type == "interview" ] | order(name asc){
        _id,
		_type,
		title,
		slug,
      }`);


	return (
		<>
        <section>
            <div className="px-18 mx-auto">
            <SectionHeader title="Interviews" border={true} />
            </div>
            {interviews.map((interview) => (
            <div key={interview._id} className="px-18 mx-auto">
                <Link href={`/interviews/${interview.slug.current}`}>
                <div className="text-4xl font-black uppercase">{interview.title}</div>
                </Link>
            </div>
))}
        </section>
		</>
	);
}
