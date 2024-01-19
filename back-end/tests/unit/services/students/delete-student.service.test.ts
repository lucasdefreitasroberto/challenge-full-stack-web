import { DeleteStudentService } from "../../../../src/services/students/delete-student.service";
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

test("should delete a user ", async () => {
	prismaMock.students.findUnique.mockResolvedValue(student);
	prismaMock.students.delete.mockResolvedValue(student);

	await expect(DeleteStudentService.execute(1)).resolves.toEqual(student);
});

test("should failed sending invalid id", async () => {
	prismaMock.students.findUnique.mockResolvedValue(null);

	await expect(DeleteStudentService.execute(1)).rejects.toEqual(
		new HttpException("student not found", 404)
	);
});
