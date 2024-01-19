import { GetStudentService } from "../../../../src/services/students/get-student.service";
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

test("should get user data", async () => {
	prismaMock.students.findUnique.mockResolvedValue(student);

	await expect(GetStudentService.execute(1)).resolves.toEqual(student);
});

test("should failed on duplicate academicRecord", async () => {
	prismaMock.students.findUnique.mockResolvedValue(null);

	await expect(GetStudentService.execute(1)).rejects.toEqual(
		new HttpException("student not found", 404)
	);
});
