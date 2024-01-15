import { z } from "zod";

export type AdminAuthenticationDto = {
	username: string;
	password: string;
};

export default z
	.object({
		username: z.string(),
		password: z.string(),
	})
	.strict();
