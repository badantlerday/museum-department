"use client";
import React, { useState } from "react";
import Link from "next/link";
export default function SponsorTakeover() {
	// State to manage if the div is visible or not
	const [isVisible, setIsVisible] = useState(
		() => localStorage.getItem("mdTakeouverSeen") !== "true"
	);
	// Function to run when the button is clicked
	const handleClose = () => {
		setIsVisible(false);
		localStorage.setItem("mdTakeouverSeen", "true"); // Save in localStorage that the div has been seen
	};
	// If the div is not visible, return null to render nothing
	if (!isVisible) return null;

	return (
		<div className=" w-full h-full z-[51] bg-emerald-100 top-0 left-0 fixed">
			<div className="text-sm uppercase font-medium tracking-wide py-6 px-4 w-full text-center">
				<Link href="/" className="group py-1">
					<span className="group-hover:hidden">Museum Department</span>
					<span className="hidden group-hover:block">
						Curating Contemporary Culture
					</span>
				</Link>
			</div>
			<button
				onClick={handleClose}
				className="text-sm uppercase font-medium tracking-wide py-6 px-4 w-full text-center"
			>
				Close
			</button>
		</div>
	);
}
