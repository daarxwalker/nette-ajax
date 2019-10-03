import debounce from 'debounce'

import { errors } from 'constant'
import { getConfig, makeRequest, setState } from 'services'
import { getEventByTagName, getMethodByHandler, getTagNameByElement, getUrlByHandler, isTagWriteable } from 'utils'
import { TagType } from 'models'

type Target = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement

export const registerEvent = (handler: Element) => {
	if (!handler) throw new Error(errors.event.missingHandler)
	const config = getConfig()
	const { extensionAttr, debounceDelay } = config
	const tagName = getTagNameByElement(handler)
	const tagType = handler.getAttribute('type') as TagType
	const event = getEventByTagName(tagName, tagType)
	const url = getUrlByHandler(handler)
	const method = getMethodByHandler(handler)
	const extensionId = handler.getAttribute(extensionAttr)

	const handleRequest = (e: Event) => {
		e.preventDefault()
		const target = extensionId || url || ''
		const { value } = e.target as Target
		setState({ tagName, target, handler, handlerUrl: url, handlerMethod: method })
		makeRequest(target, value ? { data: { value } } : {})
	}

	handler.addEventListener(
		event,
		isTagWriteable(tagName, tagType) ? debounce(handleRequest, debounceDelay) : handleRequest,
	)
}
