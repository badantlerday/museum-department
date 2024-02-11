import Link from "next/link";
import { client } from "@/lib/sanity.client";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
const builder = imageUrlBuilder(client);
export default function ReferenceListItem({ data }) {
	const renderImage = (imageData) => {
		if (imageData) {
			return (
				<Image
					className="aspect-[3/4] mb-2 object-cover"
					src={builder.image(imageData).width(500).url()}
					width={500}
					height={665}
					blurDataURL={imageData.asset.metadata.lqip}
					placeholder="blur"
					alt={data?.name}
				/>
			);
		}
		return null;
	};

	// Prioritize posterImage over mainImage
	const imageToRender = data?.posterImage || data?.mainImage;

	return (
		<Link href={`/${data._type}/${data.slug.current}`}>
			{imageToRender ? (
				renderImage(imageToRender)
			) : (
				<div className="w-full aspect-[3/4] bg-slate-100 mb-2"></div>
			)}
			<h3 className=" text-sm font-medium tracking-[0.0075rem]">
				{data.title && <span>{data.title}</span>}
				{data.name && <span>{data.name}</span>}
			</h3>
			<span className="  capitalize text-sm font-medium tracking-[0.0075rem] text-[#aaa]">
				{data._type}
			</span>
		</Link>
	);
}
