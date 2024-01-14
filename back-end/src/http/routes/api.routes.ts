import { Router } from "express";
import { StudentsController } from "../controllers/students.controller";
import validator from "../middlewares/dto-validator.middleware";
import { students } from "../validations";

export default (): Router => {
	const router: Router = Router();

	// students
	router.get("/students", StudentsController.list);
	router.get("/students/:id", validator(students.get), StudentsController.get);
	router.post(
		"/students",
		validator(students.create),
		StudentsController.create
	);
	router.put(
		"/students/:id",
		validator(students.update),
		StudentsController.update
	);
	router.delete(
		"/students/:id",
		validator(students.delete),
		StudentsController.destroy
	);

	return router;
};
