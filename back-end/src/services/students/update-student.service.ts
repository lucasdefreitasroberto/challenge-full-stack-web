import { prisma } from "@/config/prisma-client";
import { HttpException } from "@/factories/http-error.factory";
import { HttpStatus } from "@/helpers/http-status-code";
import { UpdateStudentDto } from "@/http/validations/students/update-student.validation";
import { Students } from "@prisma/client";

export namespace UpdateStudentService {
	export const execute = async (
		id: number,
		data: UpdateStudentDto
	): Promise<Students> => {
		const exist = await prisma.students.findUnique({
			where: { id },
		});

		if (!exist)
			throw new HttpException("student not found", HttpStatus.NOT_FOUND);

		return await prisma.students.update({ where: { id }, data });
	};
}
