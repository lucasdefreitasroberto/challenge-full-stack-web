import { ListStudentService } from "../../../../src/services/students/list-student.service";
import { prismaMock } from "../../../../src/config/prisma-singleton";
import { HttpException } from "../../../../src/factories/http-error.factory";

const student = {
	id: 1,
	name: "Jon Doe",
	email: "jondoe@email.com",
	cpf: "098.486.590-05",
	academicRecord: "100045",
	createdAt: new Date(),
	updatedAt: new Date(),
};

test("should get user list", async () => {
	prismaMock.students.count.mockResolvedValue(1);
	prismaMock.students.findMany.mockResolvedValue([student]);

	await expect(
		ListStudentService.execute({ page: 1, perPage: 10 }, "Jon")
	).resolves.toEqual({ count: 1, students: [student] });
});

test("should get empty array", async () => {
	prismaMock.students.count.mockResolvedValue(0);

	await expect(
		ListStudentService.execute({ page: 1, perPage: 10 }, "Jon")
	).resolves.toEqual({
		count: 0,
		students: [],
	});
});
