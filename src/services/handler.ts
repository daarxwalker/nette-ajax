import { errors } from 'constant'
import { registerEvent, getConfig } from 'services'
import { getDefaultHandlers } from 'utils'

export const registerHandlers = (scope?: HTMLElement | Document) => {
	const config = getConfig()
	const { selector, ajaxify } = config

	const handlers = (scope || document).querySelectorAll(ajaxify ? getDefaultHandlers() : selector)
	const handlersLength = handlers.length

	if (handlersLength === 0) throw new Error(errors.handler.missingHandlers)
	for (let i = -1; ++i < handlersLength; ) {
		const handler = handlers[i]
		registerEvent(handler)
	}
}
