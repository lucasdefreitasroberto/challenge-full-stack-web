import supertest from "supertest";
import { login } from "../../test-helpers";
import app from "../../../src/http/app";

describe(`POST /api/students`, () => {
	let token: string;
	let request: any;

	beforeAll(async () => {
		request = supertest(app());
		token = await login();
	});

	test("should create student and return status code 200", async () => {
		const { body, statusCode } = await request
			.post("/api/students")
			.auth(token, { type: "bearer" })
			.send({
				academicRecord: "20021",
				email: "jondoe@mail.com",
				name: "Jon Doe",
				cpf: "33724431015",
			});

		expect(body.isValid).toBe(true);
		expect(statusCode).toBe(200);
	});

	test("should fail and return status code 409", async () => {
		await request.post(`/api/students`).auth(token, { type: "bearer" }).send({
			academicRecord: "20021",
			email: "jondoe@mail.com",
			name: "Jon Doe",
			cpf: "33724431015",
		});

		const { body, statusCode } = await request
			.post(`/api/students`)
			.auth(token, { type: "bearer" })
			.send({
				academicRecord: "20021",
				email: "jondoe@mail.com",
				name: "Jon Doe",
				cpf: "33724431015",
			});

		expect(body.isValid).toBe(false);
		expect(statusCode).toBe(409);
	});

	test("should fail and return status code 422", async () => {
		const { body, statusCode } = await request
			.post(`/api/students`)
			.auth(token, { type: "bearer" })
			.send({
				academicRecord: 2222,
				cpf: "99999999999",
				name: "Some User",
				wrongField: 12,
			});

		expect(body.isValid).toBe(false);
		expect(statusCode).toBe(422);
	});
});
