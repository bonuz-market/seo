import {
	createPolcies,
	createPolicy,
	createRules,
	hasBaseUserAgent,
} from "./helpers";
import { createRobots } from "./robots";
import { Policy, Robots } from "./types";

describe("helpers", () => {
	describe("createPolicy", () => {
		it("should return correct string for policy with allow and disallow values", () => {
			const policy: Policy = {
				allow: "/allow-this",
				disallow: "/disallow-this",
			};
			const result = createPolicy(policy);
			expect(result).toEqual("Allow: /allow-this\nDisallow: /disallow-this");
		});

		it("should return correct string for policy with userAgent", () => {
			const policy: Policy = {
				allow: "/allow-this",
				disallow: "/disallow-this",
				userAgent: "myUserAgent",
			};
			const result = createPolicy(policy);
			expect(result).toEqual(
				"User-agent: myUserAgent\nAllow: /allow-this\nDisallow: /disallow-this"
			);
		});

		it("should return correct string for policy with new line", () => {
			const policy: Policy = {
				allow: "/allow-this",
				disallow: "/disallow-this",
				userAgent: "myUserAgent",
			};
			const result = createPolicy(policy, true);
			expect(result).toEqual(
				"\nUser-agent: myUserAgent\nAllow: /allow-this\nDisallow: /disallow-this"
			);
		});
	});

	describe("createPolcies", () => {
		it("should return correct string for policies array", () => {
			const policies: Policy[] = [
				{
					allow: "/allow-this",
					disallow: "/disallow-this",
				},
				{
					allow: "/allow-that",
					disallow: "/disallow-that",
				},
			];
			const result = createPolcies(policies);
			expect(result).toEqual(
				"Allow: /allow-this\nDisallow: /disallow-this\nAllow: /allow-that\nDisallow: /disallow-that"
			);
		});

		it("should return correct string for single policy", () => {
			const policy: Policy = {
				allow: "/allow-this",
				disallow: "/disallow-this",
			};
			const result = createPolcies(policy);
			expect(result).toEqual("Allow: /allow-this\nDisallow: /disallow-this");
		});
	});

	describe("createRules", () => {
		it("should return correct string for rules array", () => {
			const rules = ["rule1", "rule2"];
			const result = createRules("Rule", rules);
			expect(result).toEqual("Rule: rule1\nRule: rule2");
		});
	});

	describe("hasBaseUserAgent", () => {
		it("should return true if the policy has user agent", () => {
			const policy: Policy = {
				allow: "/allow-this",
				disallow: "/disallow-this",
				userAgent: "myUserAgent",
			};
			const result = hasBaseUserAgent(policy);

			expect(result).toEqual(true);
		});

		it("should return false if the policy has no user agent", () => {
			const policy: Policy = {
				allow: "/allow-this",
				disallow: "/disallow-this",
			};

			const result = hasBaseUserAgent(policy);
			expect(result).toEqual(false);
		});

		it("should return true if the first policy has user agent", () => {
			const policies: Policy[] = [
				{
					allow: "/allow-this",
					disallow: "/disallow-this",
					userAgent: "myUserAgent",
				},
				{
					allow: "/allow-that",
					disallow: "/disallow-that",
				},
			];

			const result = hasBaseUserAgent(policies);
			expect(result).toEqual(true);
		});

		it("should return false if the first policy has no user agent", () => {
			const policies: Policy[] = [
				{
					allow: "/allow-this",
					disallow: "/disallow-this",
				},
				{
					allow: "/allow-that",
					disallow: "/disallow-that",
				},
			];

			const result = hasBaseUserAgent(policies);
			expect(result).toEqual(false);
		});
	});
});
describe("createRobots", () => {
	it("should return correct string for robots object", () => {
		const robots: Robots = {
			policies: [
				{
					allow: "/allow-this",
					disallow: "/disallow-this",
					userAgent: "myUserAgent",
				},
				{
					allow: "/allow-that",
					disallow: "/disallow-that",
				},
			],
			sitemap: "/sitemap.xml",
		};
		const result = createRobots(robots);
		expect(result).toEqual(
			"User-agent: myUserAgent\nAllow: /allow-this\nDisallow: /disallow-this\nAllow: /allow-that\nDisallow: /disallow-that\nSitemap: /sitemap.xml"
		);
	});
	it("should return correct string for robots object with no user-agent in the first policy", () => {
		const robots: Robots = {
			policies: [
				{
					allow: "/allow-this",
					disallow: "/disallow-this",
				},
				{
					allow: "/allow-that",
					disallow: "/disallow-that",
				},
			],
		};
		const result = createRobots(robots);
		expect(result).toEqual(
			"User-agent: *\nAllow: /allow-this\nDisallow: /disallow-this\nAllow: /allow-that\nDisallow: /disallow-that\n"
		);
	});
});
