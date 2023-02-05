import { Robots } from './types'

const allowOrDisallowAll = (propertyName: 'allow' | 'disallow'): Robots => {
  return {
    policies: [
      {
        [propertyName]: '/',
      },
    ],
  }
}

export const allowAll = () => allowOrDisallowAll('allow')
export const disallowAll = () => allowOrDisallowAll('disallow')
