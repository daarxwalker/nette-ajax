import { getEventByTagName, isTagChangeable, isTagWriteable } from 'utils'
import { Event, Tag, TagType } from 'models'

describe('Event utils', () => {
	describe('Is tag writeable', () => {
		test('Should return "true"', () => {
			expect(isTagWriteable(Tag.input, TagType.text)).toBe(true)
			expect(isTagWriteable(Tag.textarea)).toBe(true)
		})
		test('Should return "false"', () => {
			expect(isTagWriteable(Tag.input, TagType.image)).toBe(false)
			expect(isTagWriteable(Tag.input, TagType.checkbox)).toBe(false)
			expect(isTagWriteable(Tag.input, TagType.radio)).toBe(false)
			expect(isTagWriteable(Tag.button)).toBe(false)
		})
	})
	describe('Is tag changeable', () => {
		test('Should return "true"', () => {
			expect(isTagChangeable(Tag.input, TagType.checkbox)).toBe(true)
			expect(isTagChangeable(Tag.input, TagType.radio)).toBe(true)
			expect(isTagChangeable(Tag.input, TagType.image)).toBe(true)
		})
		test('Should return "false"', () => {
			expect(isTagChangeable(Tag.input, TagType.text)).toBe(false)
			expect(isTagChangeable(Tag.textarea)).toBe(false)
		})
	})
	describe('Get event by tag name', () => {
		test('Should return "submit"', () => {
			expect(getEventByTagName(Tag.form)).toBe(Event.submit)
		})
		test('Should return "input"', () => {
			expect(getEventByTagName(Tag.input, TagType.text)).toBe(Event.input)
			expect(getEventByTagName(Tag.textarea)).toBe(Event.input)
		})
		test('Should return "change"', () => {
			expect(getEventByTagName(Tag.input, TagType.checkbox)).toBe(Event.change)
			expect(getEventByTagName(Tag.input, TagType.radio)).toBe(Event.change)
			expect(getEventByTagName(Tag.input, TagType.image)).toBe(Event.change)
		})
		test('Should return "click"', () => {
			expect(getEventByTagName(Tag.button)).toBe(Event.click)
			expect(getEventByTagName(Tag.link)).toBe(Event.click)
		})
	})
})
