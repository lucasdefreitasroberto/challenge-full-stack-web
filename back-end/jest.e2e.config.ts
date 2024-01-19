import type { JestConfigWithTsJest } from "ts-jest";

/** @type {import('ts-jest').JestConfigWithTsJest} */
const jestConfig: JestConfigWithTsJest = {
	preset: "ts-jest",
	displayName: "e2e",
	globalTeardown: "<rootDir>/jest.e2e.teardown.ts",
	testMatch: ["**/tests/**/e2e/**/*.test.ts", "**/tests/**/e2e/**/*.spec.ts"],
	coveragePathIgnorePatterns: [
		"node_modules/",
		"src/@types",
		"src/config",
		"src/http/middlewares",
		"src/http/validations",
		"src/http/routes",
		"src/factories",
		"src/helpers",
		"src/http/app.ts",
		"src/index.ts",
	],
	moduleNameMapper: {
		"@/(.*)$": "<rootDir>/src/$1",
	},
};

export default jestConfig;
