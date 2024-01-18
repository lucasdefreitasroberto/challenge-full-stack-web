import { Students } from "@prisma/client";
import { prisma } from "@/config/prisma-client";
import { HttpException } from "@/factories/http-error.factory";
import { HttpStatus } from "@/helpers/http-status-code";

export namespace GetStudentService {
	export const execute = async (id: number): Promise<Students | null> => {
		const student = await prisma.students.findUnique({ where: { id } });

		if (!student)
			throw new HttpException("student not found", HttpStatus.NOT_FOUND);

		return student;
	};
}
