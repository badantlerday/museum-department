import Link from "next/link";
import { client } from "@/lib/sanity.client";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
const builder = imageUrlBuilder(client);
export default function ItemsRow({ title = "Title", link, data }) {
	return (
		<div className="grid grid-cols-6 gap-4 my-10">
			<div className="border-t border-b border-md-grey-200 py-2 grid grid-cols-2 relative">
				<h2 className="uppercase font-light text-3xl leading-9 ">{title}</h2>
				<Link href={link} className="uppercase font-medium col-span-2 absolute bottom-2 text-xs tracking-[3%]">
					Explore more
				</Link>
			</div>
			
			{/* {[...Array(5)].map((_, index) => ( */}
			{data?.slice(0,5).map((item, index) => (
			<div key={item._id} className="border-t border-b border-md-grey-200 py-2 grid grid-cols-2">
				<div className="mr-2">
				{/* <div className="aspect-[4/5] bg-md-grey-200 mr-2"></div> */}
				{item.posterImage || item.posterImage ? (
                        
                        <Image
                        className="aspect-[4/5] object-cover"
                        src={builder
                            .image(item.posterImage || item.posterImage)
                            .width(500)
                            .url()}
                        width={200}
                        height={400}
                        blurDataURL={
                            (item.posterImage || item.posterImage).asset
                                .metadata.lqip
                        }
                        placeholder="blur"
                        alt={item.title}
                    />
                    ) : (
                        <div className="aspect-[4/5] bg-md-grey-200 mr-2"></div>
                    )}
				</div>
				<div className="flex flex-col text-xs">
					<div className="grow uppercase font-medium tracking-[3%] flex flex-col">
					{item.fontsInUse.map((font) => (
						<div key={font._id}>
							{font.name}
						</div>
					))}	
					</div>
					<div className=" text-black">{item.title}</div>
				</div>
			</div>
			))}
		</div>

	);
}
