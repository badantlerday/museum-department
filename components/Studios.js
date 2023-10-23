import Link from "next/link";

export default function Posts({ studios = [] }) {
	const title = studios.length === 1 ? `Studio` : `Studios`;

	return (
		<>
			<div className="px-20 mx-auto grid grid-cols-1">
				<h2 className="text-2xl py-4 font-medium relative">
					{title}
					<span className=" text-[12px] absolute mt-[-8px] ml-1">
						{studios.length}
					</span>
				</h2>
				<div className="grid grid-cols-5 gap-4">
					{studios.map((post) => (
						<Link
							key={post._id}
							href={`/studio/${post.slug.current}`}
							passHref
							className="py-1 "
						>
							<div className="w-full aspect-[3/4] bg-slate-100 mb-2"></div>
							<span className="">{post.name}</span>
							<span className="text-xs tracking-wider block">
								{" "}
								{post.location[0].name}, {post.location[0].country.name}
							</span>
						</Link>
					))}
				</div>
			</div>
		</>
	);
}
