import React from "react";

const Footnote = ({ children, value, index }) => {
	return (
		<span className="footnote italic">
			{children}
			<sup>
				{value.text}
				{index}
			</sup>
		</span>
	);
};

export default Footnote;
