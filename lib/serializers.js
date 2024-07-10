// serializers.js
import React from "react";
import Footnote from "@/components/blocks/Footnote";

const components = {
	types: {
		footnote: ({ value }) => (
			<div className="footnote">
				<sup>{value.text}</sup>
			</div>
		),
	},
	marks: {
		footnote: Footnote,
	},
};

export default components;
