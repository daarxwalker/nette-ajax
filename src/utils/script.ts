export const executeDOMScripts = (scope: Element) => {
	const scripts = scope.querySelectorAll('script')
	const scriptsLength = scripts.length

	if (scriptsLength === 0) return
	const parent = scripts[0].parentNode

	if (!parent) return
	const fragment = document.createDocumentFragment()

	for (let i = 0; i < scriptsLength; i++) {
		const script = scripts[i]
		const scriptSrc = script.getAttribute('src')
		const scriptContent = script.textContent
		const newScript = document.createElement('script')

		if (!parent) return
		parent.removeChild(script)

		if (scriptSrc) newScript.setAttribute('src', scriptSrc)
		if (scriptContent) newScript.textContent = scriptContent
		fragment.appendChild(newScript)
	}

	parent.appendChild(fragment)
}
