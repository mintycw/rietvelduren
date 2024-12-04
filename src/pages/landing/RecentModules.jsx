import React, { useContext, useEffect } from "react";
import { ContentContext } from "../../contexts/ContentProvider";
import Module from "../../components/Module";
import { Link } from "react-router-dom";

function RecentModules() {
	const { getModules, modules } = useContext(ContentContext);

	useEffect(() => {
		getModules();
	}, []);

	return (
		<div className="flex w-screen flex-col items-center justify-center bg-grc-light-gray px-4 pt-5">
			<h1 className="mb-8 overflow-y-hidden text-2xl md:mb-20 md:ml-32 md:mt-16 md:self-start md:text-4xl lg:text-6xl">
				Laatste keuzemodules
			</h1>
			<div className="mb-2 flex flex-col gap-7 md:flex-row">
				{Array.isArray(modules) &&
					modules
						.slice(0, 3)
						.map((module) => (
							<Module key={module.ModuleId} module={module} />
						))}
			</div>
			<Link
				to="/keuzemodulen"
				className="mb-28 flex h-12 items-center justify-center self-start rounded-md border border-grc-dark-blue px-3 text-sm uppercase md:mb-14 md:ml-32 md:mt-16"
			>
				Alle keuzemodules
			</Link>
		</div>
	);
}

export default RecentModules;
