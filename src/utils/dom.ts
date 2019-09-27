import { errors } from 'constant'

const templatePolyfill = (template: HTMLTemplateElement) => {
	if (template.content !== undefined) return template.content.cloneNode(true)
	const content = template.childNodes
	const fragment = document.createDocumentFragment()

	while (content[0]) {
		fragment.appendChild(content[0])
	}

	return fragment
}

export const parseDOM = (dom: string) => {
	const shadowElement = document.createElement('template')
	shadowElement.innerHTML = dom
	return templatePolyfill(shadowElement)
}

export const removeAllChildNodes = (parent: Element) => {
	if (!parent) throw new Error(errors.utils.missingRemoveChildsParent)
	while (parent.lastChild) {
		parent.removeChild(parent.lastChild)
	}
}
