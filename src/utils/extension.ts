import { Extensions } from 'types'

export const getExtensionById = (id: string, extensions: Extensions) => {
	const extension = extensions[id]

	if (!extension) return {}
	return extension
}
