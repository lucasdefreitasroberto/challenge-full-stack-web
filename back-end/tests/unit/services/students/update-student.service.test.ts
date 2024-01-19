import { UpdateStudentService } from "../../../../src/services/students/update-student.service";
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

test("should update user data", async () => {
	const updatedStudent = student;
	updatedStudent.name = "New Name";

	prismaMock.students.findUnique.mockResolvedValue(student);
	prismaMock.students.update.mockResolvedValue(updatedStudent);

	await expect(
		UpdateStudentService.execute(1, updatedStudent)
	).resolves.toEqual(updatedStudent);
});

test("should failed on duplicate academicRecord", async () => {
	const updatedStudent = student;
	updatedStudent.name = "New Name";

	prismaMock.students.findUnique.mockResolvedValue(null);

	await expect(UpdateStudentService.execute(1, student)).rejects.toEqual(
		new HttpException("student not found", 404)
	);
});
