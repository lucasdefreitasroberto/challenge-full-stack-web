import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { HttpException } from "../../factories/http-error.factory";
import { PresenterFactory } from "../../factories/presenter.factory";
import { ZodError } from "zod";
import { HttpStatus } from "@/helpers/http-status-code";
import parseZodErrors from "@/helpers/parse-zod-errors";

export const errorHandler = (
	err: Error,
	_: Request,
	res: Response,
	next: NextFunction
) => {
	if (err instanceof HttpException) {
		return res.status(err.status).send(
			new PresenterFactory({
				isValid: false,
				message: [err.message],
			})
		);
	}

	if (err instanceof ZodError) {
		return res.status(HttpStatus.BAD_REQUEST).send(
			new PresenterFactory({
				isValid: false,
				message: parseZodErrors(err),
			})
		);
	}

	return res
		.status(500)
		.send(new PresenterFactory({ isValid: false, message: [err.message] }));
};
