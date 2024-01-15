import { prisma } from "../../../src/config/prisma-client";
import { login, createStudent } from "../../test-helpers";
import supertest from "supertest";
import app from "../../../src/http/app";

describe(`DELETE /api/students/:id`, () => {
	let token: string;
	let request: any;
	let studentId: number;

	beforeAll(async () => {
		token = await login();
		request = supertest(app());

		studentId = await createStudent({
			token,
			data: {
				cpf: "33724431015",
				name: "Jon Doe",
				email: "jondoe@mail.com",
				academicRecord: "300333",
			},
		});
	});

	test("should delete student and return status code 200", async () => {
		const { body, statusCode } = await request
			.delete(`/api/students/${studentId}`)
			.auth(token, { type: "bearer" });

		expect(body.isValid).toBe(true);
		expect(statusCode).toBe(200);
	});

	test("should fail and return status code 422", async () => {
		const { body, statusCode } = await request
			.delete(`/api/students/${"invalidId"}`)
			.auth(token, { type: "bearer" });

		expect(body.isValid).toBe(false);
		expect(statusCode).toBe(422);
	});

	test("should fail and return status code 404", async () => {
		const { body, statusCode } = await request
			.delete(`/api/students/999`)
			.auth(token, { type: "bearer" });

		expect(body.isValid).toBe(false);
		expect(statusCode).toBe(404);
	});
});
