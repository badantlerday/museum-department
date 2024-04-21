export default function SellWithUs() {
	return (
        <section className="py-20">
            <div className="px-4 lg:px-16 mx-auto">
                <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 border-t border-md-grey-200 pt-6">
                    <div className="article font-medium pr-28">
                        <h2 className="mb-4 uppercase">Sell With Us</h2>
                        <p>We are inviting creators to sell their digital goods with us. Mockups, templates, graphic effects, treatments, typefaces, Notion templates.</p>
                        <p>Submit your work, and if we think it’s a good fit, we’ll reach out as soon as possible about next steps.</p>
                        <div>
                            <a
                                href="/"
                                className="mt-4 inline-block border border-black p-3 text-xs uppercase tracking-wide hover:bg-black hover:text-white transition-all"
                            >
                                Reach Out
                            </a>
                        </div>
                    </div>
                    <div>
                        <div className=" bg-md-grey-100 aspect-[4/3] w-full"></div>
                    </div>
                </div>
            </div>
        </section>
    )
};