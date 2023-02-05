export type SingleOrArray<T> = T | T[]

export type Policy = {
  userAgent?: string
  allow?: SingleOrArray<string>
  disallow?: SingleOrArray<string>
}

export interface Robots {
  policies: SingleOrArray<Policy>
  sitemap?: SingleOrArray<string>
}
