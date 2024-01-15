import { createStudent, login } from "../../test-helpers";
import supertest from "supertest";
import app from "../../../src/http/app";

describe(`GET /api/students`, () => {
	let request: any;
	let token: string;

	beforeAll(async () => {
		request = supertest(app());
		token = await login();

		await createStudent({
			token,
			data: {
				name: "Jon Doe",
				cpf: "33724431015",
				email: "jondoe@mail.com",
				academicRecord: "400444",
			},
		});
	});

	test("should get a student list and return status code 200", async () => {
		const { body, statusCode } = await request
			.get("/api/students")
			.auth(token, { type: "bearer" });

		expect(body.isValid).toBe(true);
		expect(body.result.length).toBeDefined();
		expect(statusCode).toBe(200);
	});
});
