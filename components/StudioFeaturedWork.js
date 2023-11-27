export default function StudioFeaturedWork({ name, featuredWork }) {
	return (
		<section className="pb-36">
			<div className="px-20 mx-auto">
				<h2 className="font-medium text-2xl border-t border-[#E6E6E6] pt-6 pb-4">
					Featured Work by <span className="uppercase">{name}</span>
				</h2>
			</div>
			<div className="grid grid-cols-3 px-20 mx-auto gap-10">
				<div className="w-full aspect-[3/4] bg-slate-100 mb-2"></div>
				<div className="w-full aspect-[3/4] bg-slate-100 mb-2"></div>
				<div className="w-full aspect-[3/4] bg-slate-100 mb-2"></div>
			</div>
		</section>
	);
}
