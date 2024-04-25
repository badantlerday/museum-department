export const query = `*[_type == "settings"][0]{
    footerMenu->{
        title,
        menuItems[] {
            ...,
            internal->{
                title,
                "type": _type,
                "slug": slug.current
            }
        }
    },
}`

import { sanityFetch } from "@/lib/sanity.fetch"
import CustomLink from "@/components/CustomLink"
import Link from "next/link"
import Image from "next/image"
import ItemsRow from "@/components/ItemsRow"

export default async function Footer() {
  const data = await sanityFetch({ query, tags: ["settings"] })
  const { footerMenu } = data || {}

  return (
    <footer className="text-sm pt-80 pb-4 px-4 lg:px-20">
			
			<Image
				src="/museum-department.svg"
				width={13}
				height={13}
				className="w-full h-auto"
				alt="Cover"
			/>
			<ItemsRow title="Store Items" />
			
			{/* <div className="grid grid-cols-2 gap-y-8 lg:grid-cols-6 gap-4 w-full font-medium">
				<div className=" col-span-2 lg:col-span-2">
					<h2 className="uppercase tracking-wide">Museum Department</h2>
					<p>Curating Contemporary Culture</p>
				</div>
				<div>
					<h2 className="uppercase tracking-wide">Contact</h2>
					<ul>
						<li>General Inquiries</li>
						<li><Link href="/advertise" >Advertisment</Link></li>
						<li>Brand Partnership</li>
					</ul>
				{footerMenu?.menuItems && (
					<div className="flex gap-4">
					{footerMenu?.menuItems.map((menuItem, key) => {
						return <CustomLink key={`menu-item-${key}`} data={menuItem} />
					})}
					</div>
				)}
				</div>
				<div>
					<h2 className="uppercase tracking-wide">Submit</h2>
					<ul>
						<li>Design Project</li>
						<li>Type Project</li>
						<li>Sell With Us</li>
					</ul>
				</div>
				<div>
					<h2 className="uppercase tracking-wide">Information</h2>
					<ul>
						<li>About Us</li>
						<li>Customer Care / Support</li>
						<li>FAQ</li>
					</ul>
				</div>
				<div>
					<h2 className="uppercase tracking-wide">Social</h2>
					<ul>
						<li>Instagram</li>
						<li>Linkedin</li>
						<li>Twitter</li>
						<li>Pinterest</li>
					</ul>
				</div>
			</div> */}
			<div className="text-xs mt-[400px]">
				{" "}
				© Museum Department 2024    All images © of their respective owners.
				Legal Terms.
			</div>
		</footer>
  )
}
