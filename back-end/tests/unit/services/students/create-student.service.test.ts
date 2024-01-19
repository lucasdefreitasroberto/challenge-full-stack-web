import { CreateStudentService } from "../../../../src/services/students/create-student.service";
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

test("should create new user ", async () => {
	prismaMock.students.create.mockResolvedValue(student);
	await expect(CreateStudentService.execute(student)).resolves.toEqual(student);
});

test("should failed on duplicate academicRecord", async () => {
	prismaMock.students.findUnique.mockResolvedValue(student);
	await expect(CreateStudentService.execute(student)).rejects.toEqual(
		new HttpException("academic record already exists", 409)
	);
});
