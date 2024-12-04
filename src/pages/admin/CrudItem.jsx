import React, { useContext } from "react";
import { ContentContext } from "../../contexts/ContentProvider";
import { Link } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";

function CrudItem({ item }) {
	const { deleteModule } = useContext(ContentContext);

	return (
		<div className="grid h-10 grid-cols-3 place-content-center border-y px-4 sm:grid-cols-5 sm:place-items-center md:h-20 lg:px-8">
			<Link
				to={`/keuzemodulen/${item.ModuleId}`}
				className="col-span-2 place-self-start self-center hover:underline sm:col-auto"
			>
				{item.title}
			</Link>
			<span className="hidden sm:block">{item.category}</span>
			<span className="hidden text-center sm:block">{item.spots}</span>
			<span className="hidden sm:block">
				{item.signUpAllowed ? "Open" : "Gesloten"}
			</span>
			<div className="flex w-full flex-row items-center justify-around">
				<Link
					to={`/keuzemodulen/${item.ModuleId}/bijwerken`}
					className="rounded-md bg-grc-blue p-1 md:rounded-lg md:p-2"
				>
					<MdEdit className="size-6 md:size-8" />
				</Link>
				<button
					onClick={() => deleteModule(item.ModuleId, item.title)}
					className="rounded-md bg-grc-red p-1 md:rounded-lg md:p-2"
				>
					<MdDelete className="size-6 md:size-8" />
				</button>
			</div>
		</div>
	);
}

export default CrudItem;
