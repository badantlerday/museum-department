import Image from 'next/image';
export default function BecomeAPatron() {
	return (
        <section className="px-18 mx-auto grid grid-cols-24 mt-60 gap-4">
        <div className=" col-start-3 col-end-11">
        <h2 className='uppercase font-medium mb-4'>Become a patron<span className="block">Curate your own content</span></h2>
        <div className="space-y-4 text-xl">
            <p>As a patron, you can bookmark all your favorite content and have it neatly organized and categorized, all in one place. You can bookmark any content, including your favorite design studios, projects, foundries, fonts, interviews
            and job listings.</p>
            <p>Signing up for an entire year is 20% cheaper. Thanks for your supporting Museum Department.</p>
            </div>
        </div>
        <div className=" col-start-13 col-end-23 bg-slate-400">
          <Image src="/patron-view-placeholder.jpg" alt="Become a patron" width={1500} height={1500} />
        </div>    
      </section>
    )
};


