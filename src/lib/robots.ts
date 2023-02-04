import { Policy, Robots } from "./types";

const createNewLine = (addNewLine: boolean) => {
	return addNewLine ? "\n" : "";
};

const hasBaseUserAgent = (policy: Policy | Policy[]) => {
	if (Array.isArray(policy)) {
		return policy[0].userAgent;
	}
	return policy.userAgent;
};

const createPolicy = (policy: Policy, newLine: boolean = false) => {
	const { allow, disallow, userAgent } = policy;

	const userAgentString = userAgent ? `User-agent: ${userAgent}` : "";

	const userAgentStringFormatted = userAgentString
		? `${createNewLine(newLine)}${userAgentString}\n`
		: "";

	const allowString = Array.isArray(allow)
		? allow.map((a) => `Allow: ${a}`).join("\n")
		: `Allow: ${allow}`;

	const disallowString = Array.isArray(disallow)
		? disallow.map((d) => `Disallow: ${d}`).join("\n")
		: `Disallow: ${disallow}`;

	return `${userAgentStringFormatted}${allowString}\n${disallowString}`;
};

export const createRobots = ({ policies, sitemap }: Robots) => {
	const policiesString = Array.isArray(policies)
		? policies.map((p, i) => createPolicy(p, i !== 0)).join("\n")
		: createPolicy(policies);

	let sitemapString = "";
	if (sitemap) {
		sitemapString = Array.isArray(sitemap)
			? sitemap.map((s) => `Sitemap: ${s}`).join("\n")
			: `Sitemap: ${sitemap}`;
	}

	let userAgentString = "";

	if (!hasBaseUserAgent(policies)) {
		userAgentString = "User-agent: *\n";
	}

	return `${userAgentString}${policiesString}\n${sitemapString}`;
};
