import createStudentValidation from "./students/create-student.validation";
import updateStudentValidation from "./students/update-student.validation";
import getStudentValidation from "./students/get-student.validation";
import deleteStudentValidation from "./students/delete-student.validation";

import adminAuthValidation from "./auth/admin-auth.validation";

export const students = {
	getOne: getStudentValidation,
	create: createStudentValidation,
	update: updateStudentValidation,
	delete: deleteStudentValidation,
};

export const adminAuth = {
	login: adminAuthValidation,
};
