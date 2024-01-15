import { z } from "zod";

export type CreateStudentDto = {
	cpf: string;
	name: string;
	email: string;
	academicRecord: string;
};

export default z
	.object({
		cpf: z.string(),
		name: z.string(),
		email: z.string(),
		academicRecord: z.string(),
	})
	.strict();
