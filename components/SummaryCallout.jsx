import Counter from "./Counter";

export default function SummaryCallout() {
	return (
        <div className="uppercase font-medium text-center py-60 tracking-[1%]">
        <h2>There are currently <span className="relative"><span className="opacity-0">212</span><span className=" absolute left-0"><Counter number={212}/></span></span> design studios from 22 countries and from 50 cities</h2>
        <h2 className=" text-md-grey-300">As a patron you can BOOKMARK your favorite studios, projects AND fonts</h2>
        </div>
	);
}