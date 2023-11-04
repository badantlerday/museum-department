import React from 'react';

export default function TextCallout({
	title = 'Exploration Redefined',
	text = <p>At Museum Department, every element is intricately interwoven.</p>
}) {

	const titleComposed = (<span className="uppercase">{title} — </span>)
	const textComposed = (
		<>
			{text}
		</>
	);


// This function will inject the titleComposed into the first <p> element found
function injectTitleIntoFirstParagraph(textElement, titleElement) {
	let titleInjected = false;
  
	const childrenWithInjectedTitle = React.Children.map(textElement.props.children, child => {
	  if (!titleInjected && React.isValidElement(child) && child.type === 'p') {
		titleInjected = true; // Ensure title is injected only once
		return React.cloneElement(child, {}, titleElement, child.props.children);
	  }
	  return child;
	});
  
	return React.cloneElement(textElement, {}, childrenWithInjectedTitle);
  }

  const modifiedTextComposed = injectTitleIntoFirstParagraph(textComposed, titleComposed);




	return (
		<div className="article font-medium text-2xl max-w-2xl mx-auto tracking-[0.5%]">
			{modifiedTextComposed}
		</div>
	);
}
