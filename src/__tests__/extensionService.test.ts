import { dispatchCallbacks, getExtensions, registerExtension, registerExtensionsFromGlobal } from 'services'
import { ExtensionCallbackType } from 'models'

describe('Extension service', () => {
	describe('Get extension', () => {
		test('Should register extension "test"', () => {
			registerExtension('test', { onInit: () => 'test' })
		})
		test('Should get "test" extension and check, if has "onInit" callback', () => {
			const extensions = getExtensions()
			const extensionsKeys = Object.keys(extensions)
			expect(extensionsKeys.indexOf('test') > -1).toBe(true)
			expect(extensions.test && typeof extensions.test.onInit === 'function').toBe(true)
		})
	})
	describe('Get global extension', () => {
		window.netteExts = {}
		test('Should register global extension "globalTest"', () => {
			const { netteExts } = window
			netteExts.globalTest = { onInit: () => 'globalTest' }
			registerExtensionsFromGlobal()
		})
		test('Should get "globalTest" global extension and check, if has "onInit" callback', () => {
			const extensions = getExtensions()
			const extensionsKeys = Object.keys(extensions)
			expect(extensionsKeys.indexOf('globalTest') > -1).toBe(true)
			expect(extensions.globalTest && typeof extensions.globalTest.onInit === 'function').toBe(true)
		})
	})
	describe('Dispatch callbacks', () => {
		test('Should dispatch init callback from "test" extension', () => {
			const extensions = getExtensions()
			const testExtension = extensions.test
			dispatchCallbacks(ExtensionCallbackType.init, testExtension, testExtension)
		})
	})
})
