import { Event, Tag, TagType } from 'models'

export const isTagWriteable = (tag: Tag, type?: TagType) =>
	(tag === Tag.input && type === TagType.text) || tag === Tag.textarea

export const isTagChangeable = (tag: Tag, type?: TagType) =>
	(tag === Tag.input && type !== TagType.text) || tag === Tag.select

export const getEventByTagName = (tag: Tag, type?: TagType) => {
	if (tag === Tag.form) return Event.submit
	if (isTagWriteable(tag, type)) return Event.input
	if (isTagChangeable(tag, type)) return Event.change
	return Event.click
}
