import { prisma } from "@/config/prisma-client";
import app from "@/http/app";
import { Users } from "@prisma/client";
import { hash } from "bcrypt";
import supertest from "supertest";

let token: string;
let user: Users;

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

export const createUser = async () => {
	user = await prisma.users.upsert({
		where: {
			username: "admin",
		},
		update: {},
		create: {
			username: "admin",
			password: await hash(adminPassword, 10),
		},
	});
};

export const login = async (): Promise<string> => {
	if (token) return token;

	const request = supertest(app());

	if (!user) await createUser();

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
