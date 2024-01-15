import app from "../../../src/http/app";
import supertest from "supertest";
import { createStudent, login } from "../../test-helpers";

describe(`PUT /api/students/:id`, () => {
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
				academicRecord: "200212",
			},
		});
	});

	test("should update student and return status code 200", async () => {
		const { body, statusCode } = await request
			.put(`/api/students/${studentId}`)
			.auth(token, { type: "bearer" })
			.send({
				name: "New",
				email: "new@mail.com",
			});

		expect(body.isValid).toBe(true);
		expect(statusCode).toBe(200);
	});

	test("should fail and return status code 422", async () => {
		const { body, statusCode } = await request
			.put(`/api/students/${studentId}`)
			.auth(token, { type: "bearer" })
			.send({
				name: "Jon Doe",
				email: "jondoe@mail.com",
				cpf: "33724431015",
			});

		expect(body.isValid).toBe(false);
		expect(statusCode).toBe(422);
	});
});
