import { AdminAuthService } from "../../../../src/services/auth/admin-auth.service";
import { prismaMock } from "../../../../src/config/prisma-singleton";
import { HttpException } from "../../../../src/factories/http-error.factory";
import { hashSync } from "bcrypt";
import { string } from "zod";

const user = {
	id: 1,
	username: "admin",
	password: hashSync("12345678", 10),
};

test("should authenticate user and return token", async () => {
	const credentials = { username: "admin", password: "12345678" };

	prismaMock.users.findUnique.mockResolvedValue(user);

	await expect(AdminAuthService.execute(credentials)).resolves.toEqual(
		expect.objectContaining({
			token: expect.any(String),
			expiresIn: expect.any(String),
		})
	);
});

test("should failed passing invalid username", async () => {
	const credentials = { username: "invalid", password: "12345678" };

	prismaMock.users.findUnique.mockResolvedValue(null);

	await expect(AdminAuthService.execute(credentials)).rejects.toEqual(
		new HttpException("user not found", 404)
	);
});

test("should failed passing wrong password", async () => {
	const credentials = { username: "admin", password: "invalid" };

	prismaMock.users.findUnique.mockResolvedValue(user);

	await expect(AdminAuthService.execute(credentials)).rejects.toEqual(
		new HttpException("invalid credentials", 401)
	);
});
