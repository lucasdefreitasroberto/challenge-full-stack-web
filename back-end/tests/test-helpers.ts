import app from "../src/http/app";
import supertest from "supertest";

let token: string;

export const adminPassword = "12345678";

type Params = {
	token: string;
	data: {
		cpf: string;
		name: string;
		email: string;
		academicRecord: string;
	};
};

export const login = async (): Promise<string> => {
	if (token) return token;

	const request = supertest(app());

	const { body } = await request
		.post("/api/auth/login")
		.send({ username: "admin", password: adminPassword });

	token = body.result[0].token;

	return token;
};

export const createStudent = async ({
	token,
	data,
}: Params): Promise<number> => {
	const request = supertest(app());

	const response = await request
		.post("/api/students")
		.auth(token, { type: "bearer" })
		.send({
			name: data.name,
			cpf: data.cpf,
			email: data.email,
			academicRecord: data.academicRecord,
		});

	return response.body.result[0].id;
};
