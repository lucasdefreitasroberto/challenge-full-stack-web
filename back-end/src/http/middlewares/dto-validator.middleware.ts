import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

export default (schema: AnyZodObject) =>
	async (req: Request, res: Response, next: NextFunction): Promise<any> => {
		let data = { ...req.query, ...req.body, ...req.params };

		if (data && data.id) data.id = Number(data.id);

		await schema.parseAsync(data);
		next();
	};
