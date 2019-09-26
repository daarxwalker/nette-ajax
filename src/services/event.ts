import debounce from 'debounce'

import { errors } from 'constant'
import { makeRequest, getConfig } from 'services'
import { getEventByTagName, getTagNameByElement, getUrlByHandler, isTagWriteable } from 'utils'
import { TagType } from 'models'

export const registerEvent = (handler: Element) => {
	if (!handler) throw new Error(errors.event.missingHandler)
	const config = getConfig()
	const { extensionAttr, debounceDelay } = config
	const tagName = getTagNameByElement(handler)
	const tagType = handler.getAttribute('type') as TagType
	const event = getEventByTagName(tagName, tagType)
	const url = getUrlByHandler(handler)
	const extensionId = handler.getAttribute(extensionAttr)

	const handleRequest = async (e: Event) => {
		e.preventDefault()
		const target = extensionId || url || ''
		await makeRequest(target)
	}

	handler.addEventListener(
		event,
		isTagWriteable(tagName, tagType) ? debounce(handleRequest, debounceDelay) : handleRequest,
	)
}
