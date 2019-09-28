import { getTagNameByElement } from 'utils'

const TAG_NAME = 'input'

describe('Tag utils', () => {
	describe('Get tag name by tag', () => {
		test(`Should return "${TAG_NAME}" tag name`, () => {
			const input = document.createElement(TAG_NAME)
			expect(getTagNameByElement(input)).toStrictEqual(TAG_NAME)
		})
	})
})
