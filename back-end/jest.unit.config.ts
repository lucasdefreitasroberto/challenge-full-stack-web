import type { JestConfigWithTsJest } from "ts-jest";

/** @type {import('ts-jest').JestConfigWithTsJest} */
const jestConfig: JestConfigWithTsJest = {
	preset: "ts-jest",
	displayName: "unit",
	testMatch: ["**/tests/**/unit/**/*.test.ts", "**/tests/**/unit/**/*.spec.ts"],
	testEnvironment: "node",
	coveragePathIgnorePatterns: [
		"node_modules/",
		"src/@types",
		"src/config",
		"src/factories",
		"src/helpers",
		"src/http/controllers",
		"src/http/middlewares",
		"src/http/validations",
		"src/http/routes",
		"src/http/app.ts",
		"src/index.ts",
	],
	setupFilesAfterEnv: ["<rootDir>/src/config/prisma-singleton.ts"],
	moduleNameMapper: {
		"@/(.*)$": "<rootDir>/src/$1",
	},
};

export default jestConfig;
