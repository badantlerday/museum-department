import Link from "next/link";

const AnimatedLink = ({ text, hoverText, url }) => {
	const displayHoverText = hoverText || text;
	return (
		<Link
			href={url}
			className=" inline-block overflow-hidden cursor-pointer group h-[20px] text-sm uppercase font-medium tracking-wide text-center"
		>
			<div className=" group-hover:-translate-y-[100%] transition-all duration-300">
				{text}
			</div>
			<div className=" group-hover:-translate-y-[100%] transition-all duration-300 ">
				{displayHoverText}
			</div>
		</Link>
	);
};
export default AnimatedLink;
