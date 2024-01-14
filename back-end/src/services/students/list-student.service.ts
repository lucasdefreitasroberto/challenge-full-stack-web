import { Students } from "@prisma/client";
import { prisma } from "../../config/prisma-client";

export namespace ListStudentService {
	export const execute = async (): Promise<Students[]> => {
		const students = await prisma.students.findMany();
		return students;
	};
}
