import React from "react";
import { motion } from "framer-motion";

export default function TextCallout({
	title = "Exploration Redefined",
	text = <p>At Museum Department, every element is intricately interwoven.</p>,
}) {
	const titleComposed = <span className="uppercase">{title} — </span>;
	const textComposed = <>{text}</>;

	// This function will inject the titleComposed into the first <p> element found
	function injectTitleIntoFirstParagraph(textElement, titleElement) {
		let titleInjected = false;

		const childrenWithInjectedTitle = React.Children.map(
			textElement.props.children,
			(child) => {
				if (
					!titleInjected &&
					React.isValidElement(child) &&
					child.type === "p"
				) {
					titleInjected = true; // Ensure title is injected only once
					return React.cloneElement(
						child,
						{},
						titleElement,
						child.props.children
					);
				}
				return child;
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
		</div>
		// </motion.div>
	);
}
