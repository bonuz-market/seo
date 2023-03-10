import { createPolicies, createRules, hasBaseUserAgent } from './helpers'
import { Robots } from './types'

export const createRobots = ({ policies, sitemap }: Robots) => {
  const userAgentString = hasBaseUserAgent(policies) ? '' : 'User-agent: *\n'

  const policiesString = createPolicies(policies)

  const sitemapString = createRules('Sitemap', sitemap)

  return `${userAgentString}${policiesString}\n${sitemapString}`
}
