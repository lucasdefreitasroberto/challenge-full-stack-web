import prisma from "@/config/prisma-client";
import { Prisma } from "@prisma/client";

export namespace ListStudentService {
	export const execute = async (
		pagination: {
			page: number;
			perPage: number;
		},
		search?: string
	) => {
		let students: any = [];

		const count = await prisma.students.count();

		const where: Prisma.StudentsWhereInput | undefined = search
			? {
					OR: [
						{ cpf: { contains: search } },
						{ name: { contains: search, mode: "insensitive" } },
						{ email: { contains: search } },
						{ academicRecord: { contains: search } },
					],
			  }
			: undefined;

		if (count > 0)
			students = await prisma.students.findMany({
				where,
				select: {
					id: true,
					name: true,
					academicRecord: true,
					cpf: true,
					email: true,
				},
				take: pagination.perPage,
				skip: (pagination.page - 1) * pagination.perPage,
				orderBy: { id: "desc" },
			});

		return { count, students };
	};
}
