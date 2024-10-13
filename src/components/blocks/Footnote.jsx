import React from "react";

const Footnote = ({ children, value }) => {
	return (
		<span className="footnote uppercase">
			{children}
			{/* <sup className="ml-1 text-md-grey-500">
				{value.number}
			</sup> */}
		</span>
	);
};

export default Footnote;
