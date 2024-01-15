import { prisma } from "../src/config/prisma-client";

export default async () => {
	await prisma.students.deleteMany();
};
