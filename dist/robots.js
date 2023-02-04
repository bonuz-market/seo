"use strict";
exports.__esModule = true;
exports.createRobots = void 0;
var helpers_1 = require("./helpers");
var createRobots = function (_a) {
    var policies = _a.policies, sitemap = _a.sitemap;
    var userAgentString = (0, helpers_1.hasBaseUserAgent)(policies) ? "" : "User-agent: *\n";
    var policiesString = (0, helpers_1.createPolcies)(policies);
    var sitemapString = (0, helpers_1.createRules)("Sitemap", sitemap);
    return "".concat(userAgentString).concat(policiesString, "\n").concat(sitemapString);
};
exports.createRobots = createRobots;
