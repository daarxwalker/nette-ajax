const alreadyInitialized = 'Nette-ajax already initialized!'
const missingExtensionId = 'Missing extension id!'
const missingExtension = 'Missing extension!'
const missingTarget = 'Missing target!'
const missingHandler = 'Missing handler!'
const missingCallbackType = 'Missing callback type!'
const missingHandlers = 'No handlers found!'
const parseDomFailed = 'Parsing DOM failed!'
const missingSnippet = 'Missing snippet!'
const missingSnippets = 'No spinnets found!'
const missingRemoveChildsParent = 'While removing childs, no parent found!'
const requestFailed = 'Request failed!'

export const errors = {
	init: {
		alreadyInitialized,
	},
	ext: {
		register: {
			missingId: missingExtensionId,
			missingExt: missingExtension,
		},
	},
	request: {
		missingTarget,
		requestFailed,
	},
	event: {
		missingHandler,
	},
	callbacks: {
		missingCallbackType,
	},
	handler: {
		missingHandlers,
	},
	snippet: {
		missingSnippet,
		missingSnippets,
	},
	utils: {
		parseDomFailed,
		missingRemoveChildsParent,
	},
}
