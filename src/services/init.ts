import { errors } from 'constant'
import { registerHandlers, updateConfig, registerExtensionsFromGlobal } from 'services'
import { Config } from 'types'

let initialized = false

export const init = (customConfig?: Config) => {
	if (initialized) throw new Error(errors.init.alreadyInitialized)
	updateConfig(customConfig)
	registerExtensionsFromGlobal()
	registerHandlers()
	initialized = true
}
