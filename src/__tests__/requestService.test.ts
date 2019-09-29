import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import { makeRequest } from 'services'

describe('Request service', () => {
	describe('Call endpoint for updated snippet', () => {
		let mock = new MockAdapter(axios)

		beforeEach(() => {
			mock = new MockAdapter(axios)
		})

		afterEach(() => {
			mock.reset()
		})

		test('Should call endpoint and redraw snippets', done => {
			document.body.innerHTML = '<div id="snippet--test"><a class="ajax" href="/?do=test">Handler</a></div>'

			const data = { snippets: { 'snippet--test': '<a class="ajax" href="/?do=test">Redrawed</a>' } }
			mock.onGet('/?do=test').reply(200, data)

			makeRequest('/?do=test').then(response => {
				expect(response.data).toEqual(data)
				done()
			})
		})
	})
})
