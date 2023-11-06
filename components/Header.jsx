'use client'
import {
	Bars3Icon,
	BookmarkIcon,
	MagnifyingGlassIcon,
	UserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from 'next/navigation'

export default function Header() {
	const pathname = usePathname()
	return (
		<header className="_backdrop-blur-md bg-white/10_ fixed top-0 left-0 w-full z-50 _mix-blend-difference text-white_">
			<nav
				className="flex items-center justify-between py-6 px-4 lg:px-20"
				aria-label="Global"
			>
				<div className="flex lg:flex-1 text-sm space-x-4 items-center font-medium">
					<Link href="/" className={`${pathname === '/' ? ' text-[#999999]' : ''}`}>
						On Display
					</Link>
					<Link href="/fonts-gallery" className={`${pathname === '/fonts-gallery' ? ' text-slate-500' : ''}`}>Fonts Gallery</Link>
					<Link href="/studios" className={`${pathname === '/studios' ? ' text-slate-500' : ''}`}>Studios</Link>
					<Link href="/archive" className={`${pathname === '/archive' ? ' text-slate-500' : ''}`}>Archive</Link>
				</div>
				<div className="hidden lg:flex lg:gap-x-12 text-sm uppercase font-medium tracking-wide">
					<Link href="/" className="group py-1">
						<span className="group-hover:hidden">Museum Department</span>
						<span className="hidden group-hover:block">
							Curating Contemporary Culture
						</span>
					</Link>
				</div>
				<div className="hidden lg:flex lg:flex-1 text-sm lg:justify-end text-s space-x-4 font-medium items-center">
					<Link href="/about" className={`${pathname === '/about' ? ' text-slate-500' : ''}`}>About</Link>
					<Link href="/fonts-in-use">Submit</Link>
					<UserIcon className="h-5 w-5" aria-hidden="true" />
					<BookmarkIcon className="h-5 w-5" aria-hidden="true" />
					<MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
				</div>
			</nav>
		</header>
	);
}