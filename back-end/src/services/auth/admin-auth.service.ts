import { HttpStatus } from "@/helpers/http-status-code";
import { HttpException } from "@/factories/http-error.factory";
import { AdminAuthenticationDto } from "@/http/validations/auth/admin-auth.validation";
import jwt from "jsonwebtoken";

export namespace AdminAuthService {
	export const execute = async ({
		username,
		password,
	}: AdminAuthenticationDto): Promise<any> => {
		const secret = process.env.JWT_SECRET as string;
		const admUsername = process.env.ADMIN_USERNAME;
		const admPassword = process.env.ADMIN_PASSWORD;
		const expiration = 3.6e6 * 48;

		if (admUsername !== username || admPassword !== password)
			throw new HttpException(
				"wrong credentials",
				HttpStatus.UNPROCESSABLE_ENTITY
			);

		const token = jwt.sign({ username }, secret, {
			expiresIn: expiration,
		});

		const expiresIn = new Date();

		expiresIn.setTime(expiresIn.getTime() + expiration);

		const response = { token, expiresIn: expiresIn.toISOString() };
		
		return response;
	};
}
