import {
	CognitoUserAttribute,
	CognitoUserPool,
	CognitoUser
} from "amazon-cognito-identity-js";
import userPool from "../components/authentication/userPool";

export function signUpUser(name, email, password, role) {
	return new Promise((resolve, reject) => {
		const attributeList = [
			new CognitoUserAttribute({ Name: "name", Value: name }),
			new CognitoUserAttribute({ Name: "email", Value: email })
		];

		userPool.signUp(
			email,
			password,
			attributeList,
			null,
			async (err, result) => {
				if (err) {
					reject(err);
				} else {
					try {
						const user = new CognitoUser({
							Username: email,
							Pool: userPool
						});
						await addUserToGroup(user, role);
						resolve(result);
					} catch (error) {
						reject(error);
					}
				}
			}
		);
	});
}

function addUserToGroup(user, role) {
	const groupName =
		role === "administrator" ? "administrators" : "moderators";

	return new Promise((resolve, reject) => {
		userPool.getUserSession((err, session) => {
			if (err) {
				reject(err);
			} else {
				const params = {
					GroupName: groupName,
					Username: user.getUsername()
				};

				userPool.client.adminAddUserToGroup(params, (err, data) => {
					if (err) {
						reject(err);
					} else {
						resolve(data);
					}
				});
			}
		});
	});
}
