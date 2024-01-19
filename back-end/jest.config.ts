import type { JestConfigWithTsJest } from "ts-jest";

/** @type {import('ts-jest').JestConfigWithTsJest} */
const jestConfig: JestConfigWithTsJest = {
	testEnvironment: "node",
	testPathIgnorePatterns: ["./node_modules/"],
	projects: ["<rootDir>/jest.unit.config.ts", "<rootDir>/jest.e2e.config.ts"],
	collectCoverage: true,
	coverageDirectory: "coverage",
	coverageProvider: "babel",
	collectCoverageFrom: ["<rootDir>/src/**/*"],
};

export default jestConfig;
