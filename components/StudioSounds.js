import Image from "next/image";
import Link from "next/link";

export default function StudioSounds() {
	return (
		<>
			<section className="px-4 lg:px-20 mx-auto mb-32">
				<div className="border-t border-[#E6E6E6] pt-6 pb-4 grid grid-cols-2">
					<div className="flex flex-col  aspect-square">
						<div className=" flex-auto  text-2xl font-medium ">
							<h2 className="">Studio Sounds</h2>
							<div className="italic">Daniel Carlsten, Vol I</div>
						</div>
						<div className="    justify-self-end">
							<ul className="mb-6 text-xl space-y-1 font-medium italic">
								<li>Pale Saints - Blue Flower</li>
								<li>George Riley - Time</li>
								<li>FKA twigs - Two Weeks</li>
								<li>Arca - Vanity</li>
								<li>SOPHIE - Blipp (Autechre Mx)</li>
								<li>Big Thief - Not</li>
								<li>Jesus & Mary Chain - Something’s Wrong</li>
								<li>My Bloody Valentine - Drive It All Over Me </li>
								<li>BADBADNOTGOOD w/ Charlotte Day Wilson - In Your Eyes</li>
							</ul>
							<Link
								href="/studio"
								className="  inline-block border border-black p-3 text-xs uppercase tracking-wide"
							>
								<div className="flex">
									<Image
										src="/icon_spotify.svg"
										width={13}
										height={13}
										className="mr-2"
										alt="Cover"
									/>
									<span>Listen to STUDIO SOUNDS BY daniel carlsten</span>
								</div>
							</Link>
						</div>
					</div>
					<div className="  aspect-square COVER">
						<div className="w-full aspect-square bg-slate-100 mb-2"></div>
					</div>
				</div>
			</section>
		</>
	);
}
