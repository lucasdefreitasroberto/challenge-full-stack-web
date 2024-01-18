import { z } from "zod";

export type ListStudentDto = {
	page: string;
	perPage: string;
	search?: string;
};

export default z
	.object({
		page: z.string(),
		perPage: z.string(),
		search: z.string().optional().nullable(),
	})
	.strict();
