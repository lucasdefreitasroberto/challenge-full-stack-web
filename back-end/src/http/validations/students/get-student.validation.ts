import { z } from "zod";

export default z
	.object({
		id: z.number(),
	})
	.strict();
