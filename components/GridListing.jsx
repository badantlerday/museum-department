import PosterCard from './PosterCard'
export default function GridListing({data,title,aspect,image,limit=18,columns="grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"}) {

    // Check if data is falsy or empty
    if (!data || data.length === 0) {
        return null;  // Return nothing if data is empty or 0
    }

	return (
        <div className="px-10 lg:px-18 mx-auto mb-40 ">
			<div className="flex gap-10 border-t border-md-grey-200 pt-4">
				<h3 className=" text-xl font-medium mb-4">{title}</h3>
				{/* <h3 className=" text-xl font-medium mb-4 text-md-grey-300">Shuffle</h3> */}
			</div>
			<div className={`grid ${columns} gap-x-4 gap-y-8`}>
				{data?.slice(0,limit).map((item) => (
					<PosterCard data={{item}} key={item._id} aspect={aspect} image={image} />
				))}
			</div>
		</div>
    )
}