import { createStudent, login } from "../../test-helpers";
import supertest from "supertest";
import app from "../../../src/http/app";

describe(`GET /api/students/:id`, () => {
	let request: any;
	let token: string;
	let studentId: number;

	beforeAll(async () => {
		request = supertest(app());
		token = await login();

		studentId = await createStudent({
			token,
			data: {
				name: "Jon Doe",
				cpf: "33724431015",
				email: "jondoe@mail.com",
				academicRecord: "100111",
			},
		});
	});

	test("should get a student and return status code 200", async () => {
		const { body, statusCode } = await request
			.get(`/api/students/${studentId}`)
			.auth(token, { type: "bearer" });

		expect(body.isValid).toBe(true);
		expect(body.result[0]).toBeDefined();
		expect(statusCode).toBe(200);
	});

	test("should fail and return status code 404", async () => {
		const { body, statusCode } = await request
			.get("/api/students/999")
			.auth(token, { type: "bearer" });

		expect(body.isValid).toBe(false);
		expect(statusCode).toBe(404);
	});
});
