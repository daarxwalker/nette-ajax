import { parseDOM, removeAllChildNodes } from 'utils'

const domInString = '<div><p></p></div>'

describe('DOM utils', () => {
	describe('Parse DOM', () => {
		test(`Should return parsed DOM`, () => {
			const fragment = document.createDocumentFragment()
			const div = document.createElement('div')
			const p = document.createElement('p')
			div.appendChild(p)
			fragment.appendChild(div)
			expect(parseDOM(domInString)).toStrictEqual(fragment)
		})
	})
	describe('Remove all child nodes', () => {
		test(`Should return empty node`, () => {
			const emptyUl = document.createElement('ul')
			const ul = document.createElement('ul')
			const li = document.createElement('li')
			ul.appendChild(li)
			ul.appendChild(li)
			ul.appendChild(li)
			expect(removeAllChildNodes(ul)).toStrictEqual(emptyUl)
		})
	})
})
