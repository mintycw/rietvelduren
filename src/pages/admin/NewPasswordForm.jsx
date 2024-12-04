import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider";

function NewPasswordForm() {
	const { handleNewPasswordSubmit } = useContext(AuthContext);
	const [newPassword, setNewPassword] = useState("");
	const [confirmNewPassword, setConfirmNewPassword] = useState("");

	function handleSubmit() {
		if (newPassword === confirmNewPassword) {
			handleNewPasswordSubmit(newPassword);
		} else {
			alert("Passwords do not match");
		}
	}

	return (
		<>
			<h2 className="w-full text-center text-xl">
				Nieuw Wachtwoord Vereist
			</h2>
			<ul className="flex w-full flex-col gap-4 py-4">
				<li className="flex flex-col">
					<label>Nieuw Wachtwoord</label>
					<input
						type="password"
						placeholder="New Password"
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
						className="h-10 w-full rounded border border-grc-dark-blue px-2"
					/>
				</li>
				<li className="flex flex-col">
					<label>Nieuw Wachtwoord Bevestigen</label>
					<input
						type="password"
						onChange={(e) => setConfirmNewPassword(e.target.value)}
						value={confirmNewPassword}
						className="h-10 rounded border border-grc-dark-blue px-2"
					/>
				</li>
			</ul>
			<button
				onClick={() => handleSubmit()}
				className="w-full rounded bg-grc-dark-blue p-2 px-2 text-white"
			>
				Wachtwoord Bevestigen
			</button>
		</>
	);
}

export default NewPasswordForm;
