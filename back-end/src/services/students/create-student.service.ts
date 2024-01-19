import prisma from "@/config/prisma-client";
import { HttpStatus } from "@/helpers/http-status-code";
import { HttpException } from "@/factories/http-error.factory";
import { CreateStudentDto } from "@/http/validations/students/create-student.validation";
import { Students } from "@prisma/client";

export namespace CreateStudentService {
	export const execute = async (data: CreateStudentDto): Promise<Students> => {
		const alreadyExist = await prisma.students.findUnique({
			where: { academicRecord: data.academicRecord },
		});

		if (alreadyExist)
			throw new HttpException(
				"academic record already exists",
				HttpStatus.CONFLICT
			);

		return await prisma.students.create({
			data,
		});
	};
}
