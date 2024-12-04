import React, { useState, useEffect, useContext } from "react";
import CryptoJS from "crypto-js";
import { ContentContext } from "../../contexts/ContentProvider";

function Form() {
	const { getModules, modules, postRegistration } =
		useContext(ContentContext);
	const [firstName, setFirstName] = useState("");
	const [prefix, setPrefix] = useState("");
	const [lastName, setLastName] = useState("");
	const [streetName, setStreetName] = useState("");
	const [houseNumber, setHouseNumber] = useState("");
	const [postalCode, setPostalCode] = useState("");
	const [city, setCity] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [email, setEmail] = useState("");
	const [iban, setIban] = useState("");
	const [choiceModule, setChoiceModule] = useState("");
	const [specifications, setSpecifications] = useState("");
	const [paid, setPaid] = useState("");
	const [file, setFile] = useState(null);

	useEffect(() => {
		getModules();
	}, []);

	function handleButton(e) {
		e.preventDefault();

		if (
			firstName === "" ||
			lastName === "" ||
			postalCode === "" ||
			houseNumber === "" ||
			phoneNumber === "" ||
			choiceModule === "" ||
			specifications === "" ||
			paid === "" ||
			file === null
		) {
			alert("Vul alle verplichte velden in");
			return;
		}

		const encryptedIban = CryptoJS.AES.encrypt(
			iban,
			"JanIsCool123!@#"
		).toString();

		const formData = {
			firstName,
			prefix,
			lastName,
			streetName,
			houseNumber,
			postalCode,
			city,
			phoneNumber,
			email,
			iban: encryptedIban,
			choiceModule,
			specifications,
			paid,
			file
		};

		console.log(formData);
		postRegistration(formData);
	}

	function handleFileChange(e) {
		e.preventDefault();

		const reader = new FileReader();
		const file = e.target.files[0];
		reader.onloadend = () => {
			setFile(reader.result);
		};
		reader.readAsDataURL(file);
		setFile(file);
	}

	return (
		<div className="p-7 pb-16 text-center md:pb-24">
			<h1 className="mb-12 min-h-16 overflow-hidden text-4xl md:mb-7 md:text-6xl">
				Inschrijven
			</h1>
			<form className="flex flex-col items-center justify-center text-start">
				<div className="mb-10 flex w-3/4 max-w-[400px] flex-col">
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
					<div className="flex-row gap-10 sm:flex">
						<label className="mb-4 flex w-full flex-col">
							Postcode:*
							<input
								type="text"
								value={postalCode}
								onChange={(e) => setPostalCode(e.target.value)}
								name="postalCode"
								required
								className="h-10 w-full rounded border border-grc-gray p-1"
							/>
						</label>
						<label className="mb-4 flex w-full flex-col">
							Huisnummer:*
							<input
								type="text"
								value={houseNumber}
								onChange={(e) => setHouseNumber(e.target.value)}
								name="houseNumber"
								required
								className="h-10 w-full rounded border border-grc-gray p-1"
							/>
						</label>
					</div>
					<label className="mb-4 flex w-full flex-col">
						Plaats:
						<input
							type="text"
							value={city}
							onChange={(e) => setCity(e.target.value)}
							name="city"
							required
							className="h-10 w-full rounded border border-grc-gray p-1"
						/>
					</label>
					<label className="mb-4 flex w-full flex-col">
						Straatnaam:
						<input
							type="text"
							value={streetName}
							onChange={(e) => setStreetName(e.target.value)}
							name="streetName"
							required
							className="h-10 w-full rounded border border-grc-gray p-1"
						/>
					</label>
					<label className="mb-4 flex w-full flex-col">
						Telefoonnummer:*
						<input
							type="tel"
							value={phoneNumber}
							onChange={(e) => setPhoneNumber(e.target.value)}
							name="phoneNumber"
							required
							className="h-10 w-full rounded border border-grc-gray p-1"
						/>
					</label>
					<label className="mb-4 flex w-full flex-col">
						Email:
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
						IBAN:
						<input
							type="text"
							value={iban}
							onChange={(e) => setIban(e.target.value)}
							name="iban"
							required
							className="h-10 w-full rounded border border-grc-gray p-1"
						/>
					</label>
				</div>
				<div className="mb-10 flex w-3/4 max-w-[400px] flex-col">
					<label className="mb-4 flex w-full flex-col">
						Keuzemodule:*
						<select
							required
							onChange={(e) => setChoiceModule(e.target.value)}
							name="choiceModule"
							value={choiceModule}
							className="h-10 w-full rounded border border-grc-gray p-1"
						>
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
								<option disabled>
									Geen modules beschikbaar
								</option>
							)}
						</select>
					</label>
					<label className="mb-4 flex w-full flex-col">
						Specificaties gemaakte kosten:*
						<textarea
							onChange={(e) => setSpecifications(e.target.value)}
							name="specifications"
							value={specifications}
							required
							className="min-h-32 w-full rounded border border-grc-gray p-1"
						/>
					</label>
					<label className="mb-4 flex w-full flex-col">
						Totaalbedrag gemaakte kosten:*
						<input
							type="text"
							value={paid}
							onChange={(e) => setPaid(e.target.value)}
							name="paid"
							required
							className="h-10 w-full rounded border border-grc-gray p-1"
						/>
					</label>
					<label className="mb-4 flex w-full flex-col">
						Upload:*
						<input
							type="file"
							accept=".jpg, .jpeg, .png, .gif, .zip, .pdf"
							onChange={handleFileChange}
							required
							className="flex h-10 w-full rounded border border-grc-gray p-1"
						/>
					</label>
				</div>
				<button
					onClick={(e) => handleButton(e)}
					className="h-12 rounded-md bg-grc-red px-10 uppercase text-white"
				>
					Inschrijven
				</button>
			</form>
		</div>
	);
}

export default Form;
