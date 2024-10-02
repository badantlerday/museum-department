import { Suspense } from "react";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import UserBookmarks from "@/components/UserBookmarks";
import {LogoutLink,LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import BecomeAPatron from "@/components/BecomeAPatron";

export default async function Dashboard() {
	const {isAuthenticated} = getKindeServerSession();
	const isUserAuthenticated = await isAuthenticated();

	return (
		<>
		{ isUserAuthenticated ?
		<section className="px-18 mx-auto sticky top-0 bg-white pb-2 z-10">
		<nav className="border-t border-md-grey-200 flex">
			<div className=" flex-1">
				<ul className="flex text-xs uppercase tracking-wider text-md-grey-300 *:pt-2 *:px-2 mt-[-1px]">
					<li className="text-md-black border-t border-md-black">Bookmarks</li>
					<li><LoginLink>Logout</LoginLink></li>
				</ul>
			</div>
			<div>
				<ul className="flex text-xs uppercase tracking-wider text-md-grey-300 *:pt-2 *:px-2 mt-[-1px]">
					<li className="text-md-black border-t border-md-black">All</li>
					<li>Studios</li>
					<li>Projects</li>
					<li>Foundries</li>
					<li>Fonts</li>
				</ul>
			</div>
		</nav>
		</section>
	: null}
		
		{ isUserAuthenticated ?
		<section className="pt-48 space-y-40">
			<Suspense fallback={<div className="px-8 md:px-18 mx-auto">Loading...</div>}>
				<UserBookmarks />
			</Suspense>
		</section>
		:
		<div>
			{/* <LoginLink /> */}
			<BecomeAPatron />
		</div>
		
		}
		</>
	);
}
