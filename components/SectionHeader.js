import React from "react";

export default function SectionHeader({ title = "Section Header Title" }) {
	return <h2 className="text-2xl font-medium py-4">{title}</h2>;
}
