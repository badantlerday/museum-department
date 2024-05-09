import { Suspense } from "react";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import TextCallout from "@/components/TextCallout";
import UserBookmarks from "@/components/UserBookmarks";
import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";

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
		<section className="mx-auto mt-56 ">
    	<h1 className="text-center text-[56px]/[50px] font-black mx-auto flex flex-col my-20 uppercase tracking-tight px-28">Bookmarks</h1>
		</section>
		<section className="py-20 space-y-40">
			<div className="px-8 md:px-16 mx-auto">
				<Suspense fallback={<div>Loading...</div>}>
					<UserBookmarks />
				</Suspense>
			</div>
		</section>
			{/* <section className="py-48 space-y-40">
				<TextCallout title={title} text={text} />
				<div className="article font-medium max-w-2xl mx-auto">
					<h2 className="mt-16 mb-4 uppercase">Bookmarks</h2>
					<Suspense fallback={<div>Loading...</div>}>
					<UserBookmarks />
					</Suspense>
				</div>
			</section> */}
		</>
	);
}
