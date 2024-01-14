import { Router } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "../../../swagger.json";

import { StudentsController } from "../controllers/students.controller";

export default (): Router => {
	const router: Router = Router();

	router.use(cors());

	// swagger
	router.use("/api-docs", swaggerUi.serve);
	router.get("/api-docs", swaggerUi.setup(swaggerDocs));

	// students
	router.get("/student", StudentsController.list);
	router.post("student", StudentsController.create);
	router.get("/student/:id", StudentsController.get);
	router.put("/student/:id", StudentsController.update);
	router.delete("/student/:id", StudentsController.destroy);

	return router;
};
