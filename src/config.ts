import { Robots } from './types'

export const getRobotsConfig = (env: string, allow: string[] = [], disallow: string[] = []): Robots => {
  if (allow.findIndex((entry) => entry === env)) return allowAll()
  else if (disallow.length === 0 || disallow.findIndex((entry) => entry === env)) return disallowAll()
  else throw new Error(`Unexpected env '${env}'.`)
}

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
