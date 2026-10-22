import { cleanEnv, str } from "envalid";
import "dotenv/config";

export const env = cleanEnv(process.env, {
	EMPLOYEE_USERNAME: str({ desc: "username" }),
	EMPLOYEE_PASSWORD: str({ desc: "password" }),
});
