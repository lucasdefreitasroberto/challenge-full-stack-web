import createStudentValidation from "./create-student.validation";
import updateStudentValidation from "./update-student.validation";
import getStudentValidation from "./get-student.validation";
import deleteStudentValidation from "./delete-student.validation";

export const students = {
	get: getStudentValidation,
	create: createStudentValidation,
	update: updateStudentValidation,
	delete: deleteStudentValidation,
};
