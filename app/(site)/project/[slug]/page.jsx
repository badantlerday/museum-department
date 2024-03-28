// import { client } from "../../../../sanity/lib/client";
import { client } from "@/lib/sanity.client";
import { sanityFetch } from "@/lib/sanity.fetch";
import Link from "next/link";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";

const builder = imageUrlBuilder(client);

// https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
export async function generateMetadata({ params, searchParams }, parent) {
  const query = `*[_type == "project" && slug.current == $slug][0]{
		title,
	  }`;
  const project = await sanityFetch({ query, params, tags: ["project"] });

  return {
    title: project.title,
  };
}

export default async function Page({ params }) {
  const query = `*[_type == "project" && slug.current == $slug][0]{
		title,
		slug,
		information,
    mainImage{crop,hotspot,asset->},
		fontsInUse[]->{
			name,
			slug,
			foundry->{
				name,
				slug
			}
		},
		gallery{
			images[]{
				_key,
				display,
				asset->
			}
		},
		studio->{
			_id, name, slug,
			location[]->{
				_id, name, country->{name,slug},slug
			  }
		},
		credits[]{title,people[]->{_id,name,slug}},
	  }`;
  const project = await sanityFetch({ query, params, tags: ["project"] });

//   <section>
//   <div className="mx-auto px-16 pb-48">
//     <div className="grid grid-cols-24 gap-4">
//     <h2 className="text-xl font-medium col-span-full col-start-3">New Fonts Gallery</h2>
//       <div className="col-start-3 col-end-12">
//         <div className="bg-slate-200 aspect-[3/4] mb-2"></div>
//         <span className="text-xs font-medium tracking-wide block uppercase">
//           Foundry
//         </span>
//         <span className="text-xs font-medium italic block">
//             country and city
//         </span>
//       </div>
//       <div className="bg-slate-200 col-start-14 col-end-23 aspect-[3/4]"></div>					
//     </div>
//   </div>
// </section>
// <div className="grid grid-cols-24 gap-4">
// <div className=" col-start-5 col-span-13 bg-slate-600 ">sd</div>
// {project?.mainImage &&
//         <div className=" col-start-5 col-span-15 bg-slate-200 ">
//           sdsd
//           {/* <Image
//             className=""
//             src={builder.image(project.mainImage).width(1500).quality(100).url()}
//             width={1500}
//             height={1500}
//             alt={project.mainImage?.alt || ""}
//           /> */}
//         </div>
         
//       }
// </div>


  return (
    <>
    <section className="pt-40">
			<div className="mx-auto px-16 pb-48">
				<div className="grid grid-cols-24 gap-4">
					
						<div className="bg-slate-200 col-start-5 col-span-16 mb-2">
            {project?.mainImage &&
        <div className=" col-start-5 col-span-15 bg-slate-200 ">
          <Image
            className=""
            src={builder.image(project.mainImage).width(1500).quality(100).url()}
            width={1500}
            height={1500}
            alt={project.mainImage?.alt || ""}
          />
        </div>
         
      }
            </div>

            
							
				</div>
			</div>
		</section>
      <section className="mx-auto flex h-[600px] flex-col justify-center px-20 text-center text-2xl font-medium tracking-[0.0075]">
        <h1 className="mb-1 uppercase">{project?.title}</h1>
        <p className="">
          Designed by{" "}
          <Link
            href={`/studio/${project.studio.slug.current}`}
            className="underline decoration-slate-300 underline-offset-[6px] transition-colors hover:decoration-slate-600"
          >
            {project.studio.name}
          </Link>{" "}
          from{" "}
          <Link
            href={`/city/${project.studio.location[0].slug.current}`}
            className="underline decoration-slate-300 underline-offset-[6px] transition-colors hover:decoration-slate-600"
          >
            {project.studio.location[0].name}
          </Link>
          ,{" "}
          <Link
            href={`/country/${project.studio.location[0].country.slug.current}`}
            className="underline decoration-slate-300 underline-offset-[6px] transition-colors hover:decoration-slate-600"
          >
            {project.studio.location[0].country.name}
          </Link>
        </p>
      </section>
      <section className="pb-36">
        <div className="grid items-start px-6 md:grid-cols-6 md:gap-10 md:px-20">
          <div className="_space-y-4 order-2 col-span-4 grid grid-cols-2 gap-4 md:order-none">
            {project.gallery?.images?.map((item, index) => (
              <Image
                key={item._key}
                className={` object-cover ${
                  item.display === "2col"
                    ? "col-span-2 aspect-[4/3]"
                    : "aspect-[3/4]"
                }`}
                src={builder.image(item).width(2000).url()}
                width={2000}
                height={1500}
                blurDataURL={item.asset.metadata.lqip}
                placeholder="blur"
                alt="alt"
              />
            ))}
            {/* <div className=" aspect-video bg-slate-200"></div>
						<div className=" aspect-video bg-slate-200"></div>
						<div className="grid grid-cols-2 gap-4">
							<div className=" aspect-[3/4] bg-slate-200"></div>
							<div className=" aspect-[3/4] bg-slate-200"></div>
						</div>

						<div className=" aspect-video bg-slate-200"></div>
						<div className=" aspect-video bg-slate-200"></div> */}
          </div>
          <div className="article _md:sticky _md:top-24 order-1 col-span-2 mb-10 font-medium md:order-none md:mb-0">
            <PortableText value={project?.information} />
            {/* <p>
							Established in 1985, Sundance Film Festival is the largest and
							longest-running independent film festival in the United States.
							They’ve fostered new voices and risk-taking films, debuting iconic
							titles of the indie canon: American Psycho to Love & Basketball,
							Call Me by Your Name to CODA, Little Miss Sunshine to Fair Play.
						</p>
						<p>
							Established in 1985, Sundance Film Festival is the largest and
							longest-running independent film festival in the United States.
							They’ve fostered new voices and risk-taking films, debuting iconic
							titles of the indie canon: American Psycho to Love & Basketball,
							Call Me by Your Name to CODA, Little Miss Sunshine to Fair Play.
						</p>

						<p>
							Established in 1985, Sundance Film Festival is the largest and
							longest-running independent film festival in the United States.
							They’ve fostered new voices and risk-taking films, debuting iconic
							titles of the indie canon: American Psycho to Love & Basketball,
							Call Me by Your Name to CODA, Little Miss Sunshine to Fair Play.
						</p> */}

            <div className=" py-5">
              <h2 className=" mb-2 text-xs font-medium uppercase tracking-wide">
                Fonts in use
              </h2>
              <ul className=" space-y-2 font-mono text-sm">
                {project.fontsInUse?.map((font, index) => (
                  <li key={index}>
                    <Link
                      href={`/font/${font.slug.current}`}
                      className="underline decoration-slate-300 underline-offset-[6px] transition-colors hover:decoration-slate-600"
                    >
                      {font.name}
                    </Link>{" "}
                    by{" "}
                    <Link
                      href={`/foundry/${font.foundry.slug.current}`}
                      className="underline decoration-slate-300 underline-offset-[6px] transition-colors hover:decoration-slate-600"
                    >
                      {font.foundry.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {project.credits?.map((credit, index) => (
              <div key={index} className=" py-5">
                <h2 className=" mb-2 text-xs font-medium uppercase tracking-wide">
                  {credit.title}
                </h2>
                <ul className=" space-y-1 font-mono text-sm">
                  {credit.people?.map((person, index) => (
                    <li key={person._id}>
                      <Link
                        href={`/person/${person.slug.current}`}
                        className="underline decoration-slate-300 underline-offset-[6px] transition-colors hover:decoration-slate-600"
                      >
                        {person.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
