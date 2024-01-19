import { HttpStatus } from "@/helpers/http-status-code";
import { HttpException } from "@/factories/http-error.factory";
import { AdminAuthenticationDto } from "@/http/validations/auth/admin-auth.validation";
import jwt from "jsonwebtoken";
import prisma from "@/config/prisma-client";
import { compare } from "bcrypt";

export namespace AdminAuthService {
	export const execute = async ({
		username,
		password,
	}: AdminAuthenticationDto): Promise<any> => {
		const secret = process.env.JWT_SECRET as string;
		const expiration = 3.6e6 * 48;

		const user = await prisma.users.findUnique({ where: { username } });

		if (!user) throw new HttpException("user not found", HttpStatus.NOT_FOUND);

		const areEqual = await compare(password, user.password);

		if (!areEqual)
			throw new HttpException("invalid credentials", HttpStatus.UNAUTHORIZED);

		const token = jwt.sign({ id: user.id, username }, secret, {
			expiresIn: expiration,
		});

		const expiresIn = new Date();

		expiresIn.setTime(expiresIn.getTime() + expiration);

		const response = { token, expiresIn: expiresIn.toISOString() };

		return response;
	};
}
