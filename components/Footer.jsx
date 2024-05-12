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

			<ItemsRow title="Store Items" />
			<div className="grid grid-cols-24 mt-80 gap-4 text-xs border-t border-md-grey-200 pt-6">
				<div className="col-span-5 article--footer">
				<h2>SELL WITH US</h2>
				<p>We invite digital creators to sell their digital goods in our curated store: mockups, templates, decks, graphic effects, iconography, typefaces, Framer templates, and Notion templates.</p>
				<p>Submit your work for consideration. We  carefully review each submission, ensuring that only the best work is selected. If we think your work is a good fit, we’ll reach out as soon as possible about the next steps.</p>
				<p>Reach outMinim</p>
				</div>
				<div className="col-start-7 col-span-3 article--footer">
				<h2>Submit</h2>
				<ul>
					<li>Design Project</li>
					<li>Type Project</li>
					<li>Sell With Us</li>
				</ul>
				
				</div>
				<div className="col-span-3 article--footer">
				<h2>Information</h2>
				<ul>
					<li>About Museum Department</li>
					<li>Advertise in our newsletters</li>
					<li>Become a patron</li>
				</ul>
				</div>
				<div className="col-start-14 col-span-3 article--footer">
				<h2>Connect with us</h2>
				<ul>
					<li>Instagram</li>
					<li>Twitter</li>
					<li>Spotify</li>
				</ul>
				</div>
				<div className="col-span-8 article--footer">
				<h2>Join our community</h2>
				<p>We invite digital creators to sell their digital goods in our curated store: mockups, templates, decks, graphic effects, iconography, typefaces, Framer templates, and Notion templates.</p>
				</div>
			</div>
			{/* <div className="grid grid-cols-12 gap-4 mt-10">
				<div className="col-span-3">Minim mollit est sunt velit deserunt. Laborum mollit nisi culpa enim incididunt. Elit culpa dolore labore adipisicing ullamco laboris deserunt magna quis consequat ea. In aliquip nostrud irure officia. Pariatur eiusmod proident amet proident enim. Laborum consequat duis irure ea ad voluptate ullamco qui dolore occaecat mollit qui minim nisi. Laborum ut velit proident enim amet veniam laboris. Fugiat id eu cupidatat ea consectetur.</div>
				<div className="col-span-2">Minim mollit est sunt velit deserunt. Laborum mollit nisi culpa enim incididunt. Elit culpa dolore labore adipisicing ullamco laboris deserunt magna quis consequat ea. In aliquip nostrud irure officia. Pariatur eiusmod proident amet proident enim. Laborum consequat duis irure ea ad voluptate ullamco qui dolore occaecat mollit qui minim nisi. Laborum ut velit proident enim amet veniam laboris. Fugiat id eu cupidatat ea consectetur.</div>
				<div className="col-span-2">Minim mollit est sunt velit deserunt. Laborum mollit nisi culpa enim incididunt. Elit culpa dolore labore adipisicing ullamco laboris deserunt magna quis consequat ea. In aliquip nostrud irure officia. Pariatur eiusmod proident amet proident enim. Laborum consequat duis irure ea ad voluptate ullamco qui dolore occaecat mollit qui minim nisi. Laborum ut velit proident enim amet veniam laboris. Fugiat id eu cupidatat ea consectetur.</div>
				<div className="col-span-2">Minim mollit est sunt velit deserunt. Laborum mollit nisi culpa enim incididunt. Elit culpa dolore labore adipisicing ullamco laboris deserunt magna quis consequat ea. In aliquip nostrud irure officia. Pariatur eiusmod proident amet proident enim. Laborum consequat duis irure ea ad voluptate ullamco qui dolore occaecat mollit qui minim nisi. Laborum ut velit proident enim amet veniam laboris. Fugiat id eu cupidatat ea consectetur.</div>
				<div className="col-span-3">Minim mollit est sunt velit deserunt. Laborum mollit nisi culpa enim incididunt. Elit culpa dolore labore adipisicing ullamco laboris deserunt magna quis consequat ea. In aliquip nostrud irure officia. Pariatur eiusmod proident amet proident enim. Laborum consequat duis irure ea ad voluptate ullamco qui dolore occaecat mollit qui minim nisi. Laborum ut velit proident enim amet veniam laboris. Fugiat id eu cupidatat ea consectetur.</div>
			</div> */}
			<Image
				src="/museum-department.svg"
				width={13}
				height={13}
				className="w-full h-auto my-10"
				alt="Cover"
			/>
			

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
			<div className="text-xs font-light">
				{" "}
				© Museum Department 2024    All images © of their respective owners.
				Legal Terms.
			</div>
		</footer>
  )
}
