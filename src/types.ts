export interface Policy {
  allow: string | string[]
  disallow: string | string[]
  userAgent?: string
}

export interface Robots {
  policies: Policy | Policy[]
  sitemap?: string | string[]
}
