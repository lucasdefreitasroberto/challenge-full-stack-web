import app from "@/http/app";
import supertest from "supertest";

let token: string;

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

	const username = process.env.ADMIN_USERNAME;
	const password = process.env.ADMIN_PASSWORD;

	const { body } = await request
		.post("/api/auth/login")
		.send({ username, password });

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
