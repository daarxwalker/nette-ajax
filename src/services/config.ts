import { errors } from 'constant'
import { Config } from 'types'

const HANDLER_SELECTOR = '.ajax'
const EXTENSION_ATTRIBUTE = 'data-nette-ext'
const DEBOUNCE_DELAY = 300

let config: Config = {
	selector: HANDLER_SELECTOR,
	extensionAttr: EXTENSION_ATTRIBUTE,
	debounceDelay: DEBOUNCE_DELAY,
}

export const getConfig = () => config

export const updateConfig = (data?: Config) => {
	if (!data) throw new Error(errors.config.missingConfigData)
	config = { ...config, ...data }
}
