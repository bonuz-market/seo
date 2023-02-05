import { Policy } from './types'

export const ERROR_ALLOW_DISALLOW_UNMET = 'At least one or more disallow or allow entries per rule.'

const createNewLine = (addNewLine: boolean) => {
  return addNewLine ? '\n' : ''
}

export const hasBaseUserAgent = (policy: Policy | Policy[]) => {
  if (Array.isArray(policy)) {
    return !!policy[0].userAgent
  }
  return !!policy.userAgent
}

export const createRules = (rule: string, value: string | string[] | undefined) => {
  if (!value) return ''

  const valueString = Array.isArray(value) ? value.map((value) => `${rule}: ${value}`).join('\n') : `${rule}: ${value}`

  return valueString
}

export const createPolicy = (policy: Policy, newLine: boolean = false) => {
  const { allow, disallow, userAgent } = policy

  /*
    - At least one or more disallow or allow entries per rule.
    - https://developers.google.com/search/docs/crawling-indexing/robots/create-robots-txt 

    - Check against undefined and empty string is achieved in JS
      in a simple boolean negation, see below.
  */
  if (!allow && !disallow) throw new Error(ERROR_ALLOW_DISALLOW_UNMET)

  const userAgentString = userAgent ? `User-agent: ${userAgent}` : ''

  const userAgentStringFormatted = userAgentString ? `${createNewLine(newLine)}${userAgentString}\n` : ''

  const allowString = createRules('Allow', allow)

  const disallowString = createRules('Disallow', disallow)

  return `${userAgentStringFormatted}${allowString}\n${disallowString}`
}

export const createPolicies = (policies: Policy | Policy[]) => {
  if (Array.isArray(policies)) {
    return policies.map((p, i) => createPolicy(p, i !== 0)).join('\n')
  }
  return createPolicy(policies)
}
