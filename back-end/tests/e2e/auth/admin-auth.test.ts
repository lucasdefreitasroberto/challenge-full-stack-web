import supertest from "supertest";
import app from "../../../src/http/app";

describe(`POST /api/auth`, () => {
	let request: any;
	let username: string;
	let password: string;

	beforeAll(async () => {
		request = supertest(app());
		username = process.env.ADMIN_USERNAME as string;
		password = process.env.ADMIN_PASSWORD as string;
	});

	test("should return token and status code 200", async () => {
		const { body, statusCode } = await request
			.post("/api/auth/login")
			.send({ username, password });

		expect(body.isValid).toBe(true);
		expect(body.result[0].token).toBeDefined();
		expect(statusCode).toBe(200);
	});

	test("should fail and status code 422", async () => {
		const { body, statusCode } = await request
			.post("/api/auth/login")
			.send({ username, password: "invalid password" });

		expect(body.isValid).toBe(false);
		expect(statusCode).toBe(422);
	});

	test("should fail to access without token and status code 422", async () => {
		const { body, statusCode } = await request
			.get("/api/students")
			.auth("invalid_token", { type: "bearer" });

		expect(body.isValid).toBe(false);
		expect(statusCode).toBe(422);
	});

	test("should fail to pass invalid token and status code 422", async () => {
		const { body, statusCode } = await request.get("/api/students");

		expect(body.isValid).toBe(false);
		expect(statusCode).toBe(422);
	});
});
