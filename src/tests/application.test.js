const inputValidator = require('../client/js/inputValidator');

// input is valid if both input strings are not empty
test('Test if input is valid input', () => {
	const value = inputValidator.notEmptyInput("", "");
	expect(Boolean(value))
	.toBe(false);
});

test('Test if input is valid input', () => {
	const value = inputValidator.notEmptyInput("Berlin", "");
	expect(Boolean(value))
	.toBe(false);
});

test('Test if input is valid input', () => {
	const value = inputValidator.notEmptyInput("", "2020-06-03");
	expect(Boolean(value))
	.toBe(false);
});

test('Test if input is valid input', () => {
	const value = inputValidator.notEmptyInput("Berlin", "2020-06-03");
	expect(Boolean(value))
	.toBe(true);
});