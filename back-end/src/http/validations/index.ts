import createStudentValidation from "./students/create-student.validation";
import updateStudentValidation from "./students/update-student.validation";
import getStudentValidation from "./students/get-student.validation";
import deleteStudentValidation from "./students/delete-student.validation";
import listStudentValidation from "./students/list-student.validation";

import adminAuthValidation from "./auth/admin-auth.validation";

export const students = {
	list: listStudentValidation,
	getOne: getStudentValidation,
	create: createStudentValidation,
	update: updateStudentValidation,
	delete: deleteStudentValidation,
};

export const adminAuth = {
	login: adminAuthValidation,
};
