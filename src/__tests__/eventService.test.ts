import { registerEvent } from 'services'

describe('Event service', () => {
	describe('Register event', () => {
		test('There should be no error while registering event', () => {
			const handlerId = 'test-handler'
			document.body.innerHTML = `<div id="snippet--test"><a id="${handlerId}" class="ajax" href="/?do=test">Handler</a></div>`
			const handler = document.getElementById(handlerId)
			if (handler) registerEvent(handler)
		})
	})
})
