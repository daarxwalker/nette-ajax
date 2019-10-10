import { errors } from 'constant'
import { registerHandlers, registerExtensionsFromGlobal, updateConfig, getState, setState } from 'services'
import { Config } from 'types'

export const init = (customConfig?: Config) => {
	const { initialized } = getState()
	if (initialized) throw new Error(errors.init.alreadyInitialized)
	updateConfig(customConfig)
	registerExtensionsFromGlobal()
	registerHandlers()
	setState({ initialized: true })
}
