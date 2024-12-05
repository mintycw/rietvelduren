import React, { useRef, useEffect } from "react";

function ModuleItem({ item, index }) {
	// Ref to handle textarea element
	const textAreaRef = useRef(null);

	// Effect to auto resize the textarea when content changes
	useEffect(() => {
		if (textAreaRef.current) {
			autoResizeTextarea(textAreaRef.current);
		}
	}, [item.content]);

	// Function to auto resize the textarea
	function autoResizeTextarea(textarea) {
		textarea.style.height = "auto"; // Reset height
		textarea.style.height = textarea.scrollHeight + "px"; // Set height based on scroll height
	}

	return (
		<li key={index} className={`mb-4 rounded-lg bg-white p-4`}>
			{/* Conditional rendering based on item type */}
			{item.type === "header" && (
				<h1 className={`mb-9 text-2xl font-bold md:text-4xl`}>
					{item.content}
				</h1>
			)}

			{item.type === "paragraph" && (
				<p className={`mb-9 text-base md:text-xl`}>{item.content}</p>
			)}

			{item.type === "unorderedList" && (
				<ul className="list-inside list-disc">
					{item.content.map((listItem, innerIndex) => (
						<li key={innerIndex} className="mb-2 flex items-center">
							<span className="mx-5 w-4 text-3xl">•</span>
							<p className={`text-base md:text-lg`}>{listItem}</p>
						</li>
					))}
				</ul>
			)}

			{item.type === "orderedList" && (
				<ol className="h-min list-inside list-decimal">
					{item.content.map((listItem, innerIndex) => (
						<li
							key={innerIndex}
							className="mb-2 flex w-full flex-row items-center"
						>
							<span className="w-10 text-left text-black">
								{innerIndex + 1}.
							</span>
							<span className="w-full text-lg">{listItem}</span>
						</li>
					))}
				</ol>
			)}
		</li>
	);
}

export default ModuleItem;
