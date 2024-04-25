
export default function ItemsRow({ title = "Title", link, data }) {
	// console.log(foundries)
	
	return (

		<div className="grid grid-cols-6 gap-4 my-10">
			<div className="border-t border-b border-md-grey-200 py-2 grid grid-cols-2 relative">
				<h2 className="uppercase font-light text-3xl leading-9 ">{title}</h2>
				<div className="uppercase font-medium col-span-2 absolute bottom-2 text-xs tracking-[3%]">
					View all items in store
				</div>
			</div>
			{[...Array(5)].map((_, index) => (
			<div key={index} className="border-t border-b border-md-grey-200 py-2 grid grid-cols-2">
				<div>
				<div className="aspect-[4/5] bg-md-grey-200 mr-2"></div>
				</div>
				<div className="flex flex-col text-xs">
					<div className="grow uppercase font-medium tracking-[3%] flex flex-col">
						<span>Gl06</span>
						<span>Infopoint</span>
						<span>Directory</span>
					</div>
					<div className="font-mono text-md-grey-300">Mockup</div>
				</div>
			</div>
			))}
		</div>

	);
}
