export const getDefaultHandlers = () =>
	[
		'a',
		'button:not([type="submit"])',
		'form',
		'textarea',
		'input[type="text"]',
		'input[type="checkbox"]',
		'input[type="radio"]',
		'input[type="image"]',
	].join(', ')
