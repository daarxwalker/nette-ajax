import { errors } from 'constant'
import { parseDOM, removeAllChildNodes } from 'utils'
import { Snippets } from 'types'

import { registerHandlers } from 'services'

export const handleRedrawSnippet = (snippet: Element, dom: string) => {
	if (!snippet) throw new Error(errors.snippet.missingSnippet)
	const parsedDom = parseDOM(dom)

	if (!parsedDom) throw new Error(errors.utils.parseDomFailed)
	removeAllChildNodes(snippet)
	snippet.appendChild(parsedDom)
}

export const redrawSnippets = (snippets: Snippets) => {
	if (!snippets) throw new Error(errors.snippet.missingSnippets)
	const snippetsIds = Object.keys(snippets)
	const snippetsIdsLength = snippetsIds.length

	if (snippetsIdsLength === 0) throw new Error(errors.snippet.missingSnippets)
	for (let i = -1; ++i < snippetsIdsLength; ) {
		const snippetId = snippetsIds[i]
		const snippetDom = snippets[snippetId]
		const snippet = document.getElementById(snippetId)

		if (!snippet) throw new Error(errors.snippet.missingSnippet)
		handleRedrawSnippet(snippet, snippetDom)
		registerHandlers(snippet)
	}
}
