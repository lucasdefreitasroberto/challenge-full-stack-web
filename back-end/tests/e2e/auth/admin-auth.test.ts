import supertest from "supertest";
import app from "../../../src/http/app";
import { adminPassword } from "../../test-helpers";

describe(`POST /api/auth`, () => {
	let request: any;
	const username: string = "admin";
	const password: string = adminPassword;

	beforeAll(async () => {
		request = supertest(app());
	});

	test("should return token and status code 200", async () => {
		const { body, statusCode } = await request
			.post("/api/auth/login")
			.send({ username, password });

		expect(body.isValid).toBe(true);
		expect(body.result[0].token).toBeDefined();
		expect(statusCode).toBe(200);
	});

	test("should fail and status code 401", async () => {
		const { body, statusCode } = await request
			.post("/api/auth/login")
			.send({ username, password: "invalid password" });

		expect(body.isValid).toBe(false);
		expect(statusCode).toBe(401);
	});
});
