import { Config } from 'types'

const HANDLER_SELECTOR = '.ajax'
const EXTENSION_ATTRIBUTE = 'data-nette-ext'
const APPEND_ATTRIBUTE = 'data-ajax-append'
const DEBOUNCE_DELAY = 300

let config: Config = {
	ajaxify: false,
	appendAttr: APPEND_ATTRIBUTE,
	debounceDelay: DEBOUNCE_DELAY,
	extensionAttr: EXTENSION_ATTRIBUTE,
	initialized: false,
	selector: HANDLER_SELECTOR,
}

export const getConfig = () => config

export const updateConfig = (data?: any) => {
	if (!data) return config
	config = { ...config, ...data }
	return config
}
