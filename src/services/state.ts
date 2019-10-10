type State = { [key: string]: any }

let state: State = {}

export const getState = () => state

export const setState = (value: State) => {
	state = { ...state, ...value }
}

export const resetState = () => {
	state = { initialized: true }
}
