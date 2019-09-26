import { Canceler } from 'axios'

export type Snippets = {
	[key: string]: string
}

export type PayloadIncluded = {
	isPending?: boolean
	stop?: Canceler
}

export type RequestPayloadData = {
	snippets: Snippets
	state: any[]
	data: any
}
