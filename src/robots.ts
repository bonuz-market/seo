import { createPolcies, createRules, hasBaseUserAgent } from "./helpers";
import { Robots } from "./types";

export const createRobots = ({ policies, sitemap }: Robots) => {
	const userAgentString = hasBaseUserAgent(policies) ? "" : "User-agent: *\n";

	const policiesString = createPolcies(policies);

	const sitemapString = createRules("Sitemap", sitemap);
	const _sda = 1;

	return `${userAgentString}${policiesString}\n${sitemapString}`;
};