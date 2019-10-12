import { errors } from 'constant'
import { SnippetAppend } from 'models'
import { registerHandlers, getConfig } from 'services'
import { parseDOM, removeAllChildNodes, executeDOMScripts } from 'utils'
import { Snippets } from 'types'

export const handleRedrawSnippet = (snippet: Element, dom: string, optionalAppend?: SnippetAppend | false) => {
	if (!snippet) throw new Error(errors.snippet.missingSnippet)
	const parsedDom = parseDOM(dom)

	if (!parsedDom) throw new Error(errors.utils.parseDomFailed)
	if (!optionalAppend) {
		removeAllChildNodes(snippet)
		snippet.appendChild(parsedDom)
		executeDOMScripts(snippet)
	}
	const shouldOptionalAppend = snippet.parentNode && optionalAppend
	if (shouldOptionalAppend && optionalAppend === SnippetAppend.pre) {
		snippet.parentNode!.insertBefore(parsedDom, snippet)
	}
	if (shouldOptionalAppend && optionalAppend === SnippetAppend.after) {
		if (snippet.nextSibling) {
			snippet.parentNode!.insertBefore(parsedDom, snippet.nextSibling)
		} else {
			snippet.parentNode!.appendChild(parsedDom)
		}
	}
}

export const redrawSnippets = (snippets: Snippets) => {
	if (!snippets) return
	const config = getConfig()
	const snippetsIds = Object.keys(snippets)
	const snippetsIdsLength = snippetsIds.length

	if (snippetsIdsLength === 0) return
	for (let i = -1; ++i < snippetsIdsLength; ) {
		const snippetId = snippetsIds[i]
		const snippetDom = snippets[snippetId]
		const snippet = document.getElementById(snippetId)
		const optionalAppend = !!snippet && (snippet.getAttribute(config.appendAttr) as SnippetAppend)

		if (!snippet) return
		handleRedrawSnippet(snippet, snippetDom, optionalAppend)
		registerHandlers(!optionalAppend ? snippet : undefined)
	}
}
