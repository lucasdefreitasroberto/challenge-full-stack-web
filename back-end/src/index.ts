import { prisma } from "./config/prisma-client";
import app from "./http/app";

const port = Number(process.env.PORT || 3000);
const host = "0.0.0.0";

prisma.$connect().then(() => {
	app().listen(port, host, () => {
		console.info(`Server running on http://${host}:${port}`);
	});
});
