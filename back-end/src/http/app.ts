import express, { Express } from "express";
import routes from "./routes";
import "express-async-errors";

import { errorHandler } from "./middlewares/error-handler.middleware";

export default (): Express => {
	const app = express();

	app.use(express.json())
	app.use(routes());
	app.use(errorHandler);

	return app;
};
