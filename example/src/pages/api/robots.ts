import type { NextApiRequest, NextApiResponse } from 'next'

import { createRobots, getRobotsConfig } from '@bonuz/seo'

const env = process.env.NODE_ENV

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const robots = createRobots(getRobotsConfig(env, ['production'], ['test', 'development']))

  // Same as without disallow configuration:
  // const robots = createRobots(env, getRobotsConfig(['production']))

  res.send(robots)
}
