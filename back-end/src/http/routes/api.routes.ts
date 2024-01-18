import { Router } from "express";
import { StudentsController } from "../controllers/students.controller";
import validator from "../middlewares/dto-validator.middleware";
import { students, adminAuth } from "../validations";
import { JwtAuthMiddleware } from "../middlewares/jwt-auth.middleware";
import { AuthController } from "../controllers/auth.controller";

const privateRoutes = (): Router => {
	const router: Router = Router();

	router.get("/auth/verify", AuthController.verify);

	// students
	router.get("/students", validator(students.list), StudentsController.list);

	router.get(
		"/students/:id",
		validator(students.getOne),
		StudentsController.getOne
	);
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

export default (): Router => {
	const router: Router = Router();
	const secret: string = process.env.JWT_SECRET || "secret";

	router.post("/auth/login", validator(adminAuth.login), AuthController.login);

	router.use(JwtAuthMiddleware(secret), privateRoutes());
	return router;
};
