export const revalidate = 10;
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/lib/sanity.client";
import Link from "next/link";

const builder = imageUrlBuilder(client);

// https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
export async function generateMetadata({ params, searchParams }, parent) {
	
	return {
		title: "Advertise",
	};
}

export default async function Search({ params }) {

    const currentDate = new Date().toISOString();

    const query = `*[_type == "advertise" && date >= "${currentDate}"] | order(date asc){
		_id,
        issue,
        date,
		price,
        sponsor1,
        classified1,
        classified2,
        classified3,
        classified4,
	  }`;
	const issues = await client.fetch(query);
    // console.log(issues);
	

	return (
		<>
        <h1 className="text-center text-7xl font-black mx-auto flex flex-col mt-56 mb-40 uppercase tracking-tight leading-[70px]">
          <span>Advertise in</span><span>museum departments</span><span>weekly newsletter</span>
        </h1>
			<div className="px-20 mx-auto">
            <div className="grid grid-cols-2 gap-8 mb-10">
                <div className="article">
                    <h2 className="text-lg">Information</h2>
                    <p>Promote your product, service or company to our very niched design audience.  Our newsletter is read primarily by graphic designers, type designers and other creative leaders and entrepreneurs. An audience with overlapping interests and often early adopters in tech/development, art, culture, food, productivity, self development and travel.</p>
                </div>
                <div>
                    <div className="grid grid-cols-2 gap-4 py-4 border-b border-md-grey-200">
                        <h3 className="font-medium">Subscribers</h3>
                        <p>+2200</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 py-4 border-b border-md-grey-200">
                        <h3 className="font-medium">Open / Click rate</h3>
                        <p>+2200</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 py-4 border-b border-md-grey-200">
                        <h3 className="font-medium">Top reader origins</h3>
                        <p>North America (54%)<br />
Europe (29%)<br />
Asia Pacific (11%)<br />
Other (6%)</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 py-4 border-b border-md-grey-200">
                        <h3 className="font-medium">Occupation profile</h3>
                        <p>People in creative and leadership roles working in tech, design, publishing, the arts and media</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 py-4 border-b border-md-grey-200">
                        <h3 className="font-medium">Focus</h3>
                        <p>Key topics include design, tech, sustainability, urbanism and more</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 py-4 ">
                        <h3 className="font-medium">Newsletter frequency</h3>
                        <p>Every Tuesday, 09:00 pm EST</p>
                    </div>
                </div>
            </div>
            {issues.map((issue) => (
                <div className="py-5 border-t border-md-grey-200" key={issue._id}>
                <div className="grid grid-cols-24 mb-10 gap-8">
                    <div className="col-span-3 font-medium text-lg">{issue.issue}</div>
                    <div className="col-span-3">{issue.date}</div>
                    <div className="col-span-6">
                        {issue.sponsor1.status ? <div className=" text-md-grey-300">Sponsor Slot already booked</div> : <div>Sponsor Slot available</div>}
                        {issue.classified1.status ? <div className=" text-md-grey-300">Classified Ad already booked</div> : <div>Classified Ad available</div>}
                        {issue.classified2.status ? <div className=" text-md-grey-300">Classified Ad already booked</div> : <div>Classified Ad available</div>}
                        {issue.classified3.status ? <div className=" text-md-grey-300">Classified Ad already booked</div> : <div>Classified Ad available</div>}
                        {issue.classified4.status ? <div className=" text-md-grey-300">Classified Ad already booked</div> : <div>Classified Ad available</div>}
                    </div>
                    <div className="col-span-6">
                        {issue.sponsor1.status ? <div className=" text-md-grey-300">-</div> : <div>{issue.price.sponsor}</div>}   
                        {issue.classified1.status ? <div className=" text-md-grey-300">-</div> : <div>{issue.price.classified}</div>}
                        {issue.classified2.status ? <div className=" text-md-grey-300">-</div> : <div>{issue.price.classified}</div>} 
                        {issue.classified3.status ? <div className=" text-md-grey-300">-</div> : <div>{issue.price.classified}</div>} 
                        {issue.classified4.status ? <div className=" text-md-grey-300">-</div> : <div>{issue.price.classified}</div>}    
                    </div>
                    <div className="col-span-6">
                        {issue.sponsor1.status ? <div className=" text-md-grey-300">-</div> : <div>Book this slot</div>}
                        {issue.classified1.status ? <div className=" text-md-grey-300">-</div> : <div>Book this ad</div>}
                        {issue.classified2.status ? <div className=" text-md-grey-300">-</div> : <div>Book this ad</div>}
                        {issue.classified3.status ? <div className=" text-md-grey-300">-</div> : <div>Book this ad</div>}
                        {issue.classified4.status ? <div className=" text-md-grey-300">-</div> : <div>Book this ad</div>}
                    </div>
                </div>
                </div>
                 ))}
                
			</div>
		</>
	);
}
