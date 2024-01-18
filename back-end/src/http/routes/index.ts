import cors from "cors";
import { Router } from "express";
import apiRoutes from "./api.routes";

export default (): Router => {
	const router: Router = Router();

	router.use(cors());

	// api-routes
	router.use("/api", apiRoutes());

	return router;
};
