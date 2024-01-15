/* eslint-disable import/extensions */
import { verify } from "jsonwebtoken";
import { HttpException } from "@/factories/http-error.factory";
import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "@/helpers/http-status-code";

export const JwtAuthMiddleware =
	(secret: string) => (req: Request, _res: Response, next: NextFunction) => {
		const authHeader = req.headers.authorization;

		if (!authHeader) {
			throw new HttpException("JWT token is missing", 422);
		}

		const [, token] = authHeader.split(" ");

		try {
			verify(token, secret);
			return next();
		} catch {
			throw new HttpException(
				"Invalid JWT token",
				HttpStatus.UNPROCESSABLE_ENTITY
			);
		}
	};
