import { createRobots } from "../../../../dist/robots";
import type { NextApiRequest, NextApiResponse } from "next";

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