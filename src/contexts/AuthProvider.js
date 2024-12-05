import React, { useState, createContext, useMemo, useEffect } from "react";
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import userPool from "../components/authentication/userPool";

export const AuthContext = createContext();

function AuthProvider(props) {
	const [loggedIn, setLoggedIn] = useState(false);
	const [currentUser, setCurrentUser] = useState("");
	const [userGroup, setUserGroup] = useState(""); // State to store user groups
	const [cognitoUser, setCognitoUser] = useState(null); // Cognito user state to store the current user

	const [newPasswordRequired, setNewPasswordRequired] = useState(false); // State to track if a new password is required

	const navigate = useNavigate();

	useEffect(() => {
		const checkSession = () => {
			const user = userPool.getCurrentUser();

			if (user) {
				user.getSession((err, session) => {
					if (err) {
						console.error(err);
					} else {
						const idToken = session.getIdToken().getJwtToken(); // Get JWT token from session
						const decodedToken = jwtDecode(idToken);
						const groups = decodedToken["cognito:groups"];
						if (
							// Check if the user is an administrator or moderator
							groups &&
							(groups.includes("administrators") ||
								groups.includes("moderators"))
						) {
							setLoggedIn(true);
							setUserGroup(groups[0]);
							setCurrentUser(decodedToken["name"]);
							setCognitoUser(user);
						}
					}
				});
			}
		};

		checkSession();
	}, []);

	async function createUser(userData) {
		console.log(userData);
		fetch(process.env.REACT_APP_BASE_URL + "/account/createUser", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(userData)
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				if (data.statusCode === 200) {
					alert("Account aangemaakt");
					navigate("/admin/dashboard");
				}
			});
	}

	async function authenticateUser(email, password) {
		return new Promise((resolve, reject) => {
			const authenticationDetails = new AuthenticationDetails({
				Username: email,
				Password: password
			});

			const user = new CognitoUser({
				Username: email,
				Pool: userPool
			});

			setCognitoUser(user);

			user.authenticateUser(authenticationDetails, {
				onSuccess: function (result) {
					const idToken = result.getIdToken().getJwtToken();
					const decodedToken = jwtDecode(idToken);
					const groups = decodedToken["cognito:groups"];
					if (!groups) {
						alert("You are not authorized to view this page");
						resolve();
					} else if (
						groups.includes("administrators") ||
						groups.includes("moderators")
					) {
						setLoggedIn(true);
						setUserGroup(groups[0]);
						setCurrentUser(decodedToken["name"]);
						navigate("/admin/dashboard");
						resolve(result);
					}
				},

				onFailure: function (err) {
					alert(err.message || JSON.stringify(err));
					reject(err);
				},

				newPasswordRequired: function () {
					// Set the state to show the new password form
					setNewPasswordRequired(true);
				}
			});
		});
	}

	function handleNewPasswordSubmit(newPassword) {
		if (cognitoUser && newPassword) {
			cognitoUser.completeNewPasswordChallenge(
				newPassword,
				{},
				{
					onSuccess: function (result) {
						const idToken = result.getIdToken().getJwtToken();
						const decodedToken = jwtDecode(idToken);
						const groups = decodedToken["cognito:groups"];
						if (!groups) {
							alert("You are not authorized to view this page");
						} else if (
							groups.includes("administrators") ||
							groups.includes("moderators")
						) {
							setLoggedIn(true);
							setUserGroup(groups[0]);
							setCurrentUser(decodedToken["name"]);
							setNewPasswordRequired(false); // Hide the new password form
							navigate("/admin/dashboard");
						}
					},
					onFailure: function (err) {
						alert(err.message || JSON.stringify(err));
					}
				}
			);
		}
	}

	function logOut() {
		return new Promise((resolve, reject) => {
			if (cognitoUser) {
				cognitoUser.signOut();
				setLoggedIn(false);
				setUserGroup("");
				setCurrentUser("");
				navigate("/");
				resolve("User has been logged out");
			} else {
				reject("No user to log out");
			}
		});
	}

	const value = useMemo(
		// Memoize the value to prevent unnecessary re-renders
		() => ({
			loggedIn,
			userGroup,
			newPasswordRequired,
			currentUser,
			authenticateUser,
			handleNewPasswordSubmit,
			logOut,
			createUser
		}),
		[loggedIn, userGroup, newPasswordRequired, currentUser, cognitoUser]
	);

	return (
		<AuthContext.Provider value={value}>
			{props.children}
		</AuthContext.Provider>
	);
}

export default AuthProvider;
