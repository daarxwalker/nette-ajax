import { getUrlByHandler } from 'utils'

const testUrl = '/test'

describe('Attributes utils', () => {
	describe('Get url by handler', () => {
		test(`Should return "${testUrl}" by form action`, () => {
			const element = document.createElement('form')
			element.setAttribute('action', testUrl)
			expect(getUrlByHandler(element)).toBe(testUrl)
		})
		test(`Should return "${testUrl}" by link href`, () => {
			const element = document.createElement('a')
			element.setAttribute('href', testUrl)
			expect(getUrlByHandler(element)).toBe(testUrl)
		})
		test(`Should return "null" by another element than form or link`, () => {
			const element = document.createElement('div')
			expect(getUrlByHandler(element)).toBe(null)
		})
	})
})
