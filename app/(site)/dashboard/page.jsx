import { Suspense } from "react";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import TextCallout from "@/components/TextCallout";
import UserBookmarks from "@/components/UserBookmarks";
import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import BecomeAPatron from "@/components/BecomeAPatron";

export default async function Dashboard() {
    const {
        getAccessToken,
        getBooleanFlag,
        getFlag,
        getIdToken,
        getIntegerFlag,
        getOrganization,
        getPermission,
        getPermissions,
        getStringFlag,
        getUser,
        getUserOrganizations,
        isAuthenticated
    } = getKindeServerSession();
    const user = await getUser();
	const title = user ? `${user.given_name}` : "Welcome to Museum Department";
	const text = (
			<p>
				Here are all of your bookmarks.
				<span className="mt-4 block">
				{user ? <LogoutLink className="inline-block border border-black p-3 text-xs uppercase tracking-wide hover:bg-black hover:text-white transition-all">Log out</LogoutLink> :	"Login" }
				</span>
			</p>
	);

	return (
		<>
		{/* <section className="mx-auto mt-56 ">
    	<h1 className="text-center text-[56px]/[50px] font-black mx-auto flex flex-col my-20 uppercase tracking-tight px-28">Bookmarks</h1>
		</section> */}
		{ user ?
		<section className="px-18 mx-auto sticky top-0 bg-white pb-2 z-10">
		<nav className="border-t border-md-grey-200 flex">
			<div className=" flex-1">
				<ul className="flex text-xs uppercase tracking-wider text-md-grey-300 *:pt-2 *:px-2 mt-[-1px]">
					<li className="text-md-black border-t border-md-black">Bookmarks</li>
					<li>Jobs</li>
				</ul>
			</div>
			<div>
				<ul className="flex text-xs uppercase tracking-wider text-md-grey-300 *:pt-2 *:px-2 mt-[-1px]">
					<li className="text-md-black border-t border-md-black">All</li>
					<li>Projects</li>
					<li>Studios</li>
					<li>Foundries</li>
					<li>Font Gallery</li>
					<li>Fonts</li>
				</ul>
			</div>
		</nav>
	</section>
	: null}
		
		{ user ? <section className="pt-20 space-y-40">
			<div className="px-8 md:px-18 mx-auto">
				<Suspense fallback={<div>Loading...</div>}>
					<UserBookmarks />
				</Suspense>
			</div>
		</section>
		:
		<BecomeAPatron />
		}
		</>
	);
}
