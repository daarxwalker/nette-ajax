import { init, getConfig } from 'services'

describe('Init service', () => {
	describe('Call all necessary things and set initialized status', () => {
		test('Should return initialized "true", that means all passed and lib is initialized successfuly', () => {
			document.body.innerHTML = '<div id="snippet--test"><a class="ajax" href="/?do=test">Handler</a></div>'
			init()
			const config = getConfig()
			expect(config.initialized).toBe(true)
		})
	})
})
