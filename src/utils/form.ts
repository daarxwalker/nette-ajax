export const makeFormData = (handler: HTMLFormElement) => {
	const data = new window.FormData()
	const formParts = handler.querySelectorAll('*:not(button)')
	const formPartsLength = formParts.length

	if (formPartsLength === 0) return data
	for (let i = -1; ++i < formPartsLength; ) {
		const element = formParts[i] as any
		const { name, value, files } = element
		if (!files) {
			data.set(name, value)
		} else {
			data.append(name, files[0], files[0].name)
		}
	}

	return data
}
