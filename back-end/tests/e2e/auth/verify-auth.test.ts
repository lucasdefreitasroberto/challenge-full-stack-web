import supertest from "supertest";
import app from "../../../src/http/app";
import { login } from "../../test-helpers";

describe(`POST /api/auth`, () => {
	let request: any;
	let token: string;

	beforeAll(async () => {
		request = supertest(app());
		token = await login();
	});

	test("should return token and status code 200", async () => {
		const { body, statusCode } = await request
			.get("/api/auth/verify")
			.auth(token, { type: "bearer" });

		expect(body.isValid).toBe(true);
		expect(statusCode).toBe(200);
	});

	test("should fail and status code 401", async () => {
		const { body, statusCode } = await request
			.get("/api/auth/verify")
			.auth("invalidToken", { type: "bearer" });

		expect(body.isValid).toBe(false);
		expect(statusCode).toBe(401);
	});

	test("should fail and status code 422", async () => {
		const { body, statusCode } = await request.get("/api/auth/verify");

		expect(body.isValid).toBe(false);
		expect(statusCode).toBe(422);
	});
});
