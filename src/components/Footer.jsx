import Image from 'next/image'
export default async function Footer() {
    return (
        <footer className="text-sm pt-80 pb-4 px-4 lg:px-18">			

			<Image
				src="/museum-department.svg"
				width={13}
				height={13}
				className="w-full h-auto my-4"
				alt="Cover"
			/>

            {/* <div className="px-4 lg:px-18 grid grid-cols-24">
                <div className=" col-span-6">
                    First
                </div>
                <div className="col-start-8 col-span-4">
                    First
                </div>
                <div className="col-start-12 col-span-4">
                    First
                </div>
                <div className=" col-span-8">
                    First
                </div>
            </div> */}

        </footer>
    )
}