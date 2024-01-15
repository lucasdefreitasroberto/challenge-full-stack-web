import cors from "cors";
import { Router } from "express";
import apiRoutes from "./api.routes";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "../../../swagger.json";

export default (): Router => {
	const router: Router = Router();
	const secret: string = process.env.JWT_SECRET || "secret";

	router.use(cors());

	// swagger
	router.use("/api-docs", swaggerUi.serve);
	router.get("/api-docs", swaggerUi.setup(swaggerDocs));

	// api-routes
	router.use("/api", apiRoutes());

	return router;
};
