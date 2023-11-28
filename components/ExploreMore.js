import Link from "next/link";

export default function ExploreMore() {
	return (
		<section className="pb-36">
			<div className="px-20 mx-auto">
				<h2 className="font-medium text-2xl border-t border-[#E6E6E6] pt-6 pb-4">
					Explore more <span className="uppercase"></span>
				</h2>

				<div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
					<Link key="" href={`project/`}>
						<div className="w-full aspect-[3/4] bg-slate-100 mb-2"></div>
						<h3 className=" text-sm">Title</h3>
					</Link>
					<Link key="" href={`project/`}>
						<div className="w-full aspect-[3/4] bg-slate-100 mb-2"></div>
						<h3 className=" text-sm">Title</h3>
					</Link>
					<Link key="" href={`project/`}>
						<div className="w-full aspect-[3/4] bg-slate-100 mb-2"></div>
						<h3 className=" text-sm">Title</h3>
					</Link>
					<Link key="" href={`project/`}>
						<div className="w-full aspect-[3/4] bg-slate-100 mb-2"></div>
						<h3 className=" text-sm">Title</h3>
					</Link>
					<Link key="" href={`project/`}>
						<div className="w-full aspect-[3/4] bg-slate-100 mb-2"></div>
						<h3 className=" text-sm">Title</h3>
					</Link>
					<Link key="" href={`project/`}>
						<div className="w-full aspect-[3/4] bg-slate-100 mb-2"></div>
						<h3 className=" text-sm">Title</h3>
					</Link>
					<Link key="" href={`project/`}>
						<div className="w-full aspect-[3/4] bg-slate-100 mb-2"></div>
						<h3 className=" text-sm">Title</h3>
					</Link>
					<Link key="" href={`project/`}>
						<div className="w-full aspect-[3/4] bg-slate-100 mb-2"></div>
						<h3 className=" text-sm">Title</h3>
					</Link>
					<Link key="" href={`project/`}>
						<div className="w-full aspect-[3/4] bg-slate-100 mb-2"></div>
						<h3 className=" text-sm">Title</h3>
					</Link>
					<Link key="" href={`project/`}>
						<div className="w-full aspect-[3/4] bg-slate-100 mb-2"></div>
						<h3 className=" text-sm">Title</h3>
					</Link>
				</div>
			</div>
		</section>
	);
}
