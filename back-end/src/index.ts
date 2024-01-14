import app from "./http/app";

const port = Number(process.env.PORT || 3000);
const host = "0.0.0.0";

app().listen(port, host, () => {
	console.info(`Server running on http://${host}:${port}`);
});
