import axios, { AxiosResponse } from 'axios'

import { errors } from 'constant'
import { ExtensionCallbackType, Tag } from 'models'
import { RequestPayloadData, Extension } from 'types'
import { dispatchCallbacks, redrawSnippets, getExtensions, getState, resetState, makeRedirect } from 'services'
import { getExtensionById, makeFormData, makeUrl } from 'utils'

export const makeRequest = (target: string, extensionCustomConfig?: Extension) => {
	if (!target) throw new Error(errors.request.missingTarget)
	const requestCancelToken = axios.CancelToken
	const requestSource = requestCancelToken.source()
	const stop = requestSource.cancel

	const { handlerUrl, handlerMethod, tagName, handler } = getState()
	const extensions = getExtensions()
	const extensionByTarget = getExtensionById(target, extensions)
	const extension = { ...extensionByTarget, ...extensionCustomConfig }
	const { data, url, method, responseType, headers, ...rest } = extension
	const requestData = tagName === Tag.form ? makeFormData(handler as HTMLFormElement) : data
	const requestMethod = method || handlerMethod || 'GET'
	const shouldAddDataToConfig = requestMethod.toLowerCase() !== 'get'
	const requestConfig = {
		...rest,
		data: shouldAddDataToConfig ? requestData : {},
		cancelToken: requestSource.token,
		url: makeUrl(requestMethod, target, url || handlerUrl, requestData),
		method: requestMethod,
		responseType: responseType || 'json',
		headers: { ...headers, 'X-Requested-With': 'XMLHttpRequest' },
	}

	dispatchCallbacks(ExtensionCallbackType.before, extension, { isPending: false, stop })
	const newRequest = (): Promise<AxiosResponse<RequestPayloadData>> => {
		dispatchCallbacks(ExtensionCallbackType.start, extension, { isPending: true, stop })
		return axios(requestConfig)
	}

	return newRequest()
		.then(payload => {
			const payloadData = payload.data || {}
			const { redirect } = payloadData as any
			dispatchCallbacks(ExtensionCallbackType.success, extension, { ...payloadData, isPending: false })
			if (redirect) makeRedirect(redirect)
			redrawSnippets(payloadData.snippets || {})
			dispatchCallbacks(ExtensionCallbackType.complete, extension, payloadData)
			dispatchCallbacks(ExtensionCallbackType.load, extension, extension)
			resetState()
			return payload
		})
		.catch(err => {
			dispatchCallbacks(ExtensionCallbackType.error, extension, err)
			dispatchCallbacks(ExtensionCallbackType.complete, extension, err)
			resetState()
			throw new Error(err)
		})
}
