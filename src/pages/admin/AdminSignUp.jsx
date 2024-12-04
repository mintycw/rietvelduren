import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { Link } from "react-router-dom";

function AdminSignUp() {
	const { createUser, userGroup, loggedIn } = useContext(AuthContext);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState("moderator"); // default role to moderator

	function handleSubmit() {
		if (!name || !email || !password) {
			alert("Vul alle velden in");
			return;
		}

		const userData = {
			email,
			password,
			name,
			role
		};
		createUser(userData);
	}

	function validatePassword() {
		const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$/;
		const isValidPassword = passwordRegex.test(password);

		if (!isValidPassword) {
			alert(
				"Password must contain at least 1 number, 1 special character, 1 capitalized letter, and be at least 8 characters long."
			);
			// You can also add visual feedback to the user, like adding a CSS class to highlight the input field
		}
	}

	if (!loggedIn && userGroup !== "administrators") {
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
				<Link
					to="/admin/accountcreatie"
					className="mx-4 h-10 w-5/6 rounded bg-grc-dark-blue py-2 text-grc-gray brightness-125 duration-300 hover:brightness-200"
				>
					Account
				</Link>
				<Link
					to="/aanmaken"
					className="mx-4 h-10 w-5/6 rounded bg-grc-dark-blue py-2 text-grc-gray brightness-125 duration-300 hover:brightness-200"
				>
					+ Keuzedeel
				</Link>
			</div>
			<div className="flex w-full items-start justify-center py-20">
				<div className="flex w-2/3 flex-col items-center justify-center gap-20 sm:w-96">
					<h2 className="overflow-hidden text-4xl">
						Gebruiker Aanmaken
					</h2>
					<div className="flex w-full flex-col gap-4 py-4">
						<div className="flex flex-col">
							<label>Naam:</label>
							<input
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
								className="h-10 rounded border border-grc-dark-blue px-2"
							/>
						</div>
						<div className="flex flex-col">
							<label>Email:</label>
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								className="h-10 rounded border border-grc-dark-blue px-2"
							/>
						</div>
						<div className="flex flex-col">
							<label>Wachtwoord:</label>
							<input
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								className="h-10 rounded border border-grc-dark-blue px-2"
								onBlur={validatePassword}
							/>
						</div>
						<div className="flex flex-col">
							<label>Rol:</label>
							<select
								value={role}
								onChange={(e) => setRole(e.target.value)}
								required
								className="h-10 rounded border border-grc-dark-blue px-2"
							>
								<option value="moderator">Moderator</option>
								<option value="administrator">
									Administrator
								</option>
							</select>
						</div>
						<button
							onClick={handleSubmit}
							className="w-full rounded bg-grc-dark-blue p-2 px-2 text-white"
						>
							Aanmaken
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AdminSignUp;
