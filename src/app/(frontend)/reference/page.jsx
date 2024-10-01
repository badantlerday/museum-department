import SectionHeader from "@/components/SectionHeader";

export default async function References() {

	return (
		<>
			<section className="my-32 text-center">
				<h1 className="font-black uppercase text-5xl">References</h1>
				<div className="font-medium text-xl mt-4">Here is all types that we use to inter-link our content.</div>
			</section>

            <section className="my-32 px-18">
            <SectionHeader title="Categories" border={true} />
            </section>

            <section className="my-32 px-18">
            <SectionHeader title="Countries" border={true} />
            </section>

            <section className="my-32 px-18">
            <SectionHeader title="Cities" border={true} />
            </section>



		</>
	);
}