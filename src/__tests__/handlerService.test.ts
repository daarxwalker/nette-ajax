import { registerHandlers } from 'services'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'

describe('Handler service', () => {
	describe('Register handlers', () => {
		let mock = new MockAdapter(axios)
		document.body.innerHTML =
			'<div id="snippet--test"><a id="test-button" class="ajax" href="/?do=test">Handler</a></div>'

		beforeEach(() => {
			mock = new MockAdapter(axios)
		})

		afterEach(() => {
			mock.reset()
		})

		test('Should register ajax handlers', () => {
			registerHandlers()
			expect(document.querySelectorAll('.ajax').length).toBe(1)
		})
	})
})
