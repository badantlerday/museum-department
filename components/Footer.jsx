export default function Footer() {
	return (
		<footer className="text-sm pt-80 pb-4 px-4 lg:px-20">
			<div className="grid grid-cols-2 gap-y-8 lg:grid-cols-6 gap-4 w-full font-medium">
				<div className=" col-span-2 lg:col-span-2">
					<h2 className="uppercase tracking-wide">Museum Department</h2>
					<p>Curating Contemporary Culture</p>
				</div>
				<div>
					<h2 className="uppercase tracking-wide">Contact</h2>
					<ul>
						<li>General Inquiries</li>
						<li>Advertisment</li>
						<li>Brand Partnership</li>
					</ul>
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
			</div>
			<div className="text-xs mt-28">
				{" "}
				© Museum Department 2024    All images © of their respective owners.
				Legal Terms.
			</div>
		</footer>
	);
}
