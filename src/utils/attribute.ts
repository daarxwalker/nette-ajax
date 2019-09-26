import { Tag } from 'models'
import { getTagNameByElement } from 'utils'

export const getUrlByHandler = (handler: Element) => {
	const tagName = getTagNameByElement(handler)

	if (!tagName) return null
	switch (tagName) {
		case Tag.form:
			return handler.getAttribute('action')
		case Tag.link:
			return handler.getAttribute('href')
		default:
			return null
	}
}
