import { Router } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "../../../swagger.json";

import apiRoutes from "./api.routes";

export default (): Router => {
	const router: Router = Router();

	router.use(cors());

	// swagger
	router.use("/api-docs", swaggerUi.serve);
	router.get("/api-docs", swaggerUi.setup(swaggerDocs));

	// api routes
	router.use(
		"/api",
		(req, _res, next) => {
			// console.log(req.body);
			next();
		},
		apiRoutes()
	);

	return router;
};
