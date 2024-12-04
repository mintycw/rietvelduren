import React, { useContext, useEffect } from "react";
import Module from "../../components/Module";
import { ContentContext } from "../../contexts/ContentProvider";
import { AuthContext } from "../../contexts/AuthProvider";
import { MdAdd } from "react-icons/md";
import { Link } from "react-router-dom";

function Overview() {
	const { loggedIn } = useContext(AuthContext);
	const { getModules, modules } = useContext(ContentContext);

	useEffect(() => {
		getModules();
	}, []);

	return Array.isArray(modules) && modules.length === 0 ? (
		<div className="flex h-screen w-full flex-col items-center justify-center gap-8 text-center text-2xl md:text-4xl">
			<h2>Geen modules gevonden.</h2>
			{loggedIn && (
				<Link
					to="/aanmaken"
					className="flex w-10 items-center justify-center rounded border bg-grc-blue p-1.5 text-white duration-300 ease-linear hover:w-16"
				>
					<MdAdd className="size-6" />
				</Link>
			)}
		</div>
	) : (
		<>
			<div className="flex flex-col items-center justify-center gap-12 p-7 pb-16 text-center md:gap-7 md:pb-24">
				<h1 className="overflow-hidden text-4xl md:text-6xl">
					Keuzemodules
				</h1>
				<p>
					Hier een overzicht van alle keuzemodules die deze periode
					worden aangeboden
				</p>
				{loggedIn && (
					<Link
						to="/aanmaken"
						className="flex w-10 items-center justify-center rounded border bg-grc-blue p-1.5 text-white duration-300 ease-linear hover:w-16"
					>
						<MdAdd className="size-6" />
					</Link>
				)}
			</div>
			<div className="grid w-full place-items-center gap-10 bg-grc-light-gray px-6 py-16 sm:grid-cols-2 lg:px-32 xl:grid-cols-3">
				{Array.isArray(modules) &&
					modules.map((module) => (
						<Module key={module.ModuleId} module={module} />
					))}
			</div>
		</>
	);
}

export default Overview;
