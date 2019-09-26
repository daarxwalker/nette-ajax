import { errors } from 'constant'
import { registerEvent, getConfig } from 'services'

export const registerHandlers = (scope?: Element) => {
	const config = getConfig()
	const { selector } = config

	const handlers = (scope || document).querySelectorAll(selector)
	const handlersLength = handlers.length

	if (handlersLength === 0) throw new Error(errors.handler.missingHandlers)
	for (let i = -1; ++i < handlersLength; ) {
		const handler = handlers[i]
		registerEvent(handler)
	}
}
