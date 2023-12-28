import React from "react";

export default function SectionHeader({
	title = "Section Header Title",
	border = false,
}) {
	const borderClasses = border ? "border-t border-[#E6E6E6] pt-6 pb-4" : "py-4";
	return <h2 className={`text-2xl font-medium ${borderClasses}`}>{title}</h2>;
}
