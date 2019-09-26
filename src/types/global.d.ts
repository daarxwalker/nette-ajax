import { Config, Extension, Extensions } from 'types'

declare global {
	interface Window {
		netteAjax: {
			ext: (id: string, extension: Extension) => void
			init: (customConfig?: Config) => void
			request: (target: string, config: Extension, extensions: Extensions) => void
		}
		netteExts: Extensions
	}
}
