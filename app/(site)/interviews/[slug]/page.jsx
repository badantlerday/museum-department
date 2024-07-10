import { client } from "@/lib/sanity.client";
import { sanityFetch } from "@/lib/sanity.fetch";
import Link from "next/link";
// import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
// import { format } from 'date-fns';
import Blocks from "@/components/Blocks"
// import BookmarkButton from "@/components/BookmarkButton";
import SectionHeader from "@/components/SectionHeader";
import Footnote from "@/components/blocks/Footnote";

// Define the components object to map the custom footnote annotation
const components = {
    marks: {
      footnote: Footnote
    }
  };

const builder = imageUrlBuilder(client);


// https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
export async function generateMetadata({ params, searchParams }, parent) {
  const query = `*[_type == "interview" && slug.current == $slug][0]{
		title,
	  }`;
  const interview = await sanityFetch({ query, params, tags: ["interview"] });

  return {
    title: interview.title,
  };
}
//  (SSG) prerendered as static HTML
export async function generateStaticParams() {
  const query = `*[_type == "interview" ]`
  const interviews = await client.fetch(query);
 
  return interviews.map((interview) => ({
    slug: interview.slug.current,
  }))
}

export default async function Page({ params }) {
  const query = `*[_type == "interview" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    body,
    excerpt,
    }`;
  const interview = await sanityFetch({ query, params, tags: ["interview"] });

// Filter out blocks with footnotes
const footnoteBlocks = interview.body.filter(block =>
    block._type === 'block' && block.markDefs && block.markDefs.some(mark => mark._type === 'footnote')
  );
  
  const slides = [
    { id: 1, color: 'bg-red-500' },
    { id: 2, color: 'bg-green-500' },
    { id: 3, color: 'bg-blue-500' }
  ];

  return (
    <>
    <section className="py-20">
        <div className="px-18 mx-auto text-center font-black uppercase text-3xl mb-4">
            {interview.title}
        </div>
        <div className="max-w-xl mx-auto text-center">
            <p>Mollit laborum voluptate tempor ea sit sunt quis irure ullamco consequat quis ea amet dolore. Ullamco cupidatat consequat qui tempor id aute ex duis excepteur ut cillum. Sunt mollit nostrud aute qui voluptate laborum elit cillum commodo sit ea adipisicing tempor in. Aute reprehenderit fugiat fugiat enim. Deserunt sit esse id qui consequat enim veniam fugiat.</p>
        </div>
        <div className="grid grid-cols-24 place-content-center my-14">
            <div className=" col-start-11 col-span-4">
                <div className="aspect-[3/4] relative bg-md-grey-200 h-full mx-auto"></div>
            </div>
        </div>
        <div className="px-18 text-center">
        A conversation between Veniam do magna ullamco aliqua anim fugiat irure et non veniam. Eiusmod nisi incididunt magna aute proident.
        </div>
    </section>
    <section className="py-40">
        <div className="px-18 mx-auto grid grid-cols-24">
            <div className="col-start-5 col-span-16 text-2xl">
            Est laboris dolore excepteur labore adipisicing consequat veniam eiusmod. Deserunt tempor aute sunt eiusmod proident id. Ex velit ea veniam incididunt laboris et mollit est veniam exercitation sit. Quis nulla qui culpa consequat esse.
            </div>
        </div>
    </section>
    <section className="pt-20">
        <div className="px-18 mx-auto">
            <div className="grid grid-cols-24 bg-slate-100_">
            <div className="col-start-2 col-span-4 bg-slate-200_ relative">
                <div className="sticky top-0 font-mono text-xs h-screen bg-red-300_">
                    <div className="sticky top-4 pb-60 text-md-grey-400">
                        <div className="uppercase mb-4">References</div>
                        {/* Loop through interview.body to find footnotes */}
                        <ol className="">
                        {footnoteBlocks.map((block,index) => (
                            block.markDefs.map(mark => (
                            mark._type === 'footnote' && (
                                <li key={mark._key}>{mark.text}</li>
                            )
                            ))
                        ))}
                        </ol>
                    </div>
                    <div className="absolute bottom-4 w-full pr-4">
                        <div className="aspect-[4/3] bg-md-grey-100"></div>
                        <div className="mt-4">Reference Content</div>
                    </div>
                </div>

            </div>
            <div className="col-start-6 col-span-14 space-y-10">
                <PortableText value={interview.body} components={components} />
                ----
                <div className="px-18 space-y-10">
                <p>Do anim aliqua enim qui. Laborum ut do veniam sint elit do et tempor et ut. Consectetur in nostrud proident qui exercitation. Adipisicing cillum reprehenderit occaecat reprehenderit qui cillum nostrud adipisicing.</p>
                <p>Do anim aliqua enim qui. Laborum ut do veniam sint elit do et tempor et ut. Consectetur in nostrud proident qui exercitation. Adipisicing cillum reprehenderit occaecat reprehenderit qui cillum nostrud adipisicing.</p>
                <p>Do anim aliqua enim qui. Laborum ut do veniam sint elit do et tempor et ut. Consectetur in nostrud proident qui exercitation. Adipisicing cillum reprehenderit occaecat reprehenderit qui cillum nostrud adipisicing.</p>
                </div>

                <div className="aspect-video relative bg-md-grey-200"></div>

                <div className="px-18 space-y-10">
                <p>Do anim aliqua enim qui. Laborum ut do veniam sint elit do et tempor et ut. Consectetur in nostrud proident qui exercitation. Adipisicing cillum reprehenderit occaecat reprehenderit qui cillum nostrud adipisicing.</p>
                <p>Do anim aliqua enim qui. Laborum ut do veniam sint elit do et tempor et ut. Consectetur in nostrud proident qui exercitation. Adipisicing cillum reprehenderit occaecat reprehenderit qui cillum nostrud adipisicing.</p>
                <p>Do anim aliqua enim qui. Laborum ut do veniam sint elit do et tempor et ut. Consectetur in nostrud proident qui exercitation. Adipisicing cillum reprehenderit occaecat reprehenderit qui cillum nostrud adipisicing.</p>
                </div>

                <div className=" aspect-[4/3] ">
                    <div className="aspect-[3/4] relative bg-md-grey-200 h-full mx-auto"></div>
                </div>

                <div className="px-18 space-y-10">
                <p>Do anim aliqua enim qui. Laborum ut do veniam sint elit do et tempor et ut. Consectetur in nostrud proident qui exercitation. Adipisicing cillum reprehenderit occaecat reprehenderit qui cillum nostrud adipisicing.</p>
                <p>Do anim aliqua enim qui. Laborum ut do veniam sint elit do et tempor et ut. Consectetur in nostrud proident qui exercitation. Adipisicing cillum reprehenderit occaecat reprehenderit qui cillum nostrud adipisicing.</p>
                <p>Do anim aliqua enim qui. Laborum ut do veniam sint elit do et tempor et ut. Consectetur in nostrud proident qui exercitation. Adipisicing cillum reprehenderit occaecat reprehenderit qui cillum nostrud adipisicing.</p>
                </div>

                <div className="text-center">***</div>
            </div>
            </div>
        </div>
    </section>
    <section className="py-40">
        <div className="px-18 mx-auto">
        <SectionHeader title="More Interviews" border={true} />
        <div className="grid grid-cols-4 gap-4">
            <div>
                <div className="bg-md-grey-100 aspect-[3/4]"></div>
                <div className="mt-2">
                    <h3 className="text-xs font-medium tracking-[0.0075rem] uppercase">
                        Name
                    </h3>
                    <span className="text-xs font-medium italic block">
                    Location
                    </span>
                </div>
            </div>
        </div>
        </div>
    </section>

    </>
  );
}
