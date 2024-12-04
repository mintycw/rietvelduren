import React, { useState, useEffect, useContext } from "react";
import { ContentContext } from "../../contexts/ContentProvider";

function Form() {
	const { getModules, modules, postRegistration } =
		useContext(ContentContext);
	const [firstName, setFirstName] = useState("");
	const [prefix, setPrefix] = useState("");
	const [lastName, setLastName] = useState("");
	const [studentId, setStudentId] = useState("");
	const [email, setEmail] = useState("");
	const [choiceModule, setChoiceModule] = useState("");

	useEffect(() => {
		getModules();
	}, []);

	function handleButton() {
		if (
			firstName === "" ||
			lastName === "" ||
			email === "" ||
			choiceModule === "" ||
			studentId === ""
		) {
			alert("Vul alle verplichte velden in");
			return;
		}

		const formData = {
			firstName,
			prefix,
			lastName,
			studentId,
			email,
			choiceModule
		};

		postRegistration(formData);
	}

	return (
		<div className="flex flex-col items-center justify-center p-7 pb-16 text-center md:pb-24">
			<h1 className="mb-12 min-h-16 overflow-hidden text-4xl md:mb-7 md:text-6xl">
				Inschrijven
			</h1>
			<div className="flex w-64 max-w-[400px] flex-col sm:w-2/3 md:w-1/2">
				<div className="flex flex-col sm:flex-row sm:gap-2">
					<label className="mb-4 flex w-full flex-col">
						Voornaam:*
						<input
							type="text"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							name="firstName"
							required
							className="h-10 w-full rounded border border-grc-gray p-1"
						/>
					</label>
					<label className="mb-4 flex w-full flex-col">
						Tussenvoegsel:
						<input
							type="text"
							value={prefix}
							onChange={(e) => setPrefix(e.target.value)}
							name="prefix"
							className="h-10 w-full rounded border border-grc-gray p-1"
						/>
					</label>
				</div>
				<label className="mb-4 flex w-full flex-col">
					Achternaam:*
					<input
						type="text"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						name="lastName"
						required
						className="h-10 w-full rounded border border-grc-gray p-1"
					/>
				</label>
				<label className="mb-4 flex w-full flex-col">
					Studenten Nummer:*
					<input
						type="text"
						value={studentId}
						onChange={(e) => setStudentId(e.target.value)}
						name="studentId"
						required
						className="h-10 w-full rounded border border-grc-gray p-1"
					/>
				</label>
				<label className="mb-4 flex w-full flex-col">
					Email:*
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						name="email"
						required
						className="h-10 w-full rounded border border-grc-gray p-1"
					/>
				</label>
				<label className="mb-4 flex w-full flex-col">
					Keuzemodule:*
					<select
						required
						onChange={(e) => setChoiceModule(e.target.value)}
						name="choiceModule"
						value={choiceModule}
						className="h-10 w-full rounded border border-grc-gray p-1"
					>
						<option value="">Kies een module</option>
						{Array.isArray(modules) && modules.length > 0 ? (
							modules.map((module) => {
								if (module.spots > 0) {
									return (
										<option
											key={module.ModuleId}
											value={module.ModuleId}
										>
											{module.title}
										</option>
									);
								}
							})
						) : (
							<option disabled>Geen modules beschikbaar</option>
						)}
					</select>
				</label>
				<button
					onClick={() => handleButton()}
					className="h-10 rounded-md bg-grc-blue px-10 uppercase text-white"
				>
					Inschrijven
				</button>
			</div>
		</div>
	);
}

export default Form;
