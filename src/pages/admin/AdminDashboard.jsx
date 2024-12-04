import React, { useContext, useEffect } from "react";
import { ContentContext } from "../../contexts/ContentProvider";
import { AuthContext } from "../../contexts/AuthProvider";
import CrudItem from "./CrudItem";
import { Link } from "react-router-dom";

function AdminDashboard() {
	const { getModules, modules } = useContext(ContentContext);
	const { userGroup, loggedIn } = useContext(AuthContext);

	useEffect(() => {
		getModules();
	}, []);

	if (
		!loggedIn &&
		userGroup != "administrators" &&
		userGroup != "moderators"
	) {
		return (
			<div className="flex w-full flex-col items-center justify-center py-60">
				<div className="flex w-2/3 flex-col items-center justify-center gap-20 sm:w-96">
					<h1 className="text-2xl">Geen toegang</h1>
				</div>
			</div>
		);
	}

	return (
		<div className="flex h-screen flex-row border-y border-white">
			<div className="hidden h-full min-h-80 w-40 flex-col items-center gap-2 bg-grc-dark-blue py-8 text-center sm:flex lg:w-52">
				<Link
					to="/admin/dashboard"
					className="mx-4 h-10 w-5/6 rounded bg-grc-dark-blue py-2 text-grc-gray brightness-125 duration-300 hover:brightness-200"
				>
					Dashboard
				</Link>
				{userGroup === "administrators" && (
					<Link
						to="/admin/accountcreatie"
						className="mx-4 h-10 w-5/6 rounded bg-grc-dark-blue py-2 text-grc-gray brightness-125 duration-300 hover:brightness-200"
					>
						Account
					</Link>
				)}
				<Link
					to="/aanmaken"
					className="mx-4 h-10 w-5/6 rounded bg-grc-dark-blue py-2 text-grc-gray brightness-125 duration-300 hover:brightness-200"
				>
					+ Keuzedeel
				</Link>
			</div>
			<div className="w-full py-4">
				<div className="flex w-full flex-col items-center justify-between gap-2 pb-4 sm:flex-row sm:px-10 lg:pl-8 lg:pr-20">
					<h2 className="text-center text-2xl font-bold">
						Dashboard
					</h2>
					<Link
						to="/aanmaken"
						className="items-center rounded bg-grc-blue px-4 py-1 text-sm font-bold text-white duration-300 hover:text-grc-dark-blue"
					>
						Toevoegen
					</Link>
				</div>
				<div className="grid h-fit grid-cols-3 place-content-center border-y px-4 py-1 text-sm font-bold sm:grid-cols-5 sm:text-center lg:px-8">
					<div className="col-span-2 place-self-start self-center sm:col-auto">
						Titel
					</div>
					<span className="hidden sm:block">Categorie</span>
					<span className="hidden sm:block">Plekken</span>
					<span className="hidden sm:block">Open</span>
					<div className="grid grid-cols-2 place-items-center">
						<span>Edit</span>
						<span>Delete</span>
					</div>
				</div>
				{Array.isArray(modules) &&
					modules.map((module) => (
						<CrudItem key={module.ModuleId} item={module} />
					))}
			</div>
		</div>
	);
}

export default AdminDashboard;
