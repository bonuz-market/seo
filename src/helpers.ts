import { Policy } from "./types";

const createNewLine = (addNewLine: boolean) => {
	return addNewLine ? "\n" : "";
};

export const hasBaseUserAgent = (policy: Policy | Policy[]) => {
	if (Array.isArray(policy)) {
		return !!policy[0].userAgent;
	}
	return !!policy.userAgent;
};

export const createRules = (
	rule: string,
	value: string | string[] | undefined
) => {
	if (!value) return "";

	const valueString = Array.isArray(value)
		? value.map((value) => `${rule}: ${value}`).join("\n")
		: `${rule}: ${value}`;

	return valueString;
};

export const createPolicy = (policy: Policy, newLine: boolean = false) => {
	const { allow, disallow, userAgent } = policy;

	const userAgentString = userAgent ? `User-agent: ${userAgent}` : "";

	const userAgentStringFormatted = userAgentString
		? `${createNewLine(newLine)}${userAgentString}\n`
		: "";

	const allowString = createRules("Allow", allow);

	const disallowString = createRules("Disallow", disallow);

	return `${userAgentStringFormatted}${allowString}\n${disallowString}`;
};

export const createPolcies = (policies: Policy | Policy[]) => {
	if (Array.isArray(policies)) {
		return policies.map((p, i) => createPolicy(p, i !== 0)).join("\n");
	}
	return createPolicy(policies);
};
