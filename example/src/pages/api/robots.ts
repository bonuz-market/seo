import type { NextApiRequest, NextApiResponse } from "next";
import { createRobots } from "@bonuz/seo";
export default function handler(req: NextApiRequest, res: NextApiResponse) {
	res.send(
		createRobots({
			policies: [
				{
					allow: "/",
					disallow: "/admin",
					userAgent: "Googlebot",
				},
			],
		})
	);
}
