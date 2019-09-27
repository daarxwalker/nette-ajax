import { errors } from 'constant'
import { registerHandlers, registerExtensionsFromGlobal, getConfig, updateConfig } from 'services'
import { Config } from 'types'

export const init = (customConfig?: Config) => {
	const config = getConfig()
	const { initialized } = config
	if (initialized) throw new Error(errors.init.alreadyInitialized)
	updateConfig(customConfig)
	registerExtensionsFromGlobal()
	registerHandlers()
	updateConfig({ initialized: true })
}
