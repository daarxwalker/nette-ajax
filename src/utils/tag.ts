import { Tag } from 'models'

export const getTagNameByElement = (element: Element): Tag => element.tagName.toLowerCase() as Tag
