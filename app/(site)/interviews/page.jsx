export const revalidate = 60;
import { client } from "@/lib/sanity.client";
import SectionHeader from "@/components/SectionHeader";
import Link from "next/link";
// import GridListing from "@/components/GridListing";

export default async function Interviews() {
  const interviews =
    await client.fetch(`*[_type == "interview" ] | order(name asc){
      _id,
      _type,
      title,
      slug,
    }`);

  // const projects = await client.fetch(`*[_type == "project" ] | order(name asc){
  //     _id,
  //     _type,
  // 		title,
  // 		slug,
  // 		posterImage{crop,hotspot,asset->},
  // 		studio->{name,_type,slug}
  //   }`);

  return (
    <>
      <section>
        <div className="px-18 mx-auto">
          <SectionHeader title="Interviews" border={true} />
        </div>
        {interviews.map((interview) => (
          <div key={interview._id} className="px-18 mx-auto">
            <Link href={`/interviews/${interview.slug.current}`}>
              <div className="text-4xl font-black uppercase">
                {interview.title}
              </div>
            </Link>
          </div>
        ))}
      </section>
    </>
  );
}
