import 'es6-promise/auto'
import { makeRequest, registerExtension, init } from 'services'

const netteAjax = {
	ext: registerExtension,
	init,
	request: makeRequest,
}

// Experimental fallback for old-way jQuery nette-ajax
if (window.$) {
	window.$.nette = {
		init,
		ext: registerExtension,
		ajax: makeRequest,
	}
}

window.netteAjax = netteAjax

export default netteAjax
