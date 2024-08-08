
import Link from "next/link"
import Image from "next/image"

export default function FooterSmall() {

  return (
    <footer className="text-sm pt-80 pb-4 px-4 lg:px-18">			

			<Image
				src="/museum-department.svg"
				width={13}
				height={13}
				className="w-full h-auto my-4"
				alt="Cover"
			/>
			
            <div className="flex text-xs font-medium tracking-wide uppercase ">
                <div className="flex-1 space-x-4">
                    <Link href="/about">About</Link>
                    <Link href="/advertise">Advertise</Link>
                    <Link href="/about">Sell with us</Link>
                    <Link href="/become-a-patron">Become a patron</Link>
                </div>
                <div className=" space-x-2">
                    <Link href="/about">Follow us</Link>
                    <Link href="/about">Newsletter</Link>
                </div>
            </div>
			{/* <div className="text-xs font-light">
				{" "}
				© Museum Department 2024    All images © of their respective owners.
				Legal Terms.
			</div> */}
		</footer>
  )
}
