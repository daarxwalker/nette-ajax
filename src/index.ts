import 'es6-promise/auto'
import { makeRequest, registerExtension, init } from 'services'

const netteAjax = {
	ext: registerExtension,
	init,
	request: makeRequest,
}

window.netteAjax = netteAjax

export default netteAjax
