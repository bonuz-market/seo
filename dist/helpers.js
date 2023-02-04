"use strict";
exports.__esModule = true;
exports.createPolcies = exports.createPolicy = exports.createRules = exports.hasBaseUserAgent = void 0;
var createNewLine = function (addNewLine) {
    return addNewLine ? "\n" : "";
};
var hasBaseUserAgent = function (policy) {
    if (Array.isArray(policy)) {
        return policy[0].userAgent;
    }
    return policy.userAgent;
};
exports.hasBaseUserAgent = hasBaseUserAgent;
var createRules = function (rule, value) {
    if (!value)
        return "";
    var valueString = Array.isArray(value)
        ? value.map(function (value) { return "".concat(rule, ": ").concat(value); }).join("\n")
        : "".concat(rule, ": ").concat(value);
    return valueString;
};
exports.createRules = createRules;
var createPolicy = function (policy, newLine) {
    if (newLine === void 0) { newLine = false; }
    var allow = policy.allow, disallow = policy.disallow, userAgent = policy.userAgent;
    var userAgentString = userAgent ? "User-agent: ".concat(userAgent) : "";
    var userAgentStringFormatted = userAgentString
        ? "".concat(createNewLine(newLine)).concat(userAgentString, "\n")
        : "";
    var allowString = (0, exports.createRules)("Allow", allow);
    var disallowString = (0, exports.createRules)("Disallow", disallow);
    return "".concat(userAgentStringFormatted).concat(allowString, "\n").concat(disallowString);
};
exports.createPolicy = createPolicy;
var createPolcies = function (policies) {
    if (Array.isArray(policies)) {
        return policies.map(function (p, i) { return (0, exports.createPolicy)(p, i !== 0); }).join("\n");
    }
    return (0, exports.createPolicy)(policies);
};
exports.createPolcies = createPolcies;
