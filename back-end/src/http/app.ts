import express, { Express } from "express";
import routes from "./routes";

export default (): Express => {
	const app = express();

	app.use(routes());

	return app;
};
