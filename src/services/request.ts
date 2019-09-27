import axios, { AxiosResponse } from 'axios'

import { errors } from 'constant'
import { ExtensionCallbackType } from 'models'
import { RequestPayloadData, Extension } from 'types'

import { dispatchCallbacks, redrawSnippets, getExtensions } from 'services'
import { getExtensionById } from 'utils'

const getUrl = (target: string, extensionKeysExist: boolean, customExt?: Extension, url?: string) => {
	if ((extensionKeysExist && !customExt) || (!extensionKeysExist && customExt)) return url
	return target
}

export const makeRequest = (target: string, customExt?: Extension) => {
	if (!target) throw new Error(errors.request.missingTarget)
	const extensions = getExtensions()
	const extensionByTarget = customExt || getExtensionById(target, extensions)
	const extensionKeys = extensionByTarget && Object.keys(extensionByTarget)
	const requestCancelToken = axios.CancelToken
	const requestSource = requestCancelToken.source()
	const stop = requestSource.cancel
	const { url, method, responseType, headers, ...rest } = extensionByTarget

	dispatchCallbacks(ExtensionCallbackType.before, extensionByTarget, { isPending: false, stop })
	const newRequest = (): Promise<AxiosResponse<RequestPayloadData>> => {
		dispatchCallbacks(ExtensionCallbackType.start, extensionByTarget, { isPending: true, stop })
		return axios({
			...rest,
			cancelToken: requestSource.token,
			url: getUrl(target, extensionKeys.length > 0, customExt, url),
			method: method || 'GET',
			responseType: responseType || 'json',
			headers: { ...headers, 'X-Requested-With': 'XMLHttpRequest' },
		})
	}

	newRequest()
		.then(payload => {
			const { data } = payload
			const payloadData = data || {}
			dispatchCallbacks(ExtensionCallbackType.success, extensionByTarget, payloadData)
			redrawSnippets(data.snippets || {})
			dispatchCallbacks(ExtensionCallbackType.complete, extensionByTarget, payloadData)
		})
		.catch(() => {
			dispatchCallbacks(ExtensionCallbackType.error, extensionByTarget, errors.request.requestFailed)
			throw new Error(errors.request.requestFailed)
		})
}
