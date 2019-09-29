import { registerEvent, getConfig } from 'services'
import { getDefaultHandlers } from 'utils'

const registeredHandlers = [] as Array<Element>

export const registerHandlers = (scope?: Element) => {
	const config = getConfig()
	const { selector, ajaxify } = config

	const handlers = (scope || document).querySelectorAll(ajaxify ? getDefaultHandlers() : selector)
	const handlersLength = handlers.length

	if (handlersLength > 0) {
		for (let i = -1; ++i < handlersLength; ) {
			const handler = handlers[i]
			if (registeredHandlers.indexOf(handler) === -1) {
				registeredHandlers.push(handler)
				registerEvent(handler)
			}
		}
	}
}
