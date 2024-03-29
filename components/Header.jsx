'use client'
import {
	Bars3Icon,
	BookmarkIcon,
	MagnifyingGlassIcon,
	UserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from 'next/navigation'
import AnimatedLink from "./AnimatedLink";

export default function Header() {
	const pathname = usePathname()
	return (
		<header className="_backdrop-blur-md bg-white/10_ fixed top-0 left-0 w-full z-50 _mix-blend-difference text-white_">
			<nav
				className="flex items-center justify-between py-6 px-4 lg:px-20"
				aria-label="Global"
			>
				<div className="flex lg:flex-1 text-sm space-x-4 items-center font-medium text-[#999999]">
					<Link href="/" className={`${pathname === '/' ? ' text-black' : ''}`}>
						On Display
					</Link>
					<Link href="/fonts-gallery" className={`${pathname === '/fonts-gallery' ? ' text-black' : ''}`}>Fonts Gallery</Link>
					<Link href="/studios" className={`${pathname === '/studios' ? ' text-black' : ''}`}>Studios</Link>
					<Link href="/archive" className={`${pathname === '/archive' ? ' text-black' : ''}`}>Archive</Link>
				</div>
				<div className="hidden lg:flex lg:gap-x-12 text-sm uppercase font-medium tracking-wide">
					<AnimatedLink text="Museum Department" hoverText="Curating Contemporary Culture" url="/" />
				</div>
				<div className="hidden lg:flex lg:flex-1 text-sm lg:justify-end text-s space-x-4 font-medium items-center">
					<Link href="/about" className={`${pathname === '/about' ? ' text-[#999999]' : ''}`}>About</Link>
					<Link href="/fonts-in-use">Submit</Link>
					<UserIcon className="h-5 w-5" aria-hidden="true" />
					<BookmarkIcon className="h-5 w-5" aria-hidden="true" />
					<MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
				</div>
			</nav>
		</header>
	);
}