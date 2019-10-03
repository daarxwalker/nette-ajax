import { Method } from 'axios'

type Data = { [key: string]: any }

export const makeData = (method: Method, data?: Data) => {
	if (!data) return ''
	if (method.toLowerCase() !== 'get') return data
	return Object.keys(data)
		.map((key: string) => `${key}=${data[key]}`)
		.join('&')
}

export const makeUrl = (method: Method, target: string, url?: string, data?: Data) => {
	const newUrl = url || target || ''
	if (method.toLowerCase() !== 'get' || !data) return newUrl
	return `${newUrl}${newUrl.indexOf('?') > -1 ? '&' : '?'}${makeData(method, data)}`
}
