import { Config } from 'types'

const HANDLER_SELECTOR = '.ajax'
const EXTENSION_ATTRIBUTE = 'data-nette-ext'
const DEBOUNCE_DELAY = 300

let config: Config = {
	ajaxify: false,
	debounceDelay: DEBOUNCE_DELAY,
	extensionAttr: EXTENSION_ATTRIBUTE,
	selector: HANDLER_SELECTOR,
}

export const getConfig = () => config

export const updateConfig = (data?: Config) => {
	if (!data) return
	config = { ...config, ...data }
}
