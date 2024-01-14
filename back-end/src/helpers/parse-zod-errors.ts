import { ZodError } from "zod";

const parseZodErrors = (error: ZodError) => {
	let errors: any = {};
	const formattedErrors: any = error.format();

	for (const key in formattedErrors) {
		if (formattedErrors.hasOwnProperty(key)) {
			const errorMessages = formattedErrors[key]._errors;
			if (errorMessages) {
				errors[key] = errorMessages;
			}
		}
	}

	const result: string[] = [];

	for (const key in errors) {
		if (errors.hasOwnProperty(key)) {
			const messages = errors[key].map(
				(message: string) => `${key}: ${message}`
			);
			result.push(...messages);
		}
	}

	const unrecognizedKeysError = formattedErrors._errors;

	if (unrecognizedKeysError.length) {
		result.push(unrecognizedKeysError[0]);
	}

	return result;
};

export default parseZodErrors;
