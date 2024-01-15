import { z } from "zod";

export type UpdateStudentDto = {
	name?: string;
	email?: string;
};

export default z
	.object({
		id: z.number(),
		name: z.string(),
		email: z.string(),
	})
	.strict();
