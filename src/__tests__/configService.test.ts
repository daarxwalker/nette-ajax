import { getConfig, updateConfig } from 'services'

describe('Config service', () => {
	describe('Get config', () => {
		test('Should return config object', () => {
			const config = getConfig()
			expect(typeof config).toBe('object')
		})
		test('Should return all required config properties', () => {
			const config = getConfig()
			const configKeys = Object.keys(config)
			const expectedKeys = ['ajaxify', 'appendAttr', 'debounceDelay', 'extensionAttr', 'initialized', 'selector']
			expect(configKeys).toStrictEqual(expectedKeys)
		})
	})
	describe('Update config', () => {
		test('Should update config object', () => {
			const newConfig = updateConfig({ ajaxify: true })
			expect(newConfig.ajaxify).toBe(true)
		})
	})
})
