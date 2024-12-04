import React, { useState, useRef, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { MdDelete, MdAdd } from "react-icons/md";

const ItemType = "LIST_ITEM";

function InputType({
	item,
	index,
	moveItem,
	deleteItem,
	editItem,
	addListItem,
	deleteListItem,
	showBorder
}) {
	const [onHover, setOnHover] = useState(false);
	const textAreaRef = useRef(null); // Ref to handle textarea element

	// Effect to auto resize the textarea when content changes
	useEffect(() => {
		if (textAreaRef.current) {
			autoResizeTextarea(textAreaRef.current);
		}
	}, [item.content]);

	const [, ref] = useDrag({
		// Setting up drag functionality
		type: ItemType,
		item: { index }
	});

	const [, drop] = useDrop({
		// Setting up drop functionality
		accept: ItemType,
		hover(draggedItem) {
			if (draggedItem.index !== index) {
				moveItem(draggedItem.index, index);
				draggedItem.index = index;
			}
		}
	});

	// Handlers to set hover state
	function handleFocus() {
		setOnHover(true);
	}

	function handleBlur() {
		setOnHover(false);
	}

	// Function to auto resize the textarea
	function autoResizeTextarea(textarea) {
		textarea.style.height = "auto"; // Reset height
		textarea.style.height = textarea.scrollHeight + "px"; // Set height based on scroll height
	}

	return (
		<li
			key={index}
			// Combining refs for drag and drop functionality
			ref={(node) => ref(drop(node))}
			className={`mb-4 rounded-lg bg-white p-4 ${showBorder && "border"}`}
		>
			{/* Conditional rendering based on item type */}
			{item.type === "header" && (
				<textarea
					ref={textAreaRef}
					value={item.content}
					placeholder="Koptekst"
					onChange={(e) => {
						editItem(index)(e);
						autoResizeTextarea(e.target);
					}}
					onFocus={handleFocus}
					onBlur={handleBlur}
					className={`w-full resize-none overflow-hidden rounded p-2 text-2xl font-bold focus:border focus:border-grc-dark-blue ${showBorder && "border"}`}
				/>
			)}

			{item.type === "paragraph" && (
				<textarea
					ref={textAreaRef}
					value={item.content}
					placeholder="Paragraaf"
					onChange={(e) => {
						editItem(index)(e);
						autoResizeTextarea(e.target);
					}}
					onFocus={handleFocus}
					onBlur={handleBlur}
					className={`w-full resize-none overflow-hidden rounded p-2 focus:border focus:border-grc-dark-blue ${showBorder && "border"}`}
				/>
			)}

			{item.type === "unorderedList" && (
				<ul className="list-inside list-disc">
					{item.content.map((listItem, innerIndex) => (
						<li
							key={innerIndex}
							className="relative mb-2 flex items-center"
						>
							<span className="mx-5 w-4 text-3xl">•</span>
							<textarea
								value={listItem}
								placeholder={"Lijst item " + (innerIndex + 1)}
								type="text"
								onChange={editItem(index, innerIndex, true)}
								onFocus={handleFocus}
								onBlur={handleBlur}
								className={`w-full resize-none overflow-hidden rounded p-2 focus:border focus:border-grc-dark-blue ${showBorder && "border"}`}
							/>
							{item.content.length > 1 && (
								<button
									onMouseDown={() =>
										deleteListItem(index, innerIndex)
									}
									className="ml-2 shrink-0 rounded p-1 text-grc-red duration-300 hover:bg-grc-red hover:text-white"
								>
									<MdDelete className="size-6" />
								</button>
							)}
						</li>
					))}
					<div
						className={`flex w-full items-center justify-center pb-2 ${onHover ? "block" : "hidden"}`}
					>
						<button
							onMouseDown={() => addListItem(index)}
							className="flex w-10 items-center justify-center rounded border bg-grc-blue p-1.5 text-white duration-300 ease-linear hover:w-16"
						>
							<MdAdd className="size-6" />
						</button>
					</div>
				</ul>
			)}

			{item.type === "orderedList" && (
				<ol className="list-inside list-decimal">
					{item.content.map((listItem, innerIndex) => (
						<li
							key={innerIndex}
							className="relative mb-2 flex items-center"
						>
							<span className="mx-5 w-4 shrink-0 text-left">
								{innerIndex + 1}.
							</span>
							<textarea
								value={listItem}
								placeholder={"Lijst item " + (innerIndex + 1)}
								type="text"
								onChange={editItem(index, innerIndex, true)}
								onFocus={handleFocus}
								onBlur={handleBlur}
								className={`w-full resize-none overflow-hidden rounded p-2 focus:border focus:border-grc-dark-blue ${showBorder && "border"}`}
							/>
							{item.content.length > 1 && (
								<button
									onMouseDown={() =>
										deleteListItem(index, innerIndex)
									}
									className="ml-2 shrink-0 rounded p-1 text-grc-red duration-300 hover:bg-grc-red hover:text-white"
								>
									<MdDelete className="size-6" />
								</button>
							)}
						</li>
					))}
					<div
						className={`flex w-full items-center justify-center pb-2 ${onHover ? "block" : "hidden"}`}
					>
						<button
							onMouseDown={() => addListItem(index)}
							className="flex w-10 items-center justify-center rounded border bg-grc-blue p-1.5 text-white duration-300 ease-linear hover:w-16"
						>
							<MdAdd className="size-6" />
						</button>
					</div>
				</ol>
			)}
			<div
				className={`flex w-full items-center justify-center ${onHover ? "block" : "hidden"}`}
			>
				<button
					onMouseDown={() => deleteItem(index)()}
					className="flex w-full items-center justify-center rounded bg-grc-red p-1.5 uppercase text-white duration-500 ease-in hover:w-full md:w-52"
				>
					Verwijder blok
				</button>
			</div>
		</li>
	);
}

export default InputType;
