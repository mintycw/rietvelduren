import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { ContentContext } from "../../contexts/ContentProvider";
import ModuleItem from "./ModuleItem";
import { Link, useParams } from "react-router-dom";
import arrow from "../../assets/svg/backArrow.svg";

function ModuleInfo() {
	const { loggedIn } = useContext(AuthContext);
	const { getModule } = useContext(ContentContext);
	const [moduleData, setModuleData] = useState(null);
	const [loading, setLoading] = useState(true);

	const { id } = useParams();

	useEffect(() => {
		getModule(id)
			.then((module) => {
				setModuleData(module);
				setLoading(false);
			})
			.catch((error) => {
				alert("Error:", error);
				setLoading(false);
			});
	}, [id]);

	if (loading) {
		return (
			<div className="flex h-screen w-full items-center justify-center text-4xl">
				Laden...
			</div>
		);
	}

	if (!moduleData || moduleData.ModuleId != id) {
		return (
			<div className="flex h-screen w-full items-center justify-center text-4xl">
				Geen module gevonden.
			</div>
		);
	}

	return (
		<div className="flex w-full flex-col items-center justify-center px-6 py-8 *:text-grc-brown">
			<div className="flex flex-col items-start md:max-w-[825px]">
				<Link
					to="/keuzemodulen"
					className="mb-5 flex gap-3 text-xs font-bold uppercase"
				>
					<img src={arrow} alt="Foto pijl terug" />
					Terug naar overzicht
				</Link>
				<h1 className="mb-9 text-4xl">{moduleData.title}</h1>

				<div className="mb-10 w-full md:mb-20 md:max-h-[550px] md:max-w-[825px]">
					<img src={moduleData.image_url} alt="Banner" />
				</div>
				<div className="mb-12 flex flex-col md:mb-10 md:w-full md:flex-row md:justify-between">
					<span className="text-grc-light-brown">
						Categorie:{" "}
						<span className="text-grc-brown">
							{moduleData.category}
						</span>
					</span>
					<span className="text-grc-light-brown">
						Beschikbare plekken:{" "}
						<span className="text-grc-brown">
							{moduleData.spots}
						</span>
					</span>
				</div>
				<ul className="mb-12 flex flex-col text-xl *:text-grc-brown">
					{moduleData.content.map((item, index) => (
						<ModuleItem key={index} item={item} />
					))}
				</ul>
				<div className="flex w-full flex-col justify-center gap-4 md:flex-row">
					{loggedIn && (
						<Link
							to="bijwerken"
							className="flex h-12 w-36 items-center justify-center self-center rounded-md bg-grc-blue px-10 text-sm uppercase text-white duration-300 hover:brightness-75"
						>
							Bewerken
						</Link>
					)}
					{moduleData.signUpAllowed ? (
						moduleData.spots > 0 ? (
							<Link
								to="/form"
								className="flex h-12 w-36 items-center justify-center self-center rounded-md bg-grc-red px-10 text-sm uppercase text-white duration-300 hover:brightness-75"
							>
								Inschrijven
							</Link>
						) : (
							<span className="flex h-12 w-36 items-center justify-center self-center rounded-md bg-grc-red px-10 text-sm uppercase text-white brightness-75">
								Vol
							</span>
						)
					) : (
						<span className="flex h-12 w-fit items-center justify-center self-center rounded-md bg-grc-red px-10 text-sm uppercase text-white brightness-75">
							Niet Beschikbaar
						</span>
					)}
				</div>
			</div>
		</div>
	);
}

export default ModuleInfo;
