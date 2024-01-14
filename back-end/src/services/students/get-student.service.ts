import { Students } from "@prisma/client";
import { prisma } from "../../config/prisma-client";

export namespace GetStudentService {
	export const execute = async (id: number): Promise<Students | null> => {
		return await prisma.students.findUnique({ where: { id } });
	};
}
