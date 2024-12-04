import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import NewPasswordForm from "./NewPasswordForm";

function Login() {
	const {
		authenticateUser,
		newPasswordRequired,
		loggedIn,
		currentUser,
		userGroup
	} = useContext(AuthContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<div className="flex w-full flex-col items-center justify-center py-40">
			<div className="flex w-2/3 flex-col items-center justify-center gap-20 sm:w-96">
				{loggedIn ? (
					<h1 className="text-2xl">
						Je bent al ingelogd op{" "}
						<span className="font-bold">{currentUser}</span> met de
						rol van <span className="font-bold">{userGroup}</span>
					</h1>
				) : (
					<>
						<h1 className="text-3xl font-bold">Admin login</h1>
						{!newPasswordRequired ? (
							<>
								<ul className="flex w-full flex-col gap-4 py-4">
									<li className="flex flex-col">
										<label>Email</label>
										<input
											type="text"
											onChange={(e) =>
												setEmail(e.target.value)
											}
											value={email}
											className="h-10 rounded border border-grc-dark-blue px-2"
										/>
									</li>
									<li className="flex flex-col">
										<label>Wachtwoord</label>
										<input
											type="password"
											onChange={(e) =>
												setPassword(e.target.value)
											}
											value={password}
											className="h-10 rounded border border-grc-dark-blue px-2"
										/>
									</li>
								</ul>
								<button
									onClick={() =>
										authenticateUser(email, password)
									}
									className="w-full rounded bg-grc-dark-blue p-2 px-2 text-white"
								>
									Login
								</button>
							</>
						) : (
							<NewPasswordForm />
						)}
					</>
				)}
			</div>
		</div>
	);
}

export default Login;
