export default function Highlights() {
	return (
        <>
        <section className="px-20 mx-auto">
		<div className="grid grid-cols-6 gap-4">
        <h2 className="text-2xl font-medium relative col-span-4 col-start-2">
        Highlights
        </h2>
        <div className=" col-span-2 col-start-2">
            <div className="w-full aspect-[3/4] bg-[#F5F5EE] mb-2"></div>
            <h3 className=" text-sm">NAME</h3>
        </div>
        <div className=" col-span-2 col-start-4">
            <div className="w-full aspect-[3/4] bg-[#F5F5EE] mb-2"></div>
            <h3 className=" text-sm">NAME</h3>
        </div>
		</div>
        </section>
        </>
	);
}
