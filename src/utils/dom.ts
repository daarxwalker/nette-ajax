import { errors } from 'constant'

export const parseDOM = (dom: string) => {
	const shadowElement = document.createElement('template')
	shadowElement.innerHTML = dom
	return shadowElement.content.cloneNode(true)
}

export const removeAllChildNodes = (parent: Element) => {
	if (!parent) throw new Error(errors.utils.missingRemoveChildsParent)
	while (parent.lastChild) {
		parent.removeChild(parent.lastChild)
	}
}
