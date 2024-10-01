import React from "react";

export default function TextCallout({
	title = "Exploration Redefined",
	text = <p>At Museum Department, every element is intricately interwoven.</p>,
	button = false,
	buttonText = "Learn More",
	buttonLink = "/",
}) {
	const titleComposed = <span className="uppercase">{title} — </span>;
	const textComposed = <>{text}</>;

	// This function will inject the titleComposed into the first <p> element found
	function injectTitleIntoFirstParagraph(textElement, titleElement) {
		let titleInjected = false;

		const injectTitle = (child) => {
			if (!titleInjected && child.type === "p") {
				titleInjected = true; // Ensure title is injected only once
				return React.cloneElement(
					child,
					{},
					titleElement,
					child.props.children
				);
			}
			return child;
		};

		const childrenWithInjectedTitle = React.Children.map(
			textElement.props.children,
			(child) => {
				// Check if the child is a React Fragment
				if (React.isValidElement(child) && child.type === React.Fragment) {
					// Map over the children of the fragment
					return React.cloneElement(
						child,
						{},
						React.Children.map(child.props.children, injectTitle)
					);
				} else {
					// Apply injectTitle to non-fragment children
					return injectTitle(child);
				}
			}
		);

		return React.cloneElement(textElement, {}, childrenWithInjectedTitle);
	}

	const modifiedTextComposed = injectTitleIntoFirstParagraph(
		textComposed,
		titleComposed
	);

	return (
		// <motion.div
		// 	initial={{ opacity: 0, y: 30 }}
		// 	whileInView={{ opacity: 1, y: 0 }}
		// 	transition={{
		// 		duration: 0.75,
		// 		delay: 0,
		// 		// bounce: 0.4,
		// 		// type: "spring",
		// 	}}
		// 	viewport={{ once: true }}
		// 	key={title}
		// >
		<div className="px-4 lg:px-0 article font-medium text-xl lg:text-2xl max-w-2xl mx-auto tracking-[0.5%]">
			{modifiedTextComposed}
			{button && (
				<a
					href={buttonLink}
					className="inline-block border border-md-black p-3 text-xs uppercase tracking-wide hover:bg-md-black hover:text-white transition-all"
				>
					{buttonText}
				</a>
			)}
		</div>
		// </motion.div>
	);
}
