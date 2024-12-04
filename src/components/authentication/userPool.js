import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
	UserPoolId: "eu-central-1_nwuYXdxNl",
	ClientId: "5lui6sf7sk7rl92k3jp3sf9ldn"
};

export default new CognitoUserPool(poolData);
