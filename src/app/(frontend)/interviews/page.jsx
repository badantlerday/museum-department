// export const revalidate = 60;
import { sanityFetch } from "@/sanity/lib/client";
import { getInterviews } from "@/sanity/lib/queries";
import Link from "next/link";

export default async function Interviews() {
  const interviews = await sanityFetch({
    query: getInterviews
  });
  

  return (
    <section className="mt-40 text-center">
      {interviews.map((interview) => {
        const minutes = Math.ceil(interview.readTime);

        return (
          <div key={interview._id} className="px-18 mx-auto">
            <p className="text-xs font-mono text-md-grey-400 uppercase mb-2">
              {minutes} min read
            </p>
            <Link href={`/interviews/${interview.slug.current}`}>
              <div className="text-5xl font-serif font-light uppercase">
                {interview.title}
              </div>
            </Link>
            <div className="pt-4 font-serif font-light max-w-xl mx-auto">
              {interview.excerpt}
            </div>
          </div>
        );
      })}
    </section>
  );
}
