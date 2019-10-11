import { errors } from 'constant'
import { ExtensionCallbackType } from 'models'
import { getState, registerHandlers, makeRedirect } from 'services'
import { Extension, Extensions, RequestPayloadData, PayloadIncluded } from 'types'

type Payload = PayloadIncluded | Extension | RequestPayloadData | string
type Callback = (payload: Payload) => void

let extensions: Extensions = {}

export const getExtensions = () => extensions

export const registerExtensionsFromGlobal = () => {
	const { netteExts } = window
	extensions = { ...netteExts, ...extensions }
}

export const registerExtension = (id: string, extension: Extension) => {
	if (!id) throw new Error(errors.ext.register.missingId)
	if (!extension) throw new Error(errors.ext.register.missingExt)
	const { initialized } = getState()
	const { onInit } = extension

	if (onInit) onInit(extension)
	extensions = { ...extensions, [id]: extension }
	if (initialized) registerHandlers()
}

const getPayload = (type: ExtensionCallbackType, extension: Extension, payload: Payload) => {
	if (type === ExtensionCallbackType.init) return extension
	if (
		type === ExtensionCallbackType.before ||
		type === ExtensionCallbackType.load ||
		type === ExtensionCallbackType.success ||
		type === ExtensionCallbackType.complete ||
		type === ExtensionCallbackType.error
	) {
		return payload
	}
	return {}
}

export const dispatchCallbacks = (type: ExtensionCallbackType, extension: Extension, payload: Payload) => {
	if (!type) throw new Error(errors.callbacks.missingCallbackType)
	const { hooks } = extension
	const { target } = getState()

	if (Object.keys(extension).length > 0) {
		const callback = extension[type] as Callback
		if (callback) callback(getPayload(type, extension, payload))
		if (!hooks) return
	}

	const extsIds = hooks || Object.keys(extensions)
	const exsIdsLength = extsIds.length

	if (exsIdsLength === 0) return
	for (let i = -1; ++i < exsIdsLength; ) {
		const extId = extsIds[i]
		const ext = extensions[extId]

		if (extId !== target && ext && ext[type]) {
			const callback = ext[type] as Callback
			if (callback) callback(getPayload(type, extension, payload))
		}
	}
}
